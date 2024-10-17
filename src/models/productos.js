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

console.log(Productos);

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
    img: "/img/Productos/sobra1.jpeg",
    name: "Sombra BOWNIE",
    precio: 25000,
    descripcion: "Sombra chocolate,Beauty Glazed.",
  },
  {
    id: 8,
    img: "/img/Productos/solar1.jpeg",
    name: "Protector Solar",
    precio: 25000,
    descripcion: "Protector Solar en polvo,Trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro1.jpeg",
    name: "Sombra De kevin y coco",
    precio: 17000,
    descripcion: "Sombra De kevin y coco",
  },
  {
    id: 8,
    img: "/img/Productos/pro2.jpeg",
    name: "Retro Gloss",
    precio: 6000,
    descripcion: "Retro Gloss,Trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro3.jpeg",
    name: "Tinta Rimocoo",
    precio: 6000,
    descripcion: "Tinta Rimocoo",
  },
  {
    id: 8,
    img: "/img/Productos/pro4.jpeg",
    name: "Sombra Coffe",
    precio: 14000,
    descripcion: "Sombra Coffe Tono 2*,s.f.r Color",
  },
  {
    id: 8,
    img: "/img/Productos/pro6.jpeg",
    name: "Brillo Labios",
    precio: 8000,
    descripcion: "Brillo Idratante magico,trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro7.jpeg",
    name: "Sombras Dreams",
    precio: 14000,
    descripcion: "Sombras Dreams,s.f.r Color",
  },
  {
    id: 8,
    img: "/img/Productos/pro8.jpeg",
    name: "Sombra UGLY",
    precio: 14000,
    descripcion: "Sombra Ugly BEAUTY",
  },
  //
  {
    id: 8,
    img: "/img/Productos/pro9.jpeg",
    name: "Labial Gloss",
    precio: 12000,
    descripcion: "Labial Gloss Barra Liquida.",
  },
  {
    id: 8,
    img: "/img/Productos/pro10.jpeg",
    name: "Rubor de stampa",
    precio: 10000,
    descripcion: "Rubor de stampa",
  },
  {
    id: 8,
    img: "/img/Productos/pro11.jpeg",
    name: "Delineadores Glier",
    precio: 6000,
    descripcion: "Delineadores Glier",
  },
  {
    id: 8,
    img: "/img/Productos/pro12.jpeg",
    name: "Crema Despigmentante",
    precio: 18000,
    descripcion: "Crema Despigmentante,Bioaqua",
  },
  {
    id: 8,
    img: "/img/Productos/pro13.jpeg",
    name: "Brochas difuminadoras",
    precio: 17000,
    descripcion: "Brochas difuminadoras x10",
  },
  //
  {
    id: 8,
    img: "/img/Productos/pro14.jpeg",
    name: "Bronzer + Brocha",
    precio: 12000,
    descripcion: "Bronzer,L.A.COLORS",
  },
  {
    id: 8,
    img: "/img/Productos/pro15.jpeg",
    name: "Paleta Multi Color",
    precio: 30000,
    descripcion: "Paleta Multi Color,Rebelde",
  },
  {
    id: 8,
    img: "/img/Productos/pro16.jpeg",
    name: "Rueda Correctores",
    precio: 12000,
    descripcion: "Rueda Correctores x3 Tonos",
  },
  //
  {
    id: 8,
    img: "/img/Productos/pro17.jpeg",
    name: "Delineador Glie,trendy",
    precio: 13000,
    descripcion: "Delineador Glie,trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro18.jpeg",
    name: "Delineador Labios",
    precio: 5000,
    descripcion: "Delineador Labios,trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro19.jpeg",
    name: "Delineador Labios",
    precio: 13000,
    descripcion: "Delineador Labios,trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro20.jpeg",
    name: "Labial Colageno",
    precio: 9000,
    descripcion: "Pigmenta segun PH",
  },
  {
    id: 8,
    img: "/img/Productos/pro21.jpeg",
    name: "Forever Gloss",
    precio: 5000,
    descripcion: "Gloss,Trendy",
  },
  {
    id: 8,
    img: "/img/Productos/pro22.jpeg",
    name: "Delineador Prueba Agua",
    precio: 25000,
    descripcion: "Delineador Prueba Agua,Engool",
  },
];
