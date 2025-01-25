import { BrowserRouter, Routes, Route } from "react-router-dom";
import propTypes from "prop-types";

import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import AddMenu from "./Components/MenuForm/AddMenu";
import AddItem from "./Components/MenuItem/AddItem";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/menu"
          element={
            <Layout>
              <Menu />
            </Layout>
          }
        />
        <Route path="/create-menu" element={<AddMenu />}></Route>
        <Route path="/add-item" element={<AddItem />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
