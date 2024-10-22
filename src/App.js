import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RouterPublic from "./routes/routes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://asuprocolombiasas.com/php/server.php";
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
  return (
    <Router>
      <RouterPublic />
    </Router>
  );
}

export default App;
