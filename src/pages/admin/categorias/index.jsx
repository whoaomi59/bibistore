import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/16/solid";
import Swealert from "../../../components/alertas/swealert";

export default function CategoriasAdmin() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    nombre: "",
    img: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);

  // Crear nuevo item
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", newItem.nombre);
    formData.append("img", newItem.img);

    try {
      setloading(true);
      const response = await axios.post(`categorias`, formData);
      setrefresh((prev) => !prev);
      setNewItem({
        nombre: "",
        img: null,
      });
      setloading(false);
      const alerta = Swealert({ ico: "success", mesage: "Registro creado" });
      return alerta;
    } catch (e) {
      setloading(false);
      console.log(e);
      const alerta = Swealert({
        ico: "error",
        mesage: "Error al crear productos!",
      });
      return alerta;
    }
  };

  // Editar un item
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setNewItem({
      nombre: item.nombre,
      precio: item.precio,
      img: null,
      imgone: null,
      imgtwo: null,
      imgtree: null,
    });
  };

  // Guardar cambios de edición
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", newItem.nombre);
    formData.append("precio", newItem.precio);

    if (newItem.img) formData.append("img", newItem.img);
    if (newItem.imgone) formData.append("imgone", newItem.imgone);
    if (newItem.imgtwo) formData.append("imgtwo", newItem.imgtwo);
    if (newItem.imgtree) formData.append("imgtree", newItem.imgtree);

    try {
      const response = await axios.put(`items/${currentItem.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Actualizar lista de items
      setItems(
        items.map((item) =>
          item.id === currentItem.id
            ? { ...item, nombre: newItem.nombre, precio: newItem.precio }
            : item
        )
      );
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Eliminar un item
  const handleDelete = (id) => {
    axios
      .delete(`items/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error(error));
  };
  const Salir = () => {
    localStorage.clear("toke");
    window.location.href = "/";
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get(`categorias`);
        setItems(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    Get();
  }, [refresh]);

  return (
    <div>
      <ul>
        <li>
          <a href="/admin/product">Productos</a>
        </li>
        <li>
          <a href="/admin/categorias">Categorias</a>
        </li>
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 m-10">
        {/* Formulario para crear o actualizar */}
        <div className="bg-white">
          <button
            onClick={Salir}
            type="button"
            className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium  border-current outline-none bg-green-500 hover:bg-green-800 active:bg-blue-700 m-5"
          >
            Salir
          </button>
          <form
            onSubmit={isEditing ? handleUpdate : handleCreate}
            className="space-y-4 bg-white p-6 rounded shadow-md max-w-md mx-auto"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src="/img/logo2.png" alt="logo" className="w-60" />
            </div>
            <div>
              <labe class="mb-2 text-base block">Nombre categoria:</labe>
              <input
                type="text"
                placeholder="Ingrese el nombre del producto."
                value={newItem.nombre}
                onChange={(e) =>
                  setNewItem({ ...newItem, nombre: e.target.value })
                }
                class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                required
              />
            </div>
            <div>
              <labe class="mb-2 text-base block">Imagen:</labe>
              <input
                type="file"
                onChange={(e) =>
                  setNewItem({ ...newItem, img: e.target.files[0] })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
            >
              {loading ? "loading..." : isEditing ? "Actualizar" : "Guardar"}
            </button>
          </form>
        </div>

        {/* Lista de items */}
        {items.length > 0 ? (
          <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Id
                    </p>
                  </th>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      categoria
                    </p>
                  </th>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      img
                    </p>
                  </th>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Accion
                    </p>
                  </th>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.id}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex items-center gap-3">
                        <img
                          src={`https://asuprocolombiasas.com/php/${item.img}`}
                          alt={item.nombre}
                          class="relative inline-block h-20 w-20 !rounded-full object-cover object-center"
                        />
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.nombre}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">¡No hay productos disponibles!</p>
        )}
      </div>
    </div>
  );
}
