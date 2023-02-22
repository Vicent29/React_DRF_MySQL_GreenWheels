// context
import { AuthContextProvider } from "./context/AuthContext";
import { StationsContextProvider } from "./context/StationsContext";

// components
import Header from './components/Header/Header'
import SpinnerLoading from "./components/LoadingSpinner/SpinnerLoading";

//Guards
import AdminGuard from './services/guards/AdminGuard';
import { NoAuthGuard } from './services/guards/AuthGuard';
import { AuthGuard } from './services/guards/AuthGuard';

// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

// toastr
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// pages
const Bikes = React.lazy(() => import("./pages/Bikes/Bikes"))
const AddBike = React.lazy(() => import("./pages/Bikes/CreateBike"))
const Home = React.lazy(() => import("./pages/Home/Home"))
const Station = React.lazy(() => import("./pages/Station/Stations"))
const Slot = React.lazy(() => import("./pages/Slot/Slots"))
const UserList = React.lazy(() => import("./pages/User/List_Users_Admin"))
const AddStation = React.lazy(() => import("./pages/Station/CreateStation"))
const Incident = React.lazy(() => import("./pages/Incident/Incident"))
const Signin = React.lazy(() => import("./pages/Login/Signin"))
const Signup = React.lazy(() => import("./pages/Login/Signup"))
const Profile = React.lazy(() => import("./pages/User/Profile"))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <ToastContainer />
          <StationsContextProvider>
            <Routes>
              {/* All users */}
              <Route path="/" element={<Suspense fallback={<SpinnerLoading />}><Home /></Suspense>} />
              <Route path="home" element={<Suspense fallback={<SpinnerLoading />}><Home /></Suspense>} />
              {/* Dashoboards  Admin */}
              <Route element={<Suspense fallback={<SpinnerLoading />}><AdminGuard /></Suspense>}>
                <Route path="bike" element={<Suspense fallback={<SpinnerLoading />}><Bikes /></Suspense>} />
                <Route path="addbike" element={<Suspense fallback={<SpinnerLoading />}><AddBike /></Suspense>} />
                <Route path="station" element={<Suspense fallback={<SpinnerLoading />}><Station /></Suspense>} />
                <Route path="addstation" element={<Suspense fallback={<SpinnerLoading />}><AddStation /></Suspense>} />
                <Route path="slot" element={<Suspense fallback={<SpinnerLoading />}><Slot /></Suspense>} />
                <Route path="user" element={<Suspense fallback={<SpinnerLoading />}><UserList /></Suspense>} />
              </Route>
              {/* Regsiter and Login */}
              <Route element={<NoAuthGuard />}>
                <Route path="signin" element={<Suspense fallback={<SpinnerLoading />}><Signin /></Suspense>} />
                <Route path="signup" element={<Suspense fallback={<SpinnerLoading />}><Signup /></Suspense>} />
              </Route>
              <Route element={<AuthGuard />}>
                <Route path="incident" element={<Suspense fallback={<SpinnerLoading />}><Incident /></Suspense>} />
                <Route path="profile" element={<Suspense fallback={<SpinnerLoading />}><Profile /></Suspense>} />
              </Route>
            </Routes>
          </StationsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
