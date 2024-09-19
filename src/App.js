import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RouterPublic from "./routes/routes";

function App() {
  return (
    <Router>
      <RouterPublic />
    </Router>
  );
}

export default App;
