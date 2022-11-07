import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/nav/Header";
import Footer from "./components/nav/Footer";
import Home from "./components/nav/Home";
import SiteMangerLogin from "./components/siteManager/SiteMangerLogin";
import RegisterStaffMember from "./components/admin/RegisterStaffMember";
import AddOrder from "./components/siteManager/AddOrder";
import OrderView from "./components/siteManager/OrderView";
import OrderDetails from "./components/siteManager/OrderDetails";
import UpdateOrder from "./components/siteManager/UpdateOrder";
import ProcumentDeptLogin from "./components/procumentDepartment/ProcumentDeptLogin";
import ApprovedOrders from "./components/procumentDepartment/ApprovedOrders";
import PendingOrders from "./components/procumentDepartment/PendingOrders";
import RejectedOrders from "./components/procumentDepartment/RejectedOrders";
import OrderStatusUpdate from "./components/procumentDepartment/OrderStatusUpdate";
import StaffMembers from "./components/admin/StaffMembers";
import UpdateStaffMember from "./components/admin/UpdateStaffMember";
import AdminLogin from "./components/admin/AdminLogin";
import AllOrders from "./components/admin/AllOrders";
import AllocateBudget from "./components/admin/AllocateBudget";
import Sites from "./components/admin/Sites";
import UpdateSite from "./components/admin/UpdateSite";
import SitesBudgetAllocations from "./components/procumentDepartment/SitesBudgetAllocations";
import SupplierRegister from "./components/supplier/SupplierRegister";
import Suppliers from "./components/supplier/Suppliers";
import OrderStatusCheck from "./components/siteManager/OrderStatusCheck";
import AddDelivery from "./components/siteManager/AddDelivery";
import AddItems from "./components/siteManager/AddItems";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/siteMangerLogin" element={<SiteMangerLogin />} />
          <Route path="/procumentDeptLogin" element={<ProcumentDeptLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="/registerStaffMember"
            element={<RegisterStaffMember />}
          />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/orderView" element={<OrderView />} />
          <Route path="/orderView" element={<OrderView />} />
          <Route
            path="/orderDetails/:staffId/:orderNo/:site"
            element={<OrderDetails />}
          />
          <Route
            path="/addItems/:staffId/:orderNo/:site"
            element={<AddItems />}
          />
          <Route
            path="/orderStatusCheck/:staffId/:orderNo/:site"
            element={<OrderStatusCheck />}
          />
          <Route path="/updateOrder/:id" element={<UpdateOrder />} />
          <Route
            path="/updateOrderStatus/:id"
            element={<OrderStatusUpdate />}
          />
          <Route
            path="/updateStaffMember/:id"
            element={<UpdateStaffMember />}
          />
          <Route path="/updateSite/:id" element={<UpdateSite />} />
          <Route path="/approvedOrders" element={<ApprovedOrders />} />
          <Route path="/pendingOrders" element={<PendingOrders />} />
          <Route path="/rejectedOrders" element={<RejectedOrders />} />
          <Route path="/allOrders" element={<AllOrders />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route
            path="/budgetAllocations"
            element={<SitesBudgetAllocations />}
          />
          <Route path="/staffMembers" element={<StaffMembers />} />
          <Route path="/addBudget" element={<AllocateBudget />} />
          <Route path="/registerSupplier" element={<SupplierRegister />} />
          <Route path="/adddelivery" element={<AddDelivery />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
