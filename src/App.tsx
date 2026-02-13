import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import SingleProductPage from "./components/singleProductPage";

import "./App.css"

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
