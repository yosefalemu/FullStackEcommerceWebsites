import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import SuccessPage from "./pages/SuccessPage";
import LandingPage from "./pages/LandingPage";
import ShippingPage from "./pages/ShippingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProcessingPage from "./pages/ProcessingPage";
import { useSelector } from "react-redux";
import PaymentPage from "./pages/PaymentPage";
import UpdateProfile from "./pages/UpdateProfile";
import AllUserPage from "./pages/AllUserPage";
import AllProductPage from "./pages/AllProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import OrdersDetailsPage from "./pages/OrdersDetailsPage";
import CreateProduct from "./pages/CreateProduct";
import WishListPage from "./pages/WishListPage";
import MyOrdesPage from "./pages/MyOrdesPage";
import MyPurchasePage from "./pages/MyPurchasePage";
import RatingPage from "./pages/RatingPage";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/homepage" />}
        /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/signup"
          element={!user ? <Register /> : <Navigate to="/homepage" />}
        /> */}
        <Route path="/signup" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/alluser" element={<AllUserPage />} />
        <Route path="/allproduct" element={<AllProductPage />} />
        <Route path="/updateproduct" element={<UpdateProductPage />} />
        <Route path="/orderproduct" element={<AllOrdersPage />} />
        <Route path="/orderdetails" element={<OrdersDetailsPage />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/myorder" element={<MyOrdesPage />} />
        <Route path="/mypurchase" element={<MyPurchasePage />} />
        <Route path="/rating" element={<RatingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
