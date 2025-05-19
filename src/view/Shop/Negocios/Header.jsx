import axios from "axios";
import { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Loader from "../../../components/content/loader";

export default function Header({ setFilter }) {
  const [empresa, setEmpresa] = useState({});
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const Get = async () => {
      try {
        setloader(true);
        const response = await axios.get("/api/empresas/controller.php");
        setloader(false);
        return setEmpresa(response.data[0]);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    Get();
  }, []);

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        const response = await axios.get(
          "/api/categorias_negocios/controller.php"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        return console.log("errors");
      }
    };
    fetchNegocios();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
    } else {
      const resultados = data.filter((negocio) =>
        negocio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(searchTerm);
      setFilteredData(resultados);
    }
  }, [searchTerm, data]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="bg-primary flex flex-col items-center justify-center py-10 px-4 sm:px-6 text-white font-sans mb-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-center leading-tight">
        Si tienes{" "}
        <span className="font-bold color-secondary">
          {empresa.nombre || "DomiExpress"},
        </span>{" "}
        tienes Todo.
      </h1>
      <div className="mt-8 w-full max-w-xl">
        <div className="relative w-full">
          <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden focus-within:ring-2 ring-green-300">
            <span className="pl-4 text-gray-500">
              <MagnifyingGlassIcon className="w-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar por categorías..."
              className="w-full px-3 py-3 text-sm sm:text-base text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredData.length > 0 && (
            <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-md shadow-lg text-black text-sm">
              {filteredData.map((negocio, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSearchTerm(negocio.nombre);
                    setFilter(negocio.id);
                    setFilteredData([]);
                  }}
                >
                  {negocio.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info y link de login */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-3 text-center text-sm px-2">
          <button className="flex items-center text-white font-bold hover:underline">
            <BuildingOffice2Icon className="w-5 mr-2" />
            {empresa.descripcion || "Software para domicilios"},{" "}
            {empresa.direccion || "Pitalito, Huila"}
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /*   <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10">
        <div className="grid items-center gap-8 sm:gap-20 md:grid-cols-2">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl md:leading-snug text-green-500">
              {empresa.nombre}
            </h2>
            <div className="mb-6 max-w-lg text-sm text-gray-500 sm:text-base md:mb-12">
              <p>
                {empresa.descripcion}, {empresa.direccion}
              </p>
              <label>{empresa.email}</label>
              <label>{empresa.telefono}</label>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex relative w-full max-w-lg border border-solid border-gray-300 p-1 focus-within:outline focus-within:outline-2"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex-1 h-9 w-full bg-white px-3 py-2 text-sm text-black focus:outline-none"
                  placeholder="Buscar Por Categorias...."
                  autoComplete="off"
                />
                {filteredData.length > 0 && (
                  <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-md shadow-md">
                    {filteredData.map((negocio, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSearchTerm(negocio.nombre);
                          setFilter(negocio.id);
                          setFilteredData([]);
                        }}
                      >
                        {negocio.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="relative w-auto cursor-pointer bg-green-500 px-6 py-2 text-center font-semibold text-white"
              >
                <MagnifyingGlassIcon className="w-5" />
              </button>
            </form>
          </div>
          <div>
            <img
              src={
                baner
                  ? baner.img
                  : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/burger-king-banner-design-template-a886c11d0e725b8a66d051fb64b63064_screen.jpg?ts=1733380826"
              }
              alt=""
              className="mx-auto inline-block h-100 w-full max-w-xl"
            />
          </div>
        </div>
      </div> */
}
