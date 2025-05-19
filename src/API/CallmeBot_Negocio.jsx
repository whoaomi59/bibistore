import axios from "axios";
import { formatearCOP } from "../components/content/formatoMoneda";

export const EnviarWhatsApp_Negocio = async ({
  mensaje,
  numeroNegocio,
  keyNegocios,
}) => {
  const numero2 = numeroNegocio;
  const KeyNegocios = keyNegocios;
  const texto = construirMensaje(mensaje);

  //URL Negocios
  const url = `https://api.callmebot.com/whatsapp.php?phone=57${numero2}&text=${encodeURIComponent(
    texto
  )}&apikey=${KeyNegocios}`;

  try {
    axios.get(url);
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = (pedido) => {
  const { negocio_id, numero_Factura, productos, costoEnvio } = pedido;

  // Calcular el subtotal sumando precio * cantidad
  let subtotal = 0;
  productos.forEach((prod) => {
    const precio = parseFloat(prod.precio) || 0;
    const cantidad = parseInt(prod.cantidad) || 0;
    subtotal += precio * cantidad;
  });

  // Calcular envío
  const envio = parseFloat(costoEnvio) || 0;

  // Construir el mensaje
  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `🧾 Factura ID: ${numero_Factura}\n`;
  mensaje += `👤 Cliente: ${negocio_id}\n`;
  mensaje += `🛒 *Productos comprados:*\n`;

  productos.forEach((prod) => {
    const nombre = prod.nombre || "Sin nombre";
    const precio = parseFloat(prod.precio) || 0;
    const cantidad = parseInt(prod.cantidad) || 0;
    mensaje += `\n${cantidad} x ${nombre} - Precio: ${formatearCOP(precio)}`;
  });
  mensaje += `\n\n💵 Total: ${formatearCOP(subtotal)}`;

  return mensaje;
};
