import {
  ArrowLongLeftIcon,
  BuildingStorefrontIcon,
  CircleStackIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NavbarShop({ logo, Roles, nombre }) {
  const [Toggle, setToggle] = useState(false);
  return (
    <header class="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-2">
      <nav class="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
        <div class="lg:col-span-3 flex items-center">
          <a
            class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/shop/negocios"
            aria-label="Preline"
          >
            <img
              class="w-20 h-auto"
              src={logo ? logo : "/logo/Logo-Delivra.1.png"}
              alt="Logo"
            />
          </a>
        </div>

        <div class="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
          <div className="flex items-center mr-2">
            {nombre && <>{nombre}</>}
          </div>

          {Roles ? (
            ""
          ) : (
            <a
              href="/login"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent btn-bg-primary"
            >
              Ingresar
            </a>
          )}
          <div class="lg:hidden">
            <button
              onClick={() => setToggle((prev) => !prev)}
              type="button"
              class="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-hcail-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-hcail"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-hcail"
            >
              <svg
                class="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-hcail"
          className={`hs-collapse ${
            Toggle ? "" : "hidden"
          }  overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6`}
          aria-labelledby="hs-navbar-hcail-collapse"
        >
          <div class="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
            <div className="flex items-center">
              <a
                class="relative  text-black focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-purple-600 hover:text-gray-600"
                href="/"
                aria-current="page"
              >
                Inicio
              </a>
              <HomeIcon className="w-5 ml-2 text-gray-500" />
            </div>
            <a
              className="flex items-center text-black hover:text-gray-600"
              href="/shop/negocios"
            >
              Negocios{" "}
              <BuildingStorefrontIcon className="w-5 ml-2 text-gray-500" />
            </a>

            {Roles === "admin" || Roles === "negocio" ? (
              <a
                className="flex items-center text-black hover:text-gray-600"
                href="/dashboard"
              >
                Admin
                <WrenchScrewdriverIcon className="w-5 ml-2 text-gray-500" />
              </a>
            ) : (
              <>
                <a
                  className="flex items-center text-black hover:text-gray-600"
                  href="/shop/car_shop"
                >
                  Carrito{" "}
                  <ShoppingCartIcon className="w-5 ml-2 text-gray-500" />
                </a>

                {Roles && (
                  <div className="flex items-center">
                    <a
                      className="flex items-center text-black hover:text-gray-600"
                      href="/shop/pedidos"
                    >
                      Mis pedidos
                      <ShoppingBagIcon className="w-5 ml-2 text-gray-500" />
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="fixed bottom-1 md:hidden left-1/2 transform -translate-x-1/2 w-[95%] max-w-md bg-white rounded-2xl shadow-lg flex justify-around items-center py-2 px-4 z-50 sm:mb-0">
        <a
          href="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs"
        >
          <HomeIcon className="h-6 w-6" />
          Inicio
        </a>
        <a
          href="/shop/car_shop"
          className="flex flex-col items-center text-gray-800 hover:text-blue-600 text-xs"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          Carrito
        </a>
        <a
          href="/shop/negocios"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs"
        >
          <ArrowLongLeftIcon className="w-7" />
          Negocios
        </a>
      </div>
    </header>
  );
}
