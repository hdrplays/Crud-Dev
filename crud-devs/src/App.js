import Home from './components/Home';
import Niveis from './components/Niveis';
import Dev from './components/Dev';
import {BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1 className='headerStyle'>Desafio Tecnico FullStack</h1>
      <BrowserRouter>

      <Nav variant="tabs" defaultActiveKey="/dev">
        <Nav.Item>
          <Nav.Link as={Link} to="/dev">Cadastro de Devs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/niveis">Niveis</Nav.Link>
        </Nav.Item>
      </Nav>

      <Routes>
        <Route path="/dev" element={<Dev/>}></Route>
        <Route path="/niveis" element={<Niveis/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
