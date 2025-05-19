import {
  ArrowLeftCircleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DynamicSelect from "../../../components/grid/formulario/DynamicSelect ";
import axios from "axios";
import Loader from "../../../components/content/loader";

export default function FilterProduct({
  children,
  setidNegocio,
  setidproductos,
  searchTerm,
  setSearchTerm,
  id,
  idNegocio,
  idProductos,
}) {
  const [formData, setFormData] = useState({});
  const [filtCategorias, setfiltCategorias] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [Negocios, setNegocios] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const FilterButton = (e) => {
    e.preventDefault();
    try {
      setidNegocio(formData.Negocio);
      setidproductos(filtCategorias);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const GetCategorias = async () => {
      try {
        let response = await axios.get(
          "/api/productos/categorias_productos.php"
        );
        setCategorias(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const GetNegocios = async () => {
      try {
        setLoader(true);
        let response = await axios.get(
          `/Shop/negocios/controller.php?Get=GetOne&id=${idNegocio || id}`
        );
        setNegocios(response.data[0]);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    };
    GetNegocios();
    GetCategorias();
  }, [idNegocio]);

  if (loader) {
    <Loader />;
  }

  return (
    <section class="relative">
      <div class="w-full max-w-7xl mx-auto ">
        <div
          class="flex flex-col lg:flex-row lg:items-center max-lg:gap-2 justify-between w-full py-15 px-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), 
                      url(${Negocios.img})`,
          }}
        >
          <div className="flex">
            <a href="/shop/negocios" className="mr-3">
              <ArrowLeftCircleIcon className="w-10 color-secondary hover:text-green-500" />
            </a>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-white">
              Productos, {Negocios.nombre}
            </h2>
          </div>
          <div class="relative w-full max-w-sm">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2                                 "
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <svg
          class="my-5 w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="1216"
          height="2"
          viewBox="0 0 1216 2"
          fill="none"
        >
          <path d="M0 1H1216" stroke="#E5E7EB" />
        </svg>
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
            <div class="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              {/*   <h6 class="font-medium text-base leading-7 text-black mb-5">
                Precios
              </h6>
              <div class="flex items-center mb-5 gap-1">
                <div class="relative w-full">
                  <select
                    id="FROM"
                    class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                  >
                    <option selected>Min</option>
                    <option value="option 1">1.000</option>
                    <option value="option 2">2.000</option>
                    <option value="option 3">3.000</option>
                    <option value="option 4">4.000</option>
                  </select>
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                      stroke="#111827"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p class="px-1 font-normal text-sm leading-6 text-gray-600">
                  to
                </p>
                <div class="relative w-full">
                  <select
                    id="FROM"
                    class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                  >
                    <option selected>Max</option>
                    <option value="option 1">10.000</option>
                    <option value="option 2">20.000</option>
                    <option value="option 3">30.000</option>
                    <option value="option 4">60.000</option>
                    <option value="option 4">70.000</option>
                    <option value="option 4">80.000</option>
                    <option value="option 4">300.000</option>
                    <option value="option 4">600.000</option>
                    <option value="option 4">1000.000</option>
                  </select>
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                      stroke="#111827"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div> */}
              <h6 class="font-medium text-base leading-7 text-black mb-5">
                Filtros
              </h6>
              <label className="text-gray-600">Categorias:</label>
              <div class="relative w-full mb-8 mt-2">
                {categorias.map((item) => (
                  <button
                    onClick={() => setidproductos(item.nombre)}
                    className={`p-2 m-1 rounded-full border text-sm font-medium transition 
                      ${
                        idProductos === item.nombre
                          ? "bg-primary text-white  shadow-md"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
              <label className="text-gray-600">Negocios:</label>
              <div class="relative w-full mb-8 mt-2">
                <DynamicSelect
                  url="/Shop/negocios/Fillt_negocios.php"
                  name="Negocio"
                  value={formData["Negocio"]}
                  onChange={handleChange}
                  valueKey="id"
                  labelKey="nombre"
                  placeholder="Filtrar negocios"
                  style="text-gray-500"
                />
              </div>
              <button
                onClick={FilterButton}
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:shadow-green-200 btn-bg-primary"
              >
                <MagnifyingGlassIcon className="w-4" />
                Buscar
              </button>
            </div>
          </div>
          <div class="col-span-12 md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
