import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Drawer
import SideDrawer from "./components/drawer/SideDrawer";

//layouts
import Navbar from './components/layouts/Navbar';

//pages
import Home from './components/pages/Home';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import SignUpSeller from './components/pages/auth/SignUpSeller';
import Product from './components/pages/Product';
import Cart from './components/pages/Cart';
import CheckOut from './components/pages/CheckOut';


// pages admin
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from './components/pages/admin/ManageAdmin';
import Category from './components/pages/admin/Category';
import RequestType from './components/pages/admin/RequestType';
import Payment from './components/pages/admin/payment/Payment';
import RequestOrder from './components/pages/admin/RequestOrder';

//pages seller
import HomeSeller from "./components/pages/seller/Home";
import CreateProduct from './components/pages/seller/product/CreateProduct';
import UpdateProduct from './components/pages/seller/product/UpdateProduct';
import ProductSeller from './components/pages/seller/product/Product';
import PaymentSeller from './components/pages/seller/payment/Payment';
import RequestNotificationSeller from './components/pages/seller/noti/RequestNotification';
import HistoryOrderSeller from './components/pages/seller/HistoryOrder';
import HistoryRequestSeller from './components/pages/seller/noti/HistoryRequest';

// pages user
import HomeUser from "./components/pages/user/Home";
import WishList from './components/pages/user/WishList';
import HistoryOrderUser from './components/pages/user/HistoryOrder'
import HistoryRequestUser from './components/pages/user/noti/HistoryRequest';
import RequestNotificationUser from './components/pages/user/noti/RequestNotification';


// functions
import { currentUser } from "./components/functions/auth";

// redux
import { useDispatch } from "react-redux";

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import SellerRoute from './components/routes/SellerRoute';

//antd
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;

  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            email: res.data.email,
            username: res.data.username,
            role: res.data.role,
            walletUser: res.data.walletUser
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err.message);
      });
  }


  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-seller" element={< SignUpSeller />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />

        {/* admin */}
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <Category />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/requestType"
          element={
            <AdminRoute>
              <RequestType />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payment"
          element={
            <AdminRoute>
              <Payment />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/request-orders"
          element={
            <AdminRoute>
              <RequestOrder />
            </AdminRoute>
          }
        />
        {/* seller */}
        <Route
          path="/seller/index"
          element={
            <SellerRoute>
              <HomeSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/product"
          element={
            <SellerRoute>
              <ProductSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/create-product"
          element={
            <SellerRoute>
              <CreateProduct />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/update-product/:id"
          element={
            <SellerRoute>
              <UpdateProduct />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/payment"
          element={
            <SellerRoute>
              <PaymentSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/request"
          element={
            <SellerRoute>
              <RequestNotificationSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/history-order"
          element={
            <SellerRoute>
              <HistoryOrderSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/history-request"
          element={
            <SellerRoute>
              <HistoryRequestSeller />
            </SellerRoute>
          }
        />
        {/* user */}
        {/* <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        /> */}
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
        <Route
          path="/user/history-order"
          element={
            <UserRoute>
              <HistoryOrderUser />
            </UserRoute>
          }
        />
        <Route
          path="/user/request"
          element={
            <UserRoute>
              <RequestNotificationUser />
            </UserRoute>
          }
        />
        <Route
          path="/user/history-request"
          element={
            <UserRoute>
              <HistoryRequestUser />
            </UserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
