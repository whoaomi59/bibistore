import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields, FielsEstado } from "./models";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import Form from "../../../components/grid/formulario";
import { ClockIcon } from "@heroicons/react/24/outline";
import Loader from "../../../components/content/loader";
import { formatearCOP } from "../../../components/content/formatoMoneda";

const Productos = ({ Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);
  const { id, name } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loader, setloader] = useState(false);

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
          "/api/productos/controller.php?action=update",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Indicamos que estamos enviando archivos
            },
          }
        );
        console.log(response.data);
      } else {
        let response = await axios.post("/api/productos/controller.php", form, {
          headers: {
            "Content-Type": "multipart/form-data", // Indicamos que estamos enviando archivos
          },
        });
        console.log(response.data);
      }
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

  const ActiveProduct = async (formData) => {
    try {
      let response = await axios.delete("/api/productos/controller.php", {
        data: formData,
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
        let response = await axios.get("/api/productos/controller.php");
        const rutasPermitidas = response.data.filter((item) =>
          item.id_negocio.includes(id)
        );
        setUsuarios(rutasPermitidas);
        return setloader(false);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    Get();
  }, [Roles, refresh]);

  const Formater = usuarios.map((item) => ({
    id: item.id_producto,
    img: <img src={item.img} className="w-12" />,
    nombre: item.nombre_producto,
    Tipo: item.Tipo,
    tipo_id: item.idtipo,
    Negocio: item.Negocio,
    negocio_id: item.id_negocio,
    descripcion: item.descripcion_productos,
    estado: item.estado_producto,
    estado_formater:
      item.estado_producto === "1" ? (
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
    precio: item.precio_producto,
    fecha_producto: item.fecha_producto,
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
        onSubmit={ActiveProduct}
        title={"Estado"}
        initialValues={editingItem}
      />
      <Grid
        module={"Productos" + " " + name}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "NoSymbolIcon",
            className: "bg-orange-500 text-white",
            label: "Bloquear Productos",
            onClick: (record) => {
              setIsModalOpen(true);
              setEditingItem(record);
            },
          },
        ]}
      />
    </div>
  );
};

export default Productos;
