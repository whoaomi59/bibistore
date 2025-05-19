import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoriasNegocios({ setFilter, Filter }) {
  const [data, setData] = useState([]);

  function capitalize(str) {
    if (!str || typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    const Get = async () => {
      try {
        const response = await axios.get(
          "/api/categorias_negocios/controller.php"
        );
        const categoriasConTodos = [
          { id: "", nombre: "Todos", icono: "🛍️" },
          ...response.data,
        ];
        setData(categoriasConTodos);
      } catch (error) {
        console.warn(error);
      }
    };
    Get();
  }, []);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide  py-4">
      <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-max">
        {data.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition 
          ${
            Filter === cat.id
              ? "bg-primary text-white shadow-md"
              : "bg-white text-gray-800 border-bg-primary"
          }`}
          >
            <span className="text-xl">{cat.icono}</span>
            <span>{capitalize(cat.nombre)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
