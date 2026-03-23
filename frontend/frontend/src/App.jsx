import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


const App = () => {
  return (
    <>

   <Route path="/" element={<Login />} />
  <Route path="/home" element={<Home />} />
    </>
  );
};

export default App;