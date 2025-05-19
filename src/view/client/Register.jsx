import { useState } from "react";
import { Alertas } from "../../components/content/alert/Sweealert";
import Form from "../../components/grid/formulario";
import { fields } from "./models";
import axios from "axios";

export default function RegisterClient() {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [EditingItem, setEditingItem] = useState(null);
  /*   const handleFormSubmit = async (newData) => {
    try {
      let response = await axios.post(`/api/usuarios/controller.php`, {
        email: newData.email,
        nombre: newData.nombre,
        password: newData.password,
        rol: "cliente",
        telefono: newData.telefono,
      });
      console.log(response);
      alert("Registrado!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      alert(error);
    }
  }; */

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    try {
      let response = await axios.post("/api/negocios/controller.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alertas({
        icon: "success",
        message: "Registrado!!",
      });
      return setTimeout(() => {
        Retorno();
      }, 1000);
    } catch (error) {
      return Alertas({
        icon: "error",
        message: "Error al registrar!!",
      });
    }
  };

  const Retorno = () => {
    window.location.href = "/shop/negocios";
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleFormSubmit}
      title={"¡Hola! Empieza el registro de tu negocio aquí. 🔑"}
      isOpen={true}
      onClose={() => {
        setIsModalOpen(false);
        setEditingItem(null);
        Retorno();
      }}
    />
  );
}
