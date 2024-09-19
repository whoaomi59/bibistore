import * as Icons from "@heroicons/react/24/outline";

const data = [
  {
    img: "https://http2.mlstatic.com/D_NQ_NP_774287-MLU69787960621_062023-O.webp",
  },
  {
    img: "https://lignedor.com.co/wp-content/uploads/2023/01/Glamour-Paleta.jpg",
  },
  {
    img: "https://www.magnacosmetics.co/wp-content/uploads/2022/05/50077yf2.jpg",
  },
  {
    img: "https://maquillajetonos.com/wp-content/uploads/2020/09/mascara-extreme-4.jpg",
  },
  {
    img: "https://maquillajetonos.com/wp-content/uploads/2020/09/mascaraextreme2.jpg",
  },
  {
    img: "https://prebel.vtexassets.com/arquivos/ids/156573/Maquillaje-Ojos-Pestaninas_PB0047947_SinColor_1.jpg?v=636906833888000000",
  },
  {
    img: "https://vitu.com.co/wp-content/uploads/2020/10/Maquillaje-Unas-Esmaltes_PB0074567_c1836e_1.jpg",
  },
  {
    img: "https://i0.wp.com/surtibelleza.com.co/wp-content/uploads/2024/04/maquillaje-unas-esmalte-desvergonzada-masglo.png?fit=800%2C800&ssl=1",
  },
  {
    img: "https://staticco.natura.com/cdn/ff/wIxo8zL2uzbuvSrKU8ob8vVOFESZWaU1JdQNFKcEEJI/1723786591/public/products/106535_1_18.jpg",
  },
];

export default function List_Produc() {
  return (
    <div class="font-[sans-serif]">
      <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 class="text-4xl font-extrabold text-gray-800 mb-12">
          Nuestros productos.
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
          {data.map((item) => (
            <a href="/Product_Detail/8">
              <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
                <div class="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                  <Icons.HeartIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div class="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img
                    src={item.img}
                    alt="Product 1"
                    class="h-full w-full object-cover object-top hover:scale-110 transition-all"
                  />
                </div>

                <div>
                  <h3 class="text-lg font-extrabold text-gray-800">
                    Sole Elegance
                  </h3>
                  <p class="text-gray-600 text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <h4 class="text-lg text-gray-800 font-bold mt-4">$10</h4>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div class="md:flex m-4 mt-10">
          <p class="text-sm text-gray-500 flex-1">Registros por página</p>

          <div class="flex items-center max-md:mt-4">
            <p class="text-sm text-gray-500">Display</p>
            <ul class="flex space-x-1 ml-2">
              <button class="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
                <Icons.ChevronLeftIcon className="w-5 text-gray-500" />
              </button>
              <li class="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
                6
              </li>
              <button class="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
                <Icons.ChevronRightIcon className="w-5 text-gray-500" />
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
