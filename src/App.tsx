import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./layout";
import { Home, PropertyDetails } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-details/:pid" element={<PropertyDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
