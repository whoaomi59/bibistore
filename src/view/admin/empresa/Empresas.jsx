import { useEffect, useState } from "react";
import axios from "axios";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    axios
      .get("/api/empresas_api.php")
      .then((response) => setEmpresas(response.data))
      .catch((error) => console.error("Error al obtener empresas", error));
  }, []);

  const agregarEmpresa = (e) => {
    e.preventDefault();
    axios
      .post("/API/api/empresas_api.php", {
        nombre,
        email,
      })
      .then(() => {
        setEmpresas([...empresas, { nombre, email }]);
        setNombre("");
      })
      .catch((error) => console.error("Error al agregar empresa", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Empresas</h1>
      <form onSubmit={agregarEmpresa} className="mt-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la empresa"
          className="border p-2"
        />{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email de la empresa"
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Agregar
        </button>
      </form>
      <ul className="mt-4">
        {empresas.map((empresa, index) => (
          <li key={index} className="border p-2">
            {empresa.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Empresas;
