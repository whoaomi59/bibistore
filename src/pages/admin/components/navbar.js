export default function NabAdmin(props) {
  return (
    <div>
      <ul className="flex m-10">
        <li className="mr-4">
          <a
            href="/admin/product"
            className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-500 hover:bg-blue-800 active:bg-blue-700"
          >
            Productos
          </a>
        </li>
        /
        <li>
          <a
            href="/admin/categorias"
            className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-purple-500 hover:bg-purple-800 ml-4"
          >
            Categorias
          </a>
        </li>
      </ul>
      {props.children}
    </div>
  );
}
