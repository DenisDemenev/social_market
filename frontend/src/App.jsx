import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import Payment from "./pages/Payment";
import OrderVariant from "./pages/OrderVariant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./store/slice/authSlice";
import OrderConfirm from "./pages/OrderConfirm";
import Rules from "./pages/Rules";
import Oferta from "./pages/Oferta";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") || localStorage.getItem("access")) {
      dispatch(getMe());
    }
  });

  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/vk'
            element={<Home link={"vk"} />}
          />
          <Route
            path='/favorite'
            element={<Home link={"favorite"} />}
          />
          <Route
            path='/basket'
            element={<Basket />}
          />
          <Route
            path='register'
            element={<SignUp />}
          />
          <Route
            path='auth'
            element={<SignIn />}
          />
          <Route
            path='confirm'
            element={<OrderConfirm />}
          />
          <Route
            path='rules'
            element={<Rules />}
          />
          <Route
            path='payment'
            element={<Payment />}
          />
          <Route
            path='order-variant'
            element={<OrderVariant />}
          />
          <Route
            path='oferta'
            element={<Oferta />}
          />
          <Route
            path='*'
            element={<Page404 />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
