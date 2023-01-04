import './App.css';
import { Routes, Route } from 'react-router-dom';

import Group from './components/Group/Group';

import { Home } from './pages/Home';
import { Layout } from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element={<Group />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
