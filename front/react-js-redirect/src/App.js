import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from "./components/Checkout";
import Complete from "./components/Complete";
import Error from "./components/Error";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/complete" element={<Complete/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="/" element={<Checkout/>}/>
        </Routes>
      </Router>
  );
}

export default App;
