// src/index.js 또는 src/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PenaltyDetail from './app01Detail';
import {createRoot} from "react-dom/client";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/penalty/:id" element={<PenaltyDetail />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
