import './App.css'
import {Products} from "./components/products/Products.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./components/home/Home.jsx";
import {Navbar} from "./components/shared/Navbar.jsx";
import {About} from "./components/About.jsx";
import {Contact} from "./components/Contact.jsx";

function App() {

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </Router>
    )
}

export default App
