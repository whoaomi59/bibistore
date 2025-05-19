import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields, FielsEstado } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";
import Form from "../../../components/grid/formulario";
import { ClockIcon } from "@heroicons/react/24/outline";
import Loader from "../../../components/content/loader";

const Negocios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loader, setloader] = useState(false);

  const VerProductos = (record) => {
    window.location.href = `/productos/${record.id}/${record.nombre}`;
  };
  const VerPedidos = (record) => {
    window.location.href = `/pedidos/${record.id}/${record.nombre}`;
  };
  const VerBaners = (record) => {
    window.location.href = `/baner_negocios/${record.id}/${record.nombre}`;
  };

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    try {
      if (formData.id) {
        let response = await axios.post(
          "/api/negocios/update_negocios.php",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        let response = await axios.post("/api/negocios/controller.php", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      return Alertas({
        icon: "error",
        message: "Error al registrar!!",
      });
    }
  };

  const ActiveNegocio = async (formData) => {
    try {
      let response = await axios.put("/api/negocios/controller.php", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      return Alertas({
        icon: "error",
        message: "Error sl Registrar!!",
      });
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        setloader(true);
        let response = await axios.get("/api/negocios/controller.php");
        if (Roles.includes("admin")) {
          setUsuarios(response.data);
        } else {
          // Filtrar las rutas basadas en los roles del usuario
          const rutasPermitidas = response.data.filter((item) =>
            item.iduser.includes(IdUser)
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
  }, [IdUser, Roles, refresh]); // Dependencias para actualizar si cambia el rol

  const Formater = usuarios.map((item) => ({
    id: item.idnegocio,
    logo_negocio: <img src={item.logo_negocio} className="w-15" />,
    nombre: item.Negocio,
    categoria: item.Categoria,
    categoria_id: item.idCategoria,
    Usuario: item.usuario,
    usuario_id: item.iduser,
    direccion: item.direccion,
    telefono: item.telefono,
    ApiKey: item.ApiNegocios,
    email: item.email,
    estado:
      item.estadoNegocio === "1" ? (
        <p className="flex">
          <ClockIcon className="w-5 mr-2 text-red-500" />
          Inactivo
        </p>
      ) : (
        <p className="flex">
          <ClockIcon className="w-5 mr-2 text-green-500" />
          Activo
        </p>
      ),
    Horario_inicial: item.Horario_inicial,
    Horario_final: item.Horario_final,
    created_at: item.created_at,
  }));

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <Form
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        fields={FielsEstado}
        onSubmit={ActiveNegocio}
        title={"Estado"}
        initialValues={editingItem}
      />
      <Grid
        module={"Negocios"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "PhotoIcon",
            className: "bg-red-500 text-white",
            label: "Baner Negocio",
            onClick: (record) => VerBaners(record),
          },
          {
            icon: "NoSymbolIcon",
            className: "bg-orange-500 text-white",
            label: "Bloquear Negocios",
            onClick: (record) => {
              setIsModalOpen(true);
              setEditingItem(record);
            },
          },
          {
            icon: "ShoppingCartIcon",
            className: "bg-blue-500 text-white",
            label: "Ver Pedidos",
            onClick: (record) => VerPedidos(record),
          },
          {
            icon: "ArrowRightCircleIcon",
            className: "bg-gray-500 text-white",
            label: "Ver Productos",
            onClick: (record) => VerProductos(record),
          },
        ]}
      />
    </div>
  );
};

export default Negocios;
