import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import Login from "./pages/login/login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

      <ToastContainer theme="dark" position="top-center" />
    </BrowserRouter>
  );
}

export default App;
