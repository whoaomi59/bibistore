import Form from "../../components/grid/formulario";
import { fields } from "./models";
import axios from "axios";

export default function RegistroUser({ logo }) {
  const handleFormSubmit = async (newData) => {
    try {
      let response = await axios.post(`/api/usuarios/controller.php`, {
        email: newData.email,
        nombre: newData.nombre,
        password: newData.password,
        rol: "cliente",
        telefono: newData.telefono,
      });
      alert("Registrado!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleFormSubmit}
      title={"Bienvenido al registro 🔑"}
      isOpen={true}
    />
  );
}
