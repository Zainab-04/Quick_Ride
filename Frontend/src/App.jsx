import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  GetStarted,
  UserLogin,
  CaptainLogin,
  UserHomeScreen,
  CaptainHomeScreen,
  UserProtectedWrapper,
  CaptainProtectedWrapper,
  UserSignup,
  CaptainSignup,
} from "./screens/";

function App() {
  return (
    <div className="w-full h-dvh flex items-center">
      <div className="w-full sm:min-w-96 sm:w-96 h-full bg-white overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route
              path="/home"
              element={
                <UserProtectedWrapper>
                  <UserHomeScreen />
                </UserProtectedWrapper>
              }
            />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route
              path="/captain/home"
              element={
                <CaptainProtectedWrapper>
                  <CaptainHomeScreen />
                </CaptainProtectedWrapper>
              }
            />
            <Route path="/captain/login" element={<CaptainLogin />} />
            <Route path="/captain/signup" element={<CaptainSignup />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="hidden sm:block w-full h-full bg-[#eae1fe] overflow-hidden  select-none">
        <img
          className="h-full object-cover mx-auto  select-none "
          src="https://img.freepik.com/free-vector/taxi-app-service-concept_23-2148497472.jpg?semt=ais_hybrid"
          alt="Side image"
        />
      </div>
    </div>
  );
}

export default App;
