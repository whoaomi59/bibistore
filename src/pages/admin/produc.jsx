import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminProduct() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    img: null,
    imgone: null,
    imgtwo: null,
    imgtree: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [refresh, setrefresh] = useState(false);

  // Crear nuevo item
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", newItem.nombre);
    formData.append("precio", newItem.precio);
    formData.append("descripcion", newItem.descripcion);
    formData.append("img", newItem.img);
    formData.append("imgone", newItem.imgone);
    formData.append("imgtwo", newItem.imgtwo);
    formData.append("imgtree", newItem.imgtree);

    try {
      const response = await axios.post(
        `https://asuprocolombiasas.com/php/server.php/items`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setrefresh((prev) => !prev);
      setNewItem({
        nombre: "",
        precio: "",
        descripcion: "",
        img: null,
        imgone: null,
        imgtwo: null,
        imgtree: null,
      });
      return alert("Productos creado!");
    } catch (e) {
      console.log(e);
      return alert("Error al crear productos!");
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

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get(`items`);
        setItems(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    Get();
  }, [refresh]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD con Backend</h1>

      {/* Formulario para crear o actualizar */}
      <form
        onSubmit={isEditing ? handleUpdate : handleCreate}
        className="space-y-4 bg-white p-6 rounded shadow-md max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={newItem.nombre}
          onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="descripcion"
          value={newItem.descripcion}
          onChange={(e) =>
            setNewItem({ ...newItem, descripcion: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newItem.precio}
          onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={(e) => setNewItem({ ...newItem, img: e.target.files[0] })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewItem({ ...newItem, imgone: e.target.files[0] })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewItem({ ...newItem, imgtwo: e.target.files[0] })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewItem({ ...newItem, imgtree: e.target.files[0] })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Lista de items */}
      <ul className="mt-8 space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item.id}
              className="bg-white p-6 rounded shadow-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">{item.nombre}</h3>
                <p className="text-sm text-gray-600">${item.precio}</p>
                <p className="text-sm text-gray-600">${item.descripcion}</p>
                <img
                  src={`https://asuprocolombiasas.com/php/${item.img}`}
                  alt={item.nombre}
                  width="100"
                  className="mt-2"
                />
                <div className="flex space-x-2 mt-2">
                  <img
                    src={`https://asuprocolombiasas.com/php/${item.imgone}`}
                    alt={`${item.nombre} Secundaria 1`}
                    width="50"
                  />
                  <img
                    src={`https://asuprocolombiasas.com/php/${item.imgtwo}`}
                    alt={`${item.nombre} Secundaria 2`}
                    width="50"
                  />
                  <img
                    src={`https://asuprocolombiasas.com/php/${item.imgtree}`}
                    alt={`${item.nombre} Secundaria 3`}
                    width="50"
                  />
                </div>
              </div>
              <div>
                {/*
                 <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">¡No hay productos disponibles!</p>
        )}
      </ul>
    </div>
  );
}
