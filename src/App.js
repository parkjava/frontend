import './App.css';
import logo from './logo.svg';
import Login from './Login';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
        <Route path="/Login" element={<Login />} />
        </Routes>
      </header>
    </div>
  );
}
export default App;
