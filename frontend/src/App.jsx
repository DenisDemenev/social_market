import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Page404 from './pages/Page404';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="auth" element={<SignIn />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
