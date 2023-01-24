// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import Header from './components/Header/Header'
import SpinnerLoading from "./components/SpinnerLoading";

// pages
const Bikes = React.lazy(() => import("./pages/Bikes/Bikes"))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Suspense fallback={<SpinnerLoading />}><Bikes /></Suspense>} />
          <Route path="bike" element={<Suspense fallback={<SpinnerLoading/>}><Bikes/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
