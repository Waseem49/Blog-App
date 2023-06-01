import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Post from "./components/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
