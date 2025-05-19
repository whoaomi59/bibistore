export const handleWhatsappClick = (texto, Info) => {
  const phoneNumber = "57" + Info.telefono || "573122048951"; // tu número con código de país
  const message =
    "Hola, RunWay. ¿Podría ayudarme con un domiciliario, por favor?";

  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";

  const whatsappURL = `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
};
