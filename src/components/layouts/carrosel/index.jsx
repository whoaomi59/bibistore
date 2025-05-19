import { Carousel, IconButton } from "@material-tailwind/react";

export function CarouselCustomArrows() {
  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <img
        src="https://img.freepik.com/psd-gratis/plantilla-portada-facebook-deliciosa-hamburguesa-comida_106176-2198.jpg?semt=ais_hybrid&w=740"
        alt="image 1"
        className="h-100 max-lg:h-70 w-full object-cover"
      />
      <img
        src="https://img.freepik.com/vector-gratis/banner-venta-comida-rapida-dibujado-mano_23-2150970571.jpg?semt=ais_hybrid&w=740"
        alt="image 2"
        className="h-100 max-lg:h-70 w-full object-cover"
      />
      <img
        src="https://img.freepik.com/psd-gratis/menu-comida-plantilla-banner-web-restaurante_106176-1452.jpg?semt=ais_hybrid&w=740"
        alt="image 3"
        className="h-100 max-lg:h-70 w-full object-cover"
      />
    </Carousel>
  );
}
