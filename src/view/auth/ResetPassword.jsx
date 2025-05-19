import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await exios.post(
        "/Auth/reset_password.php",
        JSON.stringify({ token, new_password: password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error en el restablecimiento");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Restablecer Contraseña</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full mt-3 bg-green-500 text-white p-2 rounded"
        >
          Cambiar Contraseña
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
