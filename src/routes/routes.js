import { Routes, Route, Outlet } from "react-router-dom";
import List_Produc from "../pages/list_product";
import Navbar from "../components/navbar";
import Product_Detail from "../pages/product_detail";
import AdminProduct from "../pages/admin/produc";

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
        <Route path="/Product_Detail/:id" element={<Product_Detail />} />
        <Route path="/admin/product" element={<AdminProduct />} />
      </Route>
    </Routes>
  );
}
