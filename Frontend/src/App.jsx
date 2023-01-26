// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";

// components
import Header from './components/Header/Header'
import SpinnerLoading from "./components/LoadingSpinner/SpinnerLoading";

// pages
const Bikes = React.lazy(() => import("./pages/Bikes/Bikes"))
const AddBike = React.lazy(() => import("./pages/Bikes/CreateBike"))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Suspense fallback={<SpinnerLoading />}><Bikes /></Suspense>} />
          <Route path="bike" element={<Suspense fallback={<SpinnerLoading/>}><Bikes/></Suspense>} />
          <Route path="addbike" element={<Suspense fallback={<SpinnerLoading/>}><AddBike/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
