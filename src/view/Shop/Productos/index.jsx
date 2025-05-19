import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import {
  Cog6ToothIcon,
  CogIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Loader from "../../../components/content/loader";
import FilterProduct from "./filter";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import Swal from "sweetalert2";

export default function ProductosShop() {
  const { id } = useParams();
  const [loader, setloader] = useState(false);
  const [data, setData] = useState([]);
  const [idNegocio, setidNegocio] = useState(false);
  const [idProductos, setidproductos] = useState("Comidas");
  const [quantityByProduct, setQuantityByProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(savedCart)) {
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setloader(true);
        let response = await axios.get(
          `/Shop/productos/controller.php?negocio_id=${idNegocio || id}`
        );
        const productosFiltrados = idProductos
          ? response.data.filter((item) => item.Tipo === idProductos)
          : response.data;

        setData(productosFiltrados);
        const initialQuantities = {};
        response.data.forEach((item) => {
          initialQuantities[item.Producto] = 1;
        });
        setQuantityByProduct(initialQuantities);
        setloader(false);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("Error al obtener productos");
        setloader(false);
      }
    };
    fetchProducts();
  }, [id, idNegocio, idProductos]);

  const handleQuantityChange = (productName, change) => {
    setQuantityByProduct((prevQuantities) => {
      const newQuantity = Math.max(
        1,
        (prevQuantities[productName] || 1) + change
      );
      return {
        ...prevQuantities,
        [productName]: newQuantity,
      };
    });
  };

  const addToCart = (item) => {
    const cantidad = quantityByProduct[item.Producto] || 1;
    setCart((prevCart) => {
      // Si el carrito no está vacío, verificamos el negocio
      if (prevCart.length > 0) {
        const negocioActual = prevCart[0].Negocio;
        if (item.Negocio !== negocioActual) {
          Swal.fire({
            title: "Error",
            text: `No puedes agregar productos de otro negocio. Ya tienes productos de ${negocioActual}.`,
            icon: "warning",
          });
          return prevCart; // No actualiza el carrito
        }
      }

      const updatedCart = [...prevCart];
      const existingIndex = updatedCart.findIndex(
        (p) => p.Producto === item.Producto
      );

      if (existingIndex !== -1) {
        updatedCart[existingIndex].cantidad = cantidad; // Reemplaza la cantidad en vez de sumar
      } else {
        updatedCart.push({ ...item, cantidad });
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      Alertas({ icon: "success", message: "¡Producto agregado al carrito!" });

      return updatedCart;
    });
  };

  const productosFiltrados = data.filter((item) =>
    item.Producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loader) return <Loader />;

  return (
    <FilterProduct
      id={id}
      idNegocio={idNegocio}
      setidNegocio={setidNegocio}
      setidproductos={setidproductos}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      idProductos={idProductos}
    >
      <section class="antialiased">
        <div class="mx-auto  px-4 2xl:px-0">
          <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3 max-lg:mt-5">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((item) => (
                <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div class="h-56 w-full">
                    <img
                      class="mx-auto h-full"
                      src={item.img}
                      alt={item.Producto}
                    />
                  </div>
                  <div class="pt-6">
                    <p class="text-lg font-semibold leading-tight text-gray-900 hover:underline">
                      {item.Producto}
                    </p>

                    <div class="mt-2 flex items-center gap-2">
                      <div class="flex items-center">
                        <svg
                          class="h-4 w-4 text-yellow-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg
                          class="h-4 w-4 text-yellow-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg
                          class="h-4 w-4 text-yellow-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg
                          class="h-4 w-4 text-yellow-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg
                          class="h-4 w-4 text-yellow-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>
                      </div>

                      <p class="text-sm font-medium text-gray-900 .:text-white">
                        5.0
                      </p>
                    </div>

                    <ul class="mt-2 flex items-center gap-4">
                      <li class="flex items-center gap-2">
                        <svg
                          class="h-4 w-4 text-gray-500 .:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                          />
                        </svg>
                        <p class="text-sm font-medium text-gray-500 .:text-gray-400">
                          {item.Tipo}
                        </p>
                      </li>

                      <li class="flex items-center gap-2">
                        <svg
                          class="h-4 w-4 text-gray-500 .:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                            d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                          />
                        </svg>
                        <p class="text-sm font-medium text-gray-500 .:text-gray-400">
                          Mejor precio
                        </p>
                      </li>
                    </ul>
                    <p class="text-2xl font-extrabold leading-tight text-gray-900">
                      {formatearCOP(item.precio)}
                    </p>
                    <div class="mt-2 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 mb-3">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.Producto, -1)
                          }
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span>{quantityByProduct[item.Producto] || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.Producto, 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        class="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white btn-bg-primary"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCartIcon className="-ms-2 me-2 h-5 w-5" />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-gray-500">
                <Cog6ToothIcon className="h-16 w-16 mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold">
                  No hay productos disponibles
                </h2>
                <p className="mt-2 text-sm">
                  Intenta ajustar los filtros o vuelve más tarde para ver nuevas
                  opciones.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </FilterProduct>
  );
}
