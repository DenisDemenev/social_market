import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Basket from './pages/Basket';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Page404 from './pages/Page404';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './store/slice/authSlice';
import OrderConfirm from './pages/OrderConfirm';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  });

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vk" element={<Home link={'vk'} />} />
          <Route path="/instagram" element={<Home link={'instagram'} />} />
          <Route path="/telegram" element={<Home link={'telegram'} />} />
          <Route path="/favorite" element={<Home link={'favorite'} />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="register" element={<SignUp />} />
          <Route path="auth" element={<SignIn />} />
          <Route path="confirm" element={<OrderConfirm />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
