import axios from "axios";
import { useEffect, useState } from "react";
import { enviarWhatsApp } from "../../../API/CallmeBot";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Alertas } from "../../../components/content/alert/Sweealert";
import Swal from "sweetalert2";

export default function Car_Shop({ usuarios }) {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [ubicacionEnvio, setUbicacionEnvio] = useState("");
  const [tipoUbicacion, setTipoUbicacion] = useState("");
  const [numerotelefono, setnumerotelefono] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [num, setnum] = useState(false);

  const taxRate = 0.0; // 5% de impuestos

  // Cargar productos desde localStorage al montar el componente
  useEffect(() => {
    const storedProducts = localStorage.getItem("cart");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      calcularSubtotal(parsedProducts);
    }
  }, []);

  // Función para calcular el subtotal
  const calcularSubtotal = (productos) => {
    const nuevoSubtotal = productos.reduce(
      (total, product) => total + product.precio * product.cantidad,
      0
    );
    setSubtotal(nuevoSubtotal);
  };

  // Función para actualizar el carrito en localStorage
  const actualizarCarrito = (nuevoCarrito) => {
    setProducts(nuevoCarrito);
    localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
    calcularSubtotal(nuevoCarrito);
  };

  // Aumentar cantidad
  const handleIncreaseQuantity = (index) => {
    const nuevoCarrito = [...products];
    nuevoCarrito[index].cantidad += 1;
    actualizarCarrito(nuevoCarrito);
  };

  // Disminuir cantidad (sin permitir valores negativos)
  const handleDecreaseQuantity = (index) => {
    const nuevoCarrito = [...products];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      actualizarCarrito(nuevoCarrito);
    }
  };

  // Eliminar producto del carrito
  const handleRemoveProduct = (index) => {
    const nuevoCarrito = products.filter((_, i) => i !== index);
    actualizarCarrito(nuevoCarrito);
  };

  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  const PostCar = async () => {
    if (products.length === 0) {
      return alert("El carrito está vacío");
    }

    // Agrupar productos por negocio_id
    const pedidosPorNegocio = products.reduce((acc, product) => {
      if (!acc[product.negocio_id]) {
        acc[product.negocio_id] = [];
      }
      acc[product.negocio_id].push({
        producto_id: product.id_producto,
        cantidad: product.cantidad,
        precio_unitario: product.precio,
        subtotal: product.precio * product.cantidad,
      });
      return acc;
    }, {});

    try {
      if (!tipoUbicacion || !shippingCost || !numerotelefono) {
        return Swal.fire({
          title: "info",
          text: `Todos los datos de infomacion del usuario son requeridos!!`,
          icon: "info",
        });
      }
      // Validar que el número de teléfono tenga al menos 10 dígitos numéricos
      const telefonoLimpio = numerotelefono.replace(/\D/g, ""); // elimina cualquier carácter no numérico

      if (telefonoLimpio.length < 10 || telefonoLimpio.length > 10) {
        setnum(true);
        return Swal.fire({
          title: "Número inválido",
          text: "El número de teléfono debe tener 10 dígitos.",
          icon: "warning",
        });
      }
      for (const negocioId in pedidosPorNegocio) {
        const productos = pedidosPorNegocio[negocioId];
        const totalPedido = productos.reduce((sum, p) => sum + p.subtotal, 0);

        const Negocio = products[0].Negocio;

        let response = await axios.post(`/api/pedidos/controller.php`, {
          cliente_id: usuarios.id,
          negocio_id: negocioId,
          total: totalPedido.toFixed(2),
          estado: "pendiente",
          ubicacion: ubicacionEnvio,
          tipoUbicacion: tipoUbicacion,
          Telefono: numerotelefono,
          productos: productos,
        });

        let number = response.data.info_negocio.telefono;
        let key = response.data.info_negocio.ApiKey;
        let factura = response.data.info_negocio.id;
        let direccion = response.data.info_negocio.direccion;

        if (number) {
          enviarWhatsApp({
            numeroNegocio: number,
            keyNegocios: key,
            mensaje: {
              numero_Factura: factura,
              cliente_id: usuarios?.nombre || "",
              negocio_id: Negocio,
              telefono_negocio: number,
              total: totalPedido,
              estado: "pendiente",
              productos: products,
              ubicacion: ubicacionEnvio,
              tipoUbicacion: tipoUbicacion,
              telefono: numerotelefono,
              costoEnvio: shippingCost,
              direccion: direccion,
            },
          });
        }
      }

      // 🟢 BORRAR EL LOCAL STORAGE DESPUÉS DE GUARDAR EL PEDIDO
      localStorage.removeItem("cart");
      setProducts([]);
      Alertas({ icon: "success", message: "Pedido enviado!!" });
      return setTimeout(() => {
        Comprar();
      }, 1000);
    } catch (error) {
      alert("Error al enviar los pedidos");
      console.error(error);
      return Alertas({
        icon: "error",
        message: "Error al enviar los pedidos!!",
      });
    }
  };

  const handleBuyClick = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      const currentPath = window.location.pathname;
      sessionStorage.setItem("redirectAfterLogin", currentPath);
      window.location.href = "/login";
      return;
    }
    PostCar();
  };

  const Comprar = async () => {
    return (window.location.href = "/shop/negocios");
  };

  return (
    <div className="max-w-5xl max-md:max-w-xl mx-auto p-4">
      <div className="flex">
        <h1 className="text-2xl font-bold color-primary">Mis Carrito</h1>
        <ShoppingBagIcon className="w-7 ml-2 text-gray-500" />
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-md"
                key={index}
              >
                <div className="flex gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img
                      src={product.img}
                      alt={product.Producto}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold color-primary">
                        {product.Producto}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 mt-2">
                        {product.Tipo}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecreaseQuantity(index)}
                        className="flex items-center justify-center w-5 h-5 btn-bg-primary outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 124 124"
                        >
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                        </svg>
                      </button>
                      <span className="font-semibold text-sm">
                        {product.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncreaseQuantity(index)}
                        className="flex items-center justify-center w-5 h-5  btn-bg-primary outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          s
                          viewBox="0 0 42 42"
                        >
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex flex-col">
                  <div className="flex items-start gap-4 justify-end">
                    <svg
                      onClick={() => handleRemoveProduct(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer fill-red-400 hover:fill-red-600 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                    </svg>
                  </div>
                  {/* Precio unitario */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-500">
                    {formatearCOP(product.precio)}
                  </h3>

                  {/* Precio total por cantidad */}
                  <h3 className="text-sm sm:text-base font-semibold color-primary ">
                    Total:{formatearCOP(product.precio * product.cantidad)}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div class={`w-full text-white  bg-primary`}>
              <div
                class={`container flex items-center justify-between px-2 py-2 mx-auto mt-2`}
              >
                <div class="flex text-center">
                  <InformationCircleIcon class="w-6 h-6" />
                  <p class="mx-3"> No hay productos en el carrito.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
          <ul className="color-primary font-medium space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Numer de telefono
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                value={numerotelefono}
                onChange={(e) => {
                  setnumerotelefono(e.target.value);
                  setnum(false);
                }}
              />
              {num && (
                <span className="text-red-500">Minimo de digitos es de 10</span>
              )}
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Ubicación de envío
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                value={ubicacionEnvio}
                onChange={(e) => setUbicacionEnvio(e.target.value)}
              />
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Elije ubicación
              <select
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                value={tipoUbicacion}
                onChange={(e) => {
                  const tipo = e.target.value;
                  setTipoUbicacion(tipo);
                  setShippingCost(tipo === "Rural" ? 10000 : 5000); // Ejemplo: rural cuesta más
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="Urbano">Urbano</option>
                <option value="Rural">Rural</option>
              </select>
            </li>

            <hr className="border-bg-primary mb-4" />
          </ul>

          <ul className="color-primary font-medium space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-semibold">
                {formatearCOP(subtotal)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Envío{" "}
              <span className="ml-auto font-semibold">
                {formatearCOP(shippingCost)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Impuesto{" "}
              <span className="ml-auto font-semibold">
                {formatearCOP(taxAmount)}
              </span>
            </li>
            <hr className="border-bg-primary" />
            <li className="flex flex-wrap gap-4 text-sm font-semibold">
              Total <span className="ml-auto">{formatearCOP(total)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              onClick={handleBuyClick}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide btn-bg-primary  text-white rounded-md"
            >
              Pedir ahora
            </button>

            <button
              onClick={() => Comprar()}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent p-hover-bg-primary color-primary border border-bg-primary rounded-md"
            >
              Adicionar más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
