import * as Icons from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar({ toggle, Roles }) {
  const [rutas, setRutas] = useState([]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login"; // Redirigir a la página de login
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/rutas/controller.php");
        const rutasPermitidas = response.data.filter((item) =>
          item.rol.includes(Roles)
        );
        setRutas(rutasPermitidas);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [Roles]); // Dependencia para actualizar si cambia el rol

  return (
    <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
      <div
        id="sidebar-collapse-menu"
        style={{ height: "calc(100vh - 72px)" }}
        className={`bg-white shadow-lg h-screen fixed py-6 px-4 top-[70px] z-[99] lg:min-w-[250px] ${
          toggle ? "" : "lg:w-max max-lg:w-0 max-lg:invisible"
        } transition-all duration-100`}
      >
        <div>
          <h6 className="text-[#494848] text-sm font-bold px-4">
            General Settings
          </h6>
          <ul className="mt-3 space-y-2">
            {Roles === "admin" && (
              <li className="text-[#636363]">
                <a
                  href="/dashboard"
                  className="text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                >
                  <Icons.QueueListIcon className="w-5 mr-2" />
                  <span>dashboard</span>
                </a>
              </li>
            )}

            {rutas.map((item, index) => {
              const IconComponent = Icons[item.icono];
              return (
                <li key={index} className="text-[#636363]">
                  <a
                    href={item.path}
                    className="text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                  >
                    {IconComponent && <IconComponent className="w-5 mr-2" />}
                    <span>{item.nombre}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6">
          <h6 className="text-[#494848] text-sm font-bold px-4">Actions</h6>
          <ul className="mt-3 space-y-2">
            <li>
              <button
                onClick={handleLogout}
                className="text-[#636363] text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-3"
                  viewBox="0 0 6.35 6.35"
                >
                  <path
                    d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    data-original="#000000"
                  />
                </svg>
                <span>Salir</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
