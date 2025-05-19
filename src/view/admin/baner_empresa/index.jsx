import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";

export default function Baner_Empresa() {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    try {
      let response = await axios.post(
        "/api/empresas/empresa_imagenes.php",
        form
      );
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
        let response = await axios.get("/api/empresas/empresa_imagenes.php");

        return setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [refresh]);

  const Formater = usuarios.map((item) => ({
    id: item.id,
    img: <img src={item.img} className="w-10" />,
    empresa_id: item.empresa_id,
  }));

  return (
    <div className="p-4">
      <Grid
        module={"Baner"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "",
            className: "",
            onClick: (record) => Verdetalle(record),
          },
        ]}
      />
    </div>
  );
}
