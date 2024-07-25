// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./common/components/header";
import Footer from "./common/components/footer";
import {CookiesProvider} from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CookiesProvider>
        <BrowserRouter>
            <Header/>
            <App/>
            <Footer/>
        </BrowserRouter>
    </CookiesProvider>
);
