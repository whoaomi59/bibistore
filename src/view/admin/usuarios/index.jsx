import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { fields, ModelsUsuarios } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";
import Loader from "../../../components/content/loader";

const Usuarios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);
  const [loader, setloader] = useState(false);
  const currentUrl = window.location.origin;

  const abrirModal = (item) => {
    window.open(
      `${currentUrl}/request-reset/${item.email}`,
      "popup",
      "width=600,height=400"
    );
  };

  const handleFormSubmit = async (newData) => {
    try {
      if (newData.id) {
        let response = await axios.put(
          "/api/usuarios/controller.php",
          {
            id: newData.id,
            nombre: newData.nombre,
            telefono: newData.telefono,
            rol: newData.rol,
            ApiKey: newData.ApiKey,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } else {
        let response = await axios.post(`/api/usuarios/controller.php`, {
          email: newData.email,
          empresa_id: 1,
          nombre: newData.nombre,
          password: newData.password,
          rol: newData.rol,
          telefono: newData.telefono,
        });
        console.log(response);
      }
      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      return Alertas({
        icon: "error",
        message: error,
      });
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        setloader(true);
        let response = await axios.get("/api/usuarios/controller.php");
        if (Roles.includes("admin")) {
          setUsuarios(response.data);
        } else {
          // Filtrar las rutas basadas en los roles del usuario
          const rutasPermitidas = response.data.filter((item) =>
            item.id.includes(IdUser)
          );
          setUsuarios(rutasPermitidas);
        }
        return setloader(false);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    Get();
  }, [IdUser, Roles, refresh]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <Grid
        module={"Usuarios"}
        columns={ModelsUsuarios}
        data={usuarios}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "KeyIcon",
            className: "bg-gray-500 text-white",
            onClick: (record) => abrirModal(record),
          },
          Roles === "admin" && {
            icon: "TrashIcon",
            className: "bg-red-500 text-white",
            onClick: (record) => Verdetalle(record),
          },
        ].filter(Boolean)}
      />
    </div>
  );
};

export default Usuarios;
