import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import Loader from "../../../components/content/loader";

export default function PedidosShop({ IdUser }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loader, setLodaer] = useState(false);
  let id = localStorage.getItem("id");

  useEffect(() => {
    const GET = async () => {
      try {
        setLodaer(true);
        let response = await axios.get(
          `/Shop/pedidos/controller.php?cliente_id=${id}`
        );
        setLodaer(false);
        return setUsuarios(response.data);
      } catch (error) {
        setLodaer(false);
        return alert(error);
      }
    };
    GET();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-4">
        <section class="container  mx-auto">
          <div class="flex items-center gap-x-3 mb-7">
            <h2 class="text-lg font-medium text-gray-800">Pedidos Creados</h2>
            <span class="px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full">
              Todos
            </span>
          </div>
          <div className="mx-auto w-full max-w-7xl px-5">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {usuarios.map((item, index) => (
                <div key={index} className="relative">
                  <a
                    href={`/shop/pedidos/detalle/${item.id_pedido}/${item.usuario_pedido}`}
                    className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10 relative"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), 
                   url(/logo/logo.png)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-opacity-30 rounded-md" />
                    <div className="relative z-10">
                      <img
                        src={item.logo_pedido}
                        alt="logo"
                        className="inline-block h-16 w-16 object-cover rounded-full bg-white"
                      />
                      <h3 className="text-xl font-semibold text-white">
                        {item.nombre_negocio}
                      </h3>{" "}
                      <div className="flex mt-2">
                        <span className="text-sm text-gray-100">
                          {formatearCOP(item.total)}
                        </span>
                      </div>
                      <div className="flex mt-2">
                        <span className="text-sm text-white mr-2 rounded-full  bg-green-600 px-3 py-1">
                          {item.estado}
                        </span>
                        <span className="text-sm text-gray-100 py-1">
                          {item.usuario_pedido}
                        </span>
                      </div>{" "}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          {/*  <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-green-200 ':border-green-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-green-200 ':divide-green-700">
                    <thead class="bg-green-50 ">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          <div class="flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              class="text-blue-500 border-gray-300 rounded"
                            />
                            <span>Negocio</span>
                          </div>
                        </th>{" "}
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div class="flex items-center gap-x-3">
                            <span>Estado</span>
                          </div>
                        </th>{" "}
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div class="flex items-center gap-x-3">
                            <span>Usuario</span>
                          </div>
                        </th>{" "}
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div class="flex items-center gap-x-3">
                            <span>Total</span>
                          </div>
                        </th>
                        <th scope="col" class="relative py-3.5 px-4">
                          <span class="sr-only">Detalle</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 ':divide-gray-700 ':bg-gray-900">
                      {usuarios.map((item) => (
                        <tr>
                          <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div class="inline-flex items-center gap-x-3">
                              <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded ':bg-gray-900 ':ring-offset-gray-900"
                              />

                              <div class="flex items-center gap-x-2">
                                <img
                                  class="object-cover w-10 h-10 rounded-full"
                                  src={item.logo_pedido}
                                  alt=""
                                />
                                <div>
                                  <h2 class="font-medium text-gray-800 ':text-white ">
                                    {item.nombre_negocio}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                              <h2 class="text-sm font-normal text-emerald-500">
                                {item.estado}
                              </h2>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm text-gray-500 ':text-gray-300 whitespace-nowrap">
                            {item.usuario_pedido}
                          </td>
                          <td class="px-4 py-4 text-sm text-gray-500 ':text-gray-300 whitespace-nowrap">
                            {formatearCOP(item.total)}
                          </td>

                          <td class="px-4 py-4 text-sm whitespace-nowrap">
                            <button
                              onClick={() => Detalle(item)}
                              className={`p-2 rounded bg-green-500   hover:bg-gray-400 m-0.5`}
                            >
                              <ArrowRightCircleIcon className="w-5 text-white" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </>
  );
}
