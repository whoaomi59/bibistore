import { Routes, Route, Outlet } from "react-router-dom";
import List_Produc from "../pages/list_product";
import Navbar from "../components/navbar";
import Product_Detail from "../pages/product_detail";
import AdminProduct from "../pages/admin/produc";
import Login from "../layout/login";
import CategoriasAdmin from "../pages/admin/categorias";
import NabAdmin from "../pages/admin/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Changues from "../pages/changues";

export default function RouterPublic() {
  const [Status, setStatus] = useState({});
  let Token = sessionStorage.getItem("toke");

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("changues");
        console.log(response.data[0]);
        setStatus(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);
  return (
    <Routes>
      <Route
        element={
          <Navbar>
            <Outlet />
          </Navbar>
        }
      >
        {Token ? (
          <Route>
            <Route path="/" element={<List_Produc />} />
            <Route
              path="/Product_Detail/:id"
              element={<Product_Detail />}
            />{" "}
          </Route>
        ) : Status.status == 0 ? (
          <Route>
            <Route path="/" element={<List_Produc />} />
            <Route
              path="/Product_Detail/:id"
              element={<Product_Detail />}
            />{" "}
          </Route>
        ) : (
          <Route path="*" element={<Changues />} />
        )}

        <Route
          element={
            <NabAdmin>
              <Outlet />
            </NabAdmin>
          }
        >
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/categorias" element={<CategoriasAdmin />} />
        </Route>
      </Route>
      {/*admin */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
