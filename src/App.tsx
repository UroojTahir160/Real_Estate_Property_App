import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./layout";
import { Home, PropertyDetails } from "./pages";
import { Property } from "./types";

function App() {
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/realEstateListing`)
      .then(async (res) => {
        const response = await res.json();
        setTimeout(() => {
          setIsLoading(false);
          setPropertyList(response);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home propertyList={propertyList} isLoading={isLoading} />}
          />
          <Route path="/property-details/:pid" element={<PropertyDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
