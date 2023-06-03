import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Post from "./components/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreatePost from "./pages/CreatePost";
import Singlepost from "./pages/Singlepost";
import Editpost from "./pages/Editpost";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Singlepost />} />
        <Route path="/edit/:id" element={<Editpost />} />
      </Routes>
    </main>
  );
}

export default App;
