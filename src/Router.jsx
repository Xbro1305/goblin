import { Login } from "./Pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";
import { Profile } from "./Pages/Profile/Profile";
import { AuthGuard } from "./Components/Auth/Auth-guard";
import { Chat } from "./Pages/P2P/Chat/Chat";
import { MyDeals } from "./Pages/P2P/MyDeals/MyDeals";
import { Order } from "./Pages/P2P/Order/Order";
import { Orders } from "./Pages/P2P/Orders/Orders";
import { Me } from "./Pages/Me/Me";
import { CreateOrder } from "./Pages/P2P/CreateOrder/CreateOrder";
import { Deal } from "./Pages/P2P/Deal/Deal";
import { Home } from "./Pages/Home/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<AuthGuard />}>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/deal/:id" element={<Deal />} />
        <Route path="/p2p/my-deals" element={<MyDeals />} />
        <Route path="/p2p/orders" element={<Orders />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/p2p/profile" element={<Me />} />
        <Route path="/p2p/create-order" element={<CreateOrder />} />
      </Route>
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};
