import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from "./Layout/Layout";
import "./styles/App.css";
import "./styles/Layout.css";
import Home from "./Components/Home";
import Voitures from "./Components/Voitures";
import VoitureDetail from "./Components/VoitureDetail";
import Contacter from "./Components/Contacter";
import Register from "./Components/Register";
import Login from "./Components/Login";
import SecurePath from "./Components/SecurePath";
import CreateListing from "./Components/CreateListing";
import Account from "./Components/Account";
import VerifyAdmin from "./Components/VerifyAdmin";
import Listing from "./Components/Listing";
import AgenceDetail from "./Components/AgenceDetail";
import ChangeListing from "./Components/ChangeListing";



function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="voitures" element={<Voitures />}></Route>
      <Route path="contacter" element={<Contacter />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="login" element={<Login />}></Route>

      <Route path="/admin" element={<VerifyAdmin />}>
        <Route path="create-listing" element={<CreateListing />}></Route>
        <Route path="listing" element={<Listing />}></Route>
        <Route path="agence-detail" element={<AgenceDetail />}></Route>
        <Route path="change-listing/:id" element={<ChangeListing />}></Route>
      </Route>
    
      <Route element={<SecurePath />}>
        <Route path="compte" element={<Account />}></Route>
        <Route path="voitures/:car" element={<VoitureDetail />}></Route>
      </Route>
    </Route>
  ));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;