import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              // <AuthGuard>
              <Layout />
              // </AuthGuard>
            }
          >
            <Route path="/" element={<Navigate to="/home" />}></Route>
            {/* <Route index element={<Dashboard />}></Route> */}
            <Route path="home" element={<Home />}></Route>
          </Route>

          {/* <Route path="login" element={<Login />}></Route> */}
          {/* <Route path="not-found" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
