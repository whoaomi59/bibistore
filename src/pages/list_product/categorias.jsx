export default function Categorias() {
  return (
    <div class="font-sans  py-4 mx-auto lg:max-w-7xl md:max-w-4xl">
      <h2 class="text-4xl font-extrabold text-purple-500  mb-16 text-center">
        Categorias
      </h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:justify-center gap-y-8 gap-x-6">
        <div class="flex gap-6 overflow-hidden cursor-pointer">
          <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
            <img
              src="https://readymadeui.com/images/watch1.webp"
              alt="product1"
              class="h-full w-full object-contain"
            />
          </div>

          <div>
            <h3 class="text-base font-bold text-gray-800">French Connection</h3>
          </div>
        </div>

        <div class="flex gap-6 overflow-hidden cursor-pointer">
          <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
            <img
              src="https://readymadeui.com/images/watch2.webp"
              alt="product2"
              class="h-full w-full object-contain"
            />
          </div>

          <div>
            <h3 class="text-base font-bold text-gray-800">Classic Bluetooth</h3>
          </div>
        </div>

        <div class="flex gap-6 overflow-hidden cursor-pointer">
          <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
            <img
              src="https://readymadeui.com/images/watch3.webp"
              alt="product3"
              class="h-full w-full object-contain"
            />
          </div>

          <div>
            <h3 class="text-base font-bold text-gray-800">Kors Lexington</h3>
          </div>
        </div>

        <div class="flex gap-6 overflow-hidden cursor-pointer">
          <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
            <img
              src="https://readymadeui.com/images/watch4.webp"
              alt="product4"
              class="h-full w-full object-contain"
            />
          </div>

          <div>
            <h3 class="text-base font-bold text-gray-800">Smart Watch</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
