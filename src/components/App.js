import './App.css';
import FORM from './Form';
import HEADER from './Header';
import PLAN from './Plan';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
    <HEADER/>
    <Routes>
        <Route path="/" element={ <PLAN/> } />
        <Route path="form" element={ <FORM/> } />
      </Routes>
    </div>
  );
}

export default App;
