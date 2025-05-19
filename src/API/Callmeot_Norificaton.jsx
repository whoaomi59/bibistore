import axios from "axios";
import { formatearCOP } from "../components/content/formatoMoneda";

export const EnviarWhatsApp_Admin = async ({ mensaje }) => {
  const numero = "573184141985";
  const ApiKey = "9181021";
  /*  const numero = "573144160224";
  const ApiKey = "7774438"; */
  const texto = construirMensaje(mensaje);

  //URL Negocios
  const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(
    texto
  )}&apikey=${ApiKey}`;

  try {
    await axios.get(url);
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = (pedido) => {
  const {
    cliente_id,
    negocio_id,
    numero_Factura,
    total,
    estado,
    productos,
    ubicacion,
    tipoUbicacion,
    telefono,
    telefono_negocio,
    direccion,
    costoEnvio,
  } = pedido;

  const subtotal = parseFloat(total) || 0;
  const envio = parseFloat(costoEnvio) || 0;
  const Total = subtotal + envio;

  let mensaje = `🧾 *¡Pedido listo para recoger!*\n\n`;

  mensaje += `📄 *Factura N.º:* ${numero_Factura}\n`;
  mensaje += `📌 *Estado del pedido:* ${estado}\n\n`;

  mensaje += `🙋‍♂️ *Datos del cliente*\n`;
  mensaje += `👤 Nombre: ${cliente_id}\n`;
  mensaje += `📞 Teléfono: ${telefono}\n`;
  mensaje += `📍 Dirección: ${tipoUbicacion}\n`;
  mensaje += `🗺️ Ubicación: ${ubicacion}\n\n`;

  mensaje += `🍽️ *Datos del restaurante*\n`;
  mensaje += `🏪 Nombre: ${negocio_id}\n`;
  mensaje += `📞 Teléfono: ${telefono_negocio}\n`;
  mensaje += `📍 Dirección: ${direccion}\n\n`;

  mensaje += `🛒 *Productos comprados*\n`;
  productos.forEach((prod, index) => {
    const nombre = prod.nombre || "Producto sin nombre";
    const cantidad = prod.cantidad || 0;
    const precio = parseFloat(prod.precio) || 0;
    mensaje += `\n${cantidad} x ${nombre} - Precio: ${formatearCOP(precio)}`;
  });

  mensaje += `\n\n💵 *Resumen del pedido*\n`;
  mensaje += `🧾 Subtotal: ${formatearCOP(subtotal)}\n`;
  mensaje += `🚚 Domicilio: ${formatearCOP(envio)}\n`;
  mensaje += `🟩 *Total a pagar: ${formatearCOP(Total)}*\n`;

  return mensaje;
};
