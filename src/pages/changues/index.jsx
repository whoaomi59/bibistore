export default function Changues() {
  return (
    <main className="grid md:grid-cols-2 items-center md:gap-6 gap-8 font-[sans-serif] max-w-5xl mx-auto p-4">
      {/* Texto informativo */}
      <section className="max-md:order-1 text-center md:text-left">
        <h1 className="text-gray-800 md:text-4xl text-2xl font-bold md:leading-tight">
          Estamos en mantenimiento
        </h1>
        <p className="mt-4 text-gray-600 text-base leading-relaxed">
          Lo sentimos, pero nos encontramos realizando mantenimiento en nuestra
          página. Estaremos de vuelta pronto con un mejor servicio para ti.
        </p>
        <button
          type="button"
          className="px-6 py-3 mt-8 rounded-lg text-sm font-medium outline-none tracking-wide bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105 focus:ring focus:ring-blue-300"
        >
          Explorar
        </button>
      </section>

      {/* Imagen */}
      <div className="md:h-[470px] flex justify-center">
        <img
          src="https://readymadeui.com/photo.webp"
          alt="Mantenimiento"
          className="w-full h-full md:object-contain rounded-lg shadow-md"
        />
      </div>
    </main>
  );
}
