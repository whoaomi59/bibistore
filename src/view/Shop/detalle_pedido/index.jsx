import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PrinterIcon } from "@heroicons/react/24/outline";
import MiQR from "../../../API/qr";
import { URL } from "../../../App";

export default function Detalle_Pedido({ logo, empresa, datos_empresa }) {
  const { id, nombre } = useParams();
  const [data, setData] = useState([]);
  const FechaHoy = new Date().toISOString().split("T")[0];
  const [total, setTotal] = useState(0);
  const currentUrl = window.location.href;

  useEffect(() => {
    if (!id) return;
    const GET = async () => {
      try {
        let response = await axios.get(
          `/Shop/pedidos/detalle_pedidos.php?id_pedido=${id}`
        );

        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        alert("No se pudo obtener la información.");
      }
    };

    GET();
  }, [id]);

  useEffect(() => {
    if (data.length > 0) {
      const subtotal = data.reduce(
        (acc, item) => acc + parseFloat(item.subtotal || 0),
        0
      );
      setTotal(subtotal.toFixed(2));
    }
  }, [data]);

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="sm:w-11/12 lg:w-3/4 mx-auto">
        <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
          <div className="flex justify-between">
            <div>
              <img
                src={logo}
                alt=""
                className="size-20"
                width="40"
                height="40"
              />

              <h1 className="mt-2 text-lg md:text-xl font-semibold text-green-600">
                {empresa}
              </h1>
            </div>

            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Factura # {id}
              </h2>
              <span className="mt-1 block text-gray-500">3682303</span>

              <address className="mt-4 not-italic text-gray-800">
                {datos_empresa.nombre}
                <br />
                {datos_empresa.descripcion}
                <br />
                {datos_empresa.direccion} <br />
                {datos_empresa.email}
                <br /> {datos_empresa.telefono}
              </address>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Cobrar a:</h3>
              <h3 className="text-lg font-semibold text-gray-800">{nombre}</h3>
              <address className="mt-2 not-italic text-gray-500">
                Colombia
                <br />
              </address>
            </div>
            {/* Col */}

            <div className="sm:text-end space-y-2">
              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Fecha de factura:
                  </dt>
                  <dd className="col-span-2 text-gray-500">{FechaHoy}</dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Fecha de vencimiento:
                  </dt>
                  <dd className="col-span-2 text-gray-500">{FechaHoy}</dd>
                </dl>
              </div>
              {/* End Grid */}
            </div>
            {/* Col */}
          </div>
          {/* End Grid */}
          {/* Table */}
          <div className="mt-6">
            <div className="border border-gray-200 p-4 rounded-lg space-y-4">
              <div className="hidden sm:grid sm:grid-cols-5">
                <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                  Producto
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  cantidad
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  negocio
                </div>
                <div className="text-end text-xs font-medium text-gray-500 uppercase">
                  total
                </div>
              </div>

              <div className="hidden sm:block border-b border-gray-200"></div>
              {data.map((item) => (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      {item.Pedido}
                    </h5>
                    <p className="font-medium text-gray-800">{item.Producto}</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Cantidad
                    </h5>
                    <p className="text-gray-800">{item.cantidad}</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Negocio
                    </h5>
                    <p className="text-gray-800">{item.Negocio}</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      subtotal
                    </h5>
                    <p className="sm:text-end text-gray-800">
                      ${item.subtotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Subtotal:
                  </dt>
                  <dd className="col-span-2 text-gray-500">${total}</dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Total:
                  </dt>
                  <dd className="col-span-2 text-gray-500">${total}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mt-8 sm:mt-12">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">¡Gracias!</h4>
              <p className="text-gray-500">
                Si tiene alguna pregunta sobre esta factura, utilice la
                siguiente información de contacto:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  whoaomi11@gmail.com
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  +57 3144160224
                </p>
              </div>
              <p className="mt-5 text-sm text-gray-500">© 2025 Whoaomi.</p>
            </div>
            <div>
              <MiQR valor={currentUrl} size={150} />
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">© 2025 Whoaomi.</p>
        </div>
        <div className="mt-6 flex justify-end gap-x-3">
          <a
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50"
            href="#"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Factura PDF
          </a>
          <button
            onClick={() => window.print()}
            className="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            <PrinterIcon className="w-4" />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
