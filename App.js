import logo from './logo.svg';
import './App.css';
import Section from './Components/Section';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from './Components/PaymentPage';
import TransactionsPage from './Components/TransactionsPage';

function App() {
  return (
    
        <Router>
          <Routes>
            <Route path="/" element={<Section/>} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/payment" element={<PaymentPage/>} />
            <Route path="/transaction" element={<TransactionsPage/>} />
          </Routes>
      </Router>
  );
}

export default App;
