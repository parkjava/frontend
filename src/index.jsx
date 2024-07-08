// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header";
import Footer from "./components/footer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Header/>
        <App/>
        <Footer/>
    </BrowserRouter>
);
