import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import TaskForm from "./pages/TaskForm"
import NavBar from "./components/NavBar"

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">

      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/task/:id" element={<TaskForm/>} />
        <Route path="/task/new" element={<TaskForm/>} />

      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App