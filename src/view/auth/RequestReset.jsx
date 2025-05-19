import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RequestReset = () => {
  const { emails } = useParams();
  const [email, setEmail] = useState("" || emails === "null" ? "" : emails);
  const [message, setMessage] = useState("");
  const [tokensend, settokensend] = useState(null);
  const [password, setpassword] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes anteriores

    try {
      const response = await axios.post(
        "/Auth/request_reset.php",
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      settokensend(response.data.reset_link);
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error en la solicitud");
    }
  };

  const NewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/Auth/reset_password.php",
        JSON.stringify({ token: tokensend, new_password: password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      setMessage("Error en la solicitud");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md mt-20">
      <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full mt-3 bg-green-600 text-white p-2 rounded"
        >
          Enviar Enlace
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4">Ingrese la contraseña</h2>
      {tokensend && (
        <form onSubmit={NewPassword}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full mt-3 bg-green-500 text-white p-2 rounded"
          >
            Recuperar
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestReset;
