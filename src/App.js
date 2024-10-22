import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RouterPublic from "./routes/routes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://asuprocolombiasas.com/php/server.php";
  return (
    <Router>
      <RouterPublic />
    </Router>
  );
}

export default App;
