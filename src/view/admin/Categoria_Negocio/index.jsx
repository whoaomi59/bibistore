import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";

const Categorias_Negocios = () => {
  const [data, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const handleFormSubmit = async (formData) => {
    try {
      if (formData.id) {
        let response = await axios.put(
          "/api/categorias_negocios/controller.php",
          formData
        );
      } else {
        let response = await axios.post(
          "/api/categorias_negocios/controller.php",
          formData
        );
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

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get(
          "/api/categorias_negocios/controller.php"
        );
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [refresh]);

  return (
    <div className="p-4">
      <Grid
        module={"Categorias Negocios"}
        columns={Columns}
        data={data}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[{}]}
      />
    </div>
  );
};

export default Categorias_Negocios;
