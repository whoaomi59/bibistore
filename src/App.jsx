import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestReset from "./view/auth/RequestReset";
import ResetPassword from "./view/auth/ResetPassword";
import Login from "./view/auth/Login";
import Dashboard from "./view/admin/Dashboard";
import Empresas from "./view/admin/empresa/Empresas";
import PrivateRoute from "./midelware/PrivateRoute";
import { AuthProvider } from "./auth/AuthContext";
import Container from "./components/layouts/container";
import Home from "./view/home";
import Usuarios from "./view/admin/usuarios";
import Negocios from "./view/admin/negocios";
import Productos from "./view/admin/productos";
import axios from "axios";
import NegociosShop from "./view/Shop/Negocios";
import { useEffect, useState } from "react";
import NavbarShop from "./view/Shop/navbar";
import ProductosShop from "./view/Shop/Productos";
import { jwtDecode } from "jwt-decode"; // ✅ Forma correcta
import PedidosShop from "./view/Shop/Pedidos";
import Car_Shop from "./view/Shop/car_shop";
import Detalle_Pedido from "./view/Shop/detalle_pedido";
import Page_Fount from "./components/content/pague_fout";
import Pedidos from "./view/admin/pedidos";
import "./App.css";
import RegistroUser from "./view/auth/reguister";
import Baner_Empresa from "./view/admin/baner_empresa";
import Baner_Negocios from "./view/admin/bener_negocios";
import RegisterClient from "./view/client/Register";
import Categorias_Negocios from "./view/admin/Categoria_Negocio";

export const URL = "https://domicilios.fundacionhuellas.com.co/API/";
/* export const URL = "https://runway.com.co/API/"; */
// export const URL = " http://localhost/Apps_Domicilios/API/";

function App() {
  const [Rol, setRol] = useState(null);
  const [IdUser, setIdUser] = useState(null);
  const [empresa, setEmpresa] = useState({});
  const [usuarios, setusuarios] = useState(null);
  const [nombre, setnombre] = useState(null);

  axios.defaults.baseURL = URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIdUser(decoded.id);
        setRol(decoded.rol);
        localStorage.setItem("id", decoded.id);
        setnombre(decoded.nombre);
        return setusuarios(decoded);
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const Get = async () => {
      try {
        const response = await axios.get("/api/empresas/controller.php");
        setEmpresa(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* AUTENTICACIÓN */}

          <Route
            path="/registro"
            element={<RegistroUser logo={empresa.logo} />}
          />
          <Route
            path="/abV4vjNRhtLWl2TzF1ZANqKDXbZLHarXF2OSpuNMHNlgza6tJwP+x8m14RnuNbwJ"
            element={<RegisterClient logo={empresa.logo} />}
          />

          <Route path="/login" element={<Login logo={empresa.logo} />} />
          <Route path="/request-reset/:emails" element={<RequestReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />

          {/* RUTAS PRIVADAS */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Container Roles={Rol} usuarios={usuarios} nombre={nombre}>
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<Dashboard Roles={Rol} />}
                    />
                    <Route
                      path="/usuarios"
                      element={<Usuarios IdUser={IdUser} Roles={Rol} />}
                    />
                    <Route path="/empresas" element={<Empresas />} />
                    <Route path="/baner" element={<Baner_Empresa />} />
                    <Route
                      path="/baner_negocios/:id/:name"
                      element={<Baner_Negocios Roles={Rol} IdUser={IdUser} />}
                    />
                    <Route
                      path="/pedidos/:id/:name"
                      element={<Pedidos IdUser={IdUser} Roles={Rol} />}
                    />
                    <Route
                      path="/negocios"
                      element={<Negocios IdUser={IdUser} Roles={Rol} />}
                    />
                    <Route
                      path="/categoriasnegocios"
                      element={<Categorias_Negocios />}
                    />
                    <Route
                      path="/productos/:id/:name"
                      element={<Productos IdUser={IdUser} Roles={Rol} />}
                    />
                  </Routes>
                </Container>
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/*"
            element={
              <>
                <NavbarShop logo={empresa.logo} Roles={Rol} nombre={nombre} />
                <Routes>
                  <Route path="/negocios" element={<NegociosShop />} />
                  <Route path="/productos/:id" element={<ProductosShop />} />
                  <Route
                    path="/car_shop"
                    element={<Car_Shop usuarios={usuarios} />}
                  />
                  <Route
                    path="/pedidos"
                    element={
                      <PrivateRoute>
                        <PedidosShop />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/pedidos/detalle/:id/:nombre"
                    element={
                      <Detalle_Pedido
                        logo={empresa.logo}
                        empresa={empresa.nombre}
                        datos_empresa={empresa}
                        usuarios={usuarios}
                      />
                    }
                  />
                </Routes>
                <footer className="w-full bg-gray-100 text-center py-4 mt-4 ">
                  <p className="text-sm text-gray-600">
                    Desarrollado por{" "}
                    <span className="font-semibold color-primary">
                      [Jhon Mario Chilito]
                    </span>{" "}
                    — Apasionado por crear soluciones web modernas y eficientes.
                    💻🚀
                  </p>
                  <div className="mt-2 flex justify-center gap-4 text-gray-500 text-sm">
                    <a
                      href="https://github.com/whoaomi59"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 transition"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/jhon-mario-chilito-calderon-b3b41b20a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 transition"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="mailto:whoaomi11@gmail.com"
                      className="hover:text-green-600 transition"
                    >
                      Contáctame
                    </a>
                  </div>
                </footer>
              </>
            }
          />
          <Route path="*" element={<Page_Fount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
