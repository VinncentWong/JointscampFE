import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import GetAllProductPage from "./pages/GetAllProductPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ListLike from "./pages/ListLikePage";
import LoginPage from "./pages/LoginPage";
import MyProductPage from "./pages/MyProductPage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/createproduct" element={<CreateProductPage/>}/>
            <Route path="/myproduct" element={<MyProductPage/>}/>
            <Route path="/allproduct" element={<GetAllProductPage/>}/>
            <Route path="/likes" element={<ListLike/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
