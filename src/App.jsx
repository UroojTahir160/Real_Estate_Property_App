import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./layout/Navbar/Navbar";
import { useState, useEffect } from "react";
import { PropertyDetails } from "./pages/PropertyDetails/PropertyDetails";

function App() {
  const [propertyList, setPropertyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <Route
            path="/property-details/:pid"
            element={
              <PropertyDetails
                propertyList={propertyList}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
