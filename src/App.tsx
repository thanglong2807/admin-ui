import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "./Route";
import Login from "./Page/Login";
import ProtectedRoutes from "./Route/WrapperLogin";
import Admin from "./Page/Admin";
import Product from "./Page/Product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/action";
const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const check = localStorage.getItem("tokens");
    if (check) {
      dispatch(checkLogin(true));
      navigate("/admin");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {publicRouter.map((item) => {
          const Layout = item.element;

          return <Route key={item.id} path={item.path} element={<Layout />} />;
        })}

        <Route element={<ProtectedRoutes />}>
          {privateRouter.map((item) => {
            const Layout = item.element;

            return (
              <Route key={item.id} path={item.path} element={<Layout />} />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
