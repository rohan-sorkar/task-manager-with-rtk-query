import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar/navbar";
import EditTask from "./pages/editTask";
import AddTask from "./pages/addTask";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
