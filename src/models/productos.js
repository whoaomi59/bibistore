import { mock } from "../utils/axios";

const Productos = [
  {
    id: 1,
    img: "https://http2.mlstatic.com/D_NQ_NP_774287-MLU69787960621_062023-O.webp",
    name: "sombras",
    precio: 2000,
    descripcion: "",
  },
  {
    id: 2,
    img: "https://lignedor.com.co/wp-content/uploads/2023/01/Glamour-Paleta.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 3,
    img: "https://www.magnacosmetics.co/wp-content/uploads/2022/05/50077yf2.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 4,
    img: "https://maquillajetonos.com/wp-content/uploads/2020/09/mascara-extreme-4.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 5,
    img: "https://maquillajetonos.com/wp-content/uploads/2020/09/mascaraextreme2.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 6,
    img: "https://prebel.vtexassets.com/arquivos/ids/156573/Maquillaje-Ojos-Pestaninas_PB0047947_SinColor_1.jpg?v=636906833888000000",
    name: "",
    precio: 2000,
  },
  {
    id: 7,
    img: "https://vitu.com.co/wp-content/uploads/2020/10/Maquillaje-Unas-Esmaltes_PB0074567_c1836e_1.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 8,
    img: "https://i0.wp.com/surtibelleza.com.co/wp-content/uploads/2024/04/maquillaje-unas-esmalte-desvergonzada-masglo.png?fit=800%2C800&ssl=1",
    name: "",
    precio: 2000,
  },
  {
    id: 9,
    img: "https://staticco.natura.com/cdn/ff/wIxo8zL2uzbuvSrKU8ob8vVOFESZWaU1JdQNFKcEEJI/1723786591/public/products/106535_1_18.jpg",
    name: "",
    precio: 2000,
  },
];

mock.onGet("/api/productos").reply(200, { Productos });

mock.onGet("/api/producto").reply((config) => {
  const { id } = config.params;
  const invoice = Productos.find((_invoice) => _invoice.id === id);

  return [200, { invoice }];
});

export const ModeslProductos = [
  //carteras
  {
    id: 1,
    img: "/img/Productos/cap_mejor1.png",
    name: "Riñonera GUESS",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso.",
  },
  {
    id: 2,
    img: "/img/Productos/cap_mejor2.png",
    name: "Cartera LOUIS VUITTON",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso + Monedero.",
  },
  {
    id: 3,
    img: "/img/Productos/cap_mejor3.png",
    name: "Cartera DIOR",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso.",
  },
  {
    id: 4,
    img: "/img/Productos/cap_mejor4.png",
    name: "Cartera PRADA",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso.",
  },
  {
    id: 5,
    img: "/img/Productos/cap_mejor5.png",
    name: "Cartera",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso.",
  },
  {
    id: 6,
    img: "/img/Productos/cap_mejor6.png",
    name: "Cartera Dior Rosa",
    precio: 40000,
    descripcion: "Incluye Correa, Bolso.",
  },
  //
  {
    id: 7,
    img: "https://vitu.com.co/wp-content/uploads/2020/10/Maquillaje-Unas-Esmaltes_PB0074567_c1836e_1.jpg",
    name: "",
    precio: 2000,
  },
  {
    id: 8,
    img: "https://i0.wp.com/surtibelleza.com.co/wp-content/uploads/2024/04/maquillaje-unas-esmalte-desvergonzada-masglo.png?fit=800%2C800&ssl=1",
    name: "",
    precio: 2000,
  },
  {
    id: 9,
    img: "https://staticco.natura.com/cdn/ff/wIxo8zL2uzbuvSrKU8ob8vVOFESZWaU1JdQNFKcEEJI/1723786591/public/products/106535_1_18.jpg",
    name: "",
    precio: 2000,
  },
];
