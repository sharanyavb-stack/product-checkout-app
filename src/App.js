import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {store, persistor} from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/feature/Navbar";

function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </BrowserRouter>
        </PersistGate>
      
    </Provider>
  );
}

export default App;
