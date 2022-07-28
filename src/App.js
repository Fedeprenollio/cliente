import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import NotesList from "./components/NotesList";
import CreateUser from "./components/CreateUser";

function App() {
  return (
   
    <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/edit/:id" element={<CreateNote />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/users" element={<CreateUser />} />
    </Routes>
      
  );
}

export default App;
