import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loading";

export default function Categorias() {
  const [data, setdata] = useState([]);
  const [loading, setLoader] = useState(false);
  useEffect(() => {
    const Get = async () => {
      try {
        setLoader(true);
        let response = await axios.get(`categorias`);
        console.log(response.data);
        setdata(response.data);
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    };
    Get();
  }, []);
  //CARGADOR DE LOS COMPONENTES.
  if (loading) {
    return <Loader />;
  }

  return (
    <div class="font-sans  py-4 mx-auto lg:max-w-7xl md:max-w-4xl">
      <h2 class="text-4xl font-extrabold text-purple-500  mb-16 text-center">
        Categorias
      </h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:justify-center gap-y-8 gap-x-6">
        {data.map((item) => (
          <div class="flex gap-6 overflow-hidden cursor-pointer">
            <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img
                src={`https://asuprocolombiasas.com/php/${item.img}`}
                alt="product1"
                class="h-full w-full object-contain"
                style={{
                  borderRadius: "100%",
                  height: "100%",
                  width: "100%",
                  backgroundSize: "cover",
                }}
              />
            </div>

            <div>
              <h3 class="text-base font-bold text-gray-800">{item.nombre}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
