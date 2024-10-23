import { Routes, Route, Outlet } from "react-router-dom";
import List_Produc from "../pages/list_product";
import Navbar from "../components/navbar";
import Product_Detail from "../pages/product_detail";
import AdminProduct from "../pages/admin/produc";
import Login from "../layout/login";
import CategoriasAdmin from "../pages/admin/categorias";
import NabAdmin from "../pages/admin/components/navbar";

export default function RouterPublic() {
  return (
    <Routes>
      <Route
        element={
          <Navbar>
            <Outlet />
          </Navbar>
        }
      >
        <Route path="/" element={<List_Produc />} />
        <Route path="/Product_Detail/:id" element={<Product_Detail />} />{" "}
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
