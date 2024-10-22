import * as Icons from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModeslProductos } from "../../models/productos";

export default function List_Produc() {
  const [pagina, setPaginado] = useState(20);
  const [data, setdata] = useState([]);

  const CargarMas = () => {
    alert("listar mas productos!" + pagina);
    setPaginado(pagina + 20);
  };

  useEffect(() => {
    axios
      .get("/api/productos")
      .then((response) => {
        console.log(response.data);
        setdata(response.data.Productos);
      })
      .catch((err) => {
        console.error("Error al obtener productos", err);
      });
  }, []);

  return (
    <div class="font-[sans-serif]">
      <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 class="text-4xl font-extrabold text-gray-800 mb-12">
          Nuestros productos.
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
          {ModeslProductos.map((item) => (
            <a href="/Product_Detail/8">
              <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
                <div class="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                  <Icons.HeartIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div class="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    class="h-full w-full object-cover object-top hover:scale-110 transition-all"
                  />
                </div>

                <div>
                  <h3 class="text-lg font-extrabold text-gray-800">
                    {item.name}
                  </h3>
                  <p class="text-gray-600 text-sm mt-2">{item.descripcion}.</p>
                  <button
                    type="button"
                    class="flex items-center text-purple-600 text-sm bg-purple-50 px-3 py-1.5 tracking-wide rounded-full mt-2"
                  >
                    $ {item.precio.toLocaleString()}
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div class="md:flex m-4 mt-10">
          <button
            onClick={CargarMas}
            className="w-full bg-purple-500 text-white p-2"
          >
            Cargar Mas...
          </button>
        </div>
      </div>
    </div>
  );
}

/*{ModeslProductos.map((item) => (
  <a href="/Product_Detail/8">
    <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
      <div class="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
        <Icons.HeartIcon className="h-5 w-5 text-gray-400" />
      </div>

      <div class="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <img
          src={item.img}
          alt={item.name}
          class="h-full w-full object-cover object-top hover:scale-110 transition-all"
        />
      </div>

      <div>
        <h3 class="text-lg font-extrabold text-gray-800">
          {item.name}
        </h3>
        <p class="text-gray-600 text-sm mt-2">{item.descripcion}.</p>
        <button
          type="button"
          class="flex items-center text-purple-600 text-sm bg-purple-50 px-3 py-1.5 tracking-wide rounded-full mt-2"
        >
          $ {item.precio.toLocaleString()}
        </button>
      </div>
    </div>
  </a>
))}*/
