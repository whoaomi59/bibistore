import axios from "axios";
import { useEffect, useState } from "react";
import { handleWhatsappClick } from "../../API/Whassapp";
import Loader from "../../components/content/loader";
import { motion } from "framer-motion";

export default function Home() {
  const [empresa, setEmpresa] = useState({});
  const [loader, setLoader] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [baner, setbaner] = useState([]);
  const [Info, setInfo] = useState({});
  let textos;

  useEffect(() => {
    const Get = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/empresas/controller.php");
        setEmpresa(response.data[0]);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    const GetBaner = async () => {
      try {
        let response = await axios.get("/api/empresas/empresa_imagenes.php");
        return setbaner(response.data);
      } catch (error) {
        return console.log(error);
      }
    };
    const GetInfoAdmin = async () => {
      try {
        let response = await axios.get("/api/usuarios/Get_Info_Admin.php");
        setInfo(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    GetInfoAdmin();
    Get();
    GetBaner();

    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        baner.length > 0 ? (prev + 1) % baner.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [baner.length]); // importante para que lea bien baner.length actualizado

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="relative min-h-screen flex justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            baner.length > 0
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${baner[currentBanner].img})`
              : "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)),url('/SVG PAGINA/undraw_space-exploration_dhu1.svg')",
          filter: "blur(0px) brightness(1) contrast(1.1) saturate(1)",
          transition: "background-image 1s ease-in-out",
          zIndex: 0,
        }}
      />
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6">
        <div className="flex justify-end">
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full btn-bg-primary text-white  hover:text-white transition-all shadow-md"
            href="/login"
          >
            Ingresar
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mt-5"
        >
          <img
            className="rounded-xl w-50 md:w-60  p-2"
            src={empresa.logo ? empresa.logo : "/logo/logo.png"}
            alt="Logo Empresa"
          />
        </motion.div>

        {/* Títulos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            ¡Bienvenido a{" "}
            <span className="color-primary">
              {empresa.nombre || "DomiExpress"}
            </span>
            !
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-white font-medium drop-shadow-md">
            Tu solución rápida para domicilios y compras locales.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => handleWhatsappClick(textos, Info)}
            className="py-2 px-6 inline-flex items-center gap-x-2 text-lg font-bold rounded-full text-white btn-bg-primary transition-all shadow-lg"
          >
            Domiciliario
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <a
            className="py-2 px-8 inline-flex items-center gap-x-2 text-lg font-bold rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-all shadow-lg"
            href="/shop/negocios"
          >
            Ver Categorias
          </a>
        </motion.div>
      </div>
    </div>
  );
}

const Baners = [
  {
    img: "https://img.freepik.com/psd-gratis/plantilla-portada-facebook-deliciosa-hamburguesa-comida_106176-2198.jpg?semt=ais_hybrid&w=740",
  },
  {
    img: "https://img.freepik.com/psd-gratis/menu-comida-plantilla-banner-web-restaurante_106176-1452.jpg?semt=ais_hybrid&w=740",
  },
  {
    img: "https://img.freepik.com/vector-gratis/banner-venta-comida-rapida-dibujado-mano_23-2150970571.jpg?semt=ais_hybrid&w=740",
  },
];

/* 
<div
  className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage:
      "url('https://img.freepik.com/psd-gratis/plantilla-portada-facebook-deliciosa-hamburguesa-comida_106176-2198.jpg?semt=ais_hybrid&w=740')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-white to-green-200 opacity-70"></div>
  <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
  <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-8 pt-12">
    
    <div className="flex justify-end">
      <motion.a
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-green-400 bg-white text-green-600 hover:bg-green-500 hover:text-white transition-all shadow-md"
        href="/login"
      >
        Ingresar
      </motion.a>
    </div>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="flex justify-center mt-5"
    >
      <img
        className="rounded-xl w-50 md:w-60  p-2"
        src={
          empresa.logo
            ? empresa.logo
            : "/SVG PAGINA/undraw_pair-programming_9jyg.svg"
        }
        alt="Logo Empresa"
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="text-center mt-8"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 leading-tight drop-shadow-md">
        ¡Bienvenido a {empresa.nombre || "nuestra plataforma"}!
      </h1>
      <p className="mt-6 text-lg md:text-2xl text-gray-700 font-medium">
        Tu solución rápida para domicilios y compras locales.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
    >
      <button
        onClick={() => handleWhatsappClick(texto)}
        className="py-3 px-8 inline-flex items-center gap-x-2 text-lg font-bold rounded-full bg-green-500 text-white hover:bg-green-600 transition-all shadow-lg"
      >
        Domiciliario
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <a
        className="py-3 px-8 inline-flex items-center gap-x-2 text-lg font-bold rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-all shadow-lg"
        href="/shop/negocios"
      >
        Comprar
      </a>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.8 }}
      className="mt-16 mb-10"
    >
      <CarouselCustomArrows />
    </motion.div>
  </div>
</div>
 */
