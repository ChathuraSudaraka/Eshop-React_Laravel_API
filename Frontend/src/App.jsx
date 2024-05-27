import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Vault from "./pages/Vault/Vault";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import PaymentSignUp from "./pages/Account/PaymentSignUp";
import DeleteProduct from "./pages/Admin/pages/DeleteProduct";
import UpdateProduct from "./pages/Admin/pages/UpdateProduct";
import AdminLogin from "./pages/Account/AdminLogin";
import FPASS from "./pages/Account/ForgotPassword";
import ChangePass from "./pages/Account/ChangePass";
import AddProduct from "./pages/Admin/pages/AddProduct";
import Wishlist from "./pages/Wishlist/Wishlist";
import TabsSetting from "./pages/Profile/pages/Settings/TabSetting";
import Dashboard from "./pages/Admin/pages/Dashboard";
import DefaultLayout from "./pages/Profile/layouts/DefaultLayout";
import General from "./pages/Profile/pages/Settings/General";
import Settings from "./pages/Profile/pages/Settings/Settings";
import PaymentMethod from "./pages/Profile/pages/Settings/Payment";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/Vault" element={<Vault />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      {/* ====================== Account Route ==================== */}
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/payment" element={<PaymentSignUp />}></Route>
      <Route path="/adminLogin" element={<AdminLogin />}></Route>
      <Route path="/forgotpassword" element={<FPASS />}></Route>
      <Route path="/changepass" element={<ChangePass />}></Route>
      {/* ====================== Profile Route ==================== */}
      <Route path="/general" element={<General />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
      <Route path="/Managepayment" element={<PaymentMethod />}></Route>
      {/* ====================== Admin Panel ====================== */}
      <Route path="/adminpanel" element={<Dashboard />}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>
      <Route path="/deleteproduct" element={<DeleteProduct />}></Route>
      <Route path="/updateproduct" element={<UpdateProduct />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
