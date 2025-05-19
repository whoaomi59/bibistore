import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChartBarIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { formatearCOP } from "../../components/content/formatoMoneda";
import Loader from "../../components/content/loader";

const Dashboard = () => {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [pedidosPorDia, setPedidosPorDia] = useState({});
  const [dineroHoy, setDineroHoy] = useState(0);
  const [dineroTotal, setDineroTotal] = useState(0);
  const [data, setdata] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTotalPedidos(data.length);

    const hoy = new Date().toLocaleDateString();

    let totalHoy = 0;
    let totalGlobal = 0;

    const agrupados = data.reduce((acc, pedido) => {
      const fecha = new Date(pedido.fecha_pedido).toLocaleDateString();
      acc[fecha] = (acc[fecha] || 0) + 1;

      const monto = parseInt(pedido.total) || 0;
      totalGlobal += monto;
      if (fecha === hoy) {
        totalHoy += monto;
      }

      return acc;
    }, {});

    setPedidosPorDia(agrupados);
    setDineroHoy(totalHoy);
    setDineroTotal(totalGlobal);
  }, [data]);

  const formatoPesos = (valor) =>
    valor.toLocaleString("es-CO", { style: "currency", currency: "COP" });

  useEffect(() => {
    const Get = async () => {
      try {
        setLoader(true);
        let response = await axios.get("/api/pedidos/controller.php");
        setdata(response.data);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    Get();
  }, []);

  if (loader) {
    return <Loader />;
  }

  console.table(data);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800">
        📈 Dashboard de Pedidos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Pedidos */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total de Pedidos</h2>
              <p className="text-5xl font-bold mt-2">{totalPedidos}</p>
            </div>
            <ChartBarIcon className="w-16 h-16 opacity-30" />
          </div>
        </div>

        {/* Dinero Total */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Dinero</h2>
              <p className="text-2xl font-bold mt-2">
                {formatoPesos(dineroTotal)}
              </p>
            </div>
            <BanknotesIcon className="w-14 h-14 opacity-30" />
          </div>
        </div>

        {/* Dinero Hoy */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Dinero Hoy</h2>
              <p className="text-2xl font-bold mt-2">
                {formatoPesos(dineroHoy)}
              </p>
            </div>
            <CurrencyDollarIcon className="w-14 h-14 opacity-30" />
          </div>
        </div>

        {/* Pedidos por Día */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Pedidos por Día
            </h2>
            <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
          </div>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-auto">
            {Object.entries(pedidosPorDia).map(([fecha, cantidad]) => (
              <li
                key={fecha}
                className="py-2 flex justify-between text-gray-700"
              >
                <span>{fecha}</span>
                <span className="font-bold">{cantidad}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>{" "}
      {/* Métricas por negocio */}
      {/* Métricas por negocio (solo día actual) */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📌 Pedidos de Hoy por Negocio
        </h2>

        <div className="space-y-6 max-h-[500px] overflow-auto pr-4">
          {Object.entries(
            data.reduce((acc, pedido) => {
              const hoy = new Date().toLocaleDateString();
              const fechaPedido = new Date(
                pedido.fecha_pedido
              ).toLocaleDateString();
              if (fechaPedido !== hoy) return acc; // solo pedidos de hoy

              const negocio = pedido.nombre_negocio || "Sin nombre";
              const monto = parseInt(pedido.total) || 0;

              if (!acc[negocio]) acc[negocio] = { pedidos: 0, total: 0 };

              acc[negocio].pedidos += 1;
              acc[negocio].total += monto;

              return acc;
            }, {})
          ).map(([negocio, datos]) => (
            <div
              key={negocio}
              className="border border-gray-200 rounded-xl p-4"
            >
              <a href={`/pedidos/${datos.pedido}/${negocio}`}>
                <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                  {negocio}
                </h3>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>
                    🧾 Pedidos: <strong>{datos.pedidos}</strong>
                  </span>
                  <span>
                    💰 Total:{" "}
                    <strong className="text-green-600">
                      {formatearCOP(datos.total)}
                    </strong>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
