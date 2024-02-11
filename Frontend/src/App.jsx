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
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import ChangePassword from "./pages/Profile/pages/ChangePassword";
import PaymentMethod from "./pages/Profile/pages/Payment";
import General from "./pages/Profile/pages/General";
import PaymentSignUp from "./pages/Account/PaymentSignUp";
import Addproduct from "./pages/Admin/pages/AddProduct";
import DeleteProduct from "./pages/Admin/pages/DeleteProduct";
import UpdateProduct from "./pages/Admin/pages/UpdateProduct";
import AdminLogin from "./pages/Account/AdminLogin";
import FPASS from "./pages/Account/ForgotPassword";
import ChangePass from "./pages/Account/ChangePass";


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
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
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
      <Route path="/profile" element={<General />}></Route>
      <Route path="/changePassword" element={<ChangePassword />}></Route>
      <Route path="/paymentMethod" element={<PaymentMethod />}></Route>
      {/* ====================== Admin Panel ====================== */}
      <Route path="/admin" element={<Addproduct />}></Route>
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
