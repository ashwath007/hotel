import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import AdminHome from "./user/AdminHome";

import AdminShajiRoute from "./auth/helper/AdminShajiRoutes";
import AdminShajiDashMenu from "./user/AdminMenus/AdminShajiDashMenu";
import AdminShajiDashOrders from "./user/AdminMenus/AdminShajiDashOrders";
import AdminShajiDashMenuCreate from "./user/AdminMenus/AdminShajiDashMenuCreate";
import AdminShajiDashCategoryCreate from "./user/AdminMenus/AdminShajiDashCategoryCreate";
import AdminShajiDashCategoryShow from "./user/AdminMenus/AdminShajiDashCategoryShow";
import AdminShajiDashCategoryEdit from "./user/AdminMenus/AdminShajiDashCategoryEdit";
import AdminShajiDashProductEdit from "./user/AdminMenus/AdminShajiDashProductEdit";
import AdminShajiDash from "./user/AdminMenus/AdminShajiDash";
import Verification from "./user/Verification";
import Purchase from "./core/Purchase";
import Bill from "./core/Bill";
import Cod from "./core/Cod";
import Order from "./core/Order";
import Profile from "./core/Profile";
import AdminShajiOrderTakeOrder from "./user/AdminMenus/AdminShajiOrderTakeOrder";
import SignupLoc from "./user/SignupLoc"
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/cart/purchase" exact component={Purchase} />
        <PrivateRoute path="/cart/bill" exact component={Bill} />
        <PrivateRoute path="/cart/bill/cod" exact component={Cod} />
        <PrivateRoute path="/order" exact component={Order} />
        <PrivateRoute path="/profile" exact component={Profile} />


        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        //ADMIN 
        <Route path="/loc" exact component={SignupLoc} />
        
        <Route path="/admin" exact component={AdminHome} />
        <AdminShajiRoute path="/admin/shaji/dashboard" exact component={AdminShajiDash} />
        <AdminShajiRoute path="/admin/shaji/dashboard/menu" exact component={AdminShajiDashMenu}/>
        <AdminShajiRoute path="/admin/shaji/dashboard/orders" exact component={AdminShajiDashOrders}/>

        <AdminShajiRoute path="/admin/shaji/dashboard/menu/create" exact component={AdminShajiDashMenuCreate}/>
        <AdminShajiRoute path="/admin/shaji/dashboard/category/create" exact component={AdminShajiDashCategoryCreate}/>
        <AdminShajiRoute path="/admin/shaji/dashboard/category/show" exact component={AdminShajiDashCategoryShow}/>
        <AdminShajiRoute path="/admin/shaji/dashboard/category/edit/:cateId" exact component={AdminShajiDashCategoryEdit}/>
        <AdminShajiRoute path="/admin/shaji/dashboard/product/show" exact component={AdminShajiDashProductEdit}/>

        //USER
        <Route path="/verification/:uId" exact component={Verification} />


        //
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminShajiRoute path="/admin/shaji/dashboard/orders/takeorder/:userId" exact component={AdminShajiOrderTakeOrder}/>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;