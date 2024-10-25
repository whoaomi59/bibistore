import axios from "axios";
import { useEffect, useState } from "react";

export default function Product_Detail() {
  return (
    <div
      className="bg-white"
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <div class="font-sans">
        <div class="grid items-start grid-cols-1 md:grid-cols-2 p-4 gap-12 max-w-6xl mx-auto">
          <div class="grid grid-cols-2 md:sticky top-0 gap-3">
            <div>
              <img
                src="https://http2.mlstatic.com/D_NQ_NP_774287-MLU69787960621_062023-O.webp"
                alt="Product"
                class="w-full h-full object-cover object-top rounded-md"
              />
            </div>
            <div>
              <img
                src="https://lignedor.com.co/wp-content/uploads/2023/01/Glamour-Paleta.jpg"
                alt="Product"
                class="w-full h-full object-cover object-top rounded-md"
              />
            </div>
            <div>
              <img
                src="https://img.ws.mms.shopee.com.co/100e599c956b86003add3f49b1437af9"
                alt="Product"
                class="w-full h-full object-cover object-top rounded-md"
              />
            </div>
            <div>
              <img
                src="https://i5.walmartimages.com.mx/mg/gm/3pp/asr/ca35309e-66ee-4645-bb05-1ac0d0026206.b8001ec278adc59367822b81aaff40e9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
                alt="Product"
                class="w-full h-full object-cover object-top rounded-md"
              />
            </div>
          </div>

          <div class="max-lg:max-w-2xl">
            <div>
              <h2 class="text-2xl font-extrabold text-gray-800">
                Paleta de Sombras Glamour
              </h2>
              <p class="text-sm text-gray-500 mt-2">Well-Versed Commerce</p>
            </div>

            <div class="flex space-x-1 mt-4">
              <svg
                class="w-5 fill-orange-500"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-orange-500"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-orange-500"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-orange-500"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <button
                type="button"
                class="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center !ml-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                    data-original="#000000"
                  />
                  <path
                    d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                    data-original="#000000"
                  />
                </svg>
                87 Reviews
              </button>
            </div>

            <div class="mt-8">
              <p class="text-gray-800 text-4xl font-bold">$30</p>
              <p class="text-gray-500 text-sm mt-2">
                <strike>$42</strike>{" "}
                <span class="text-sm ml-1">Tax included</span>
              </p>
            </div>

            <div class="mt-8">
              <h3 class="text-xl font-bold text-gray-800">Choose a Color</h3>
              <div class="flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  class="w-10 h-10 bg-gray-800 border border-purple-500 hover:border-orange-500 rounded-full shrink-0"
                ></button>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-xl font-bold text-gray-800">Choose a Size</h3>
              <div class="flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  class="w-10 h-10 border hover:border-orange-500 font-semibold text-gray-800 text-sm rounded-full flex items-center justify-center shrink-0"
                >
                  SM
                </button>
              </div>
            </div>

            <div class="mt-8 space-y-4 max-w-xs">
              <button
                type="button"
                class="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-md"
              >
                Comprar ahora
              </button>
              <button
                type="button"
                class="w-full px-4 py-2.5 border border-purple-500 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md"
              >
                Añadir a la cesta
              </button>
            </div>

            <div class="mt-8">
              <div>
                <h3 class="text-xl font-bold text-gray-800">
                  Descripción del Producto
                </h3>
                <p class="text-sm text-gray-500 mt-4">
                  Mejora tu estilo informal con nuestra camiseta premium para
                  hombre. Diseñada para brindar comodidad y con un ajuste
                  moderno, esta versátil camiseta es una incorporación esencial
                  a tu guardarropa. La tela suave y transpirable garantiza
                  comodidad durante todo el día, lo que la hace perfecta para
                  usar todos los días. Su cuello redondo clásico y mangas cortas
                  ofrecen un estilo atemporal.
                </p>
              </div>

              <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-500">
                <li>
                  A t-shirt is a wardrobe essential because it is so versatile.
                </li>
                <li>
                  Available in a wide range of sizes, from extra small to extra
                  large, and even in tall and petite sizes.
                </li>
                <li>
                  This is easy to care for. They can usually be machine-washed
                  and dried on low heat.
                </li>
                <li>
                  You can add your own designs, paintings, or embroidery to make
                  it your own.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
