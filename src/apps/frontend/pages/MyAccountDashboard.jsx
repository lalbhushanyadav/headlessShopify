import React, { useState, useEffect } from "react";
import AccountDashboard from "../components/AccountDashboard";
import AccountOrders from "../components/AccountOrders";
import AccountProfile from "../components/AccountProfile";

const MyAccount = () => {
  //   const { authState, logout } = useAuth();
  //   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  //   useEffect(() => {
  //     if (!authState.isAuthenticated) {
  //       navigate("/login");
  //     }
  //   }, [authState, navigate]);

  const handleLogout = () => {
    //   logout();
    //   navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AccountDashboard />;
      case "orders":
        return <AccountOrders />;
      //   case "profile":
      //     return <AccountProfile />;
      default:
        return <AccountDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left font-medium ${
                activeTab === "dashboard" ? "text-blue-600" : ""
              }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left font-medium ${
                activeTab === "orders" ? "text-blue-600" : ""
              }`}
            >
              My Orders
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left font-medium ${
                activeTab === "profile" ? "text-blue-600" : ""
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 font-medium"
            >
              Logout
            </button>
          </li> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderTabContent()}</main>
    </div>
  );
};

export default MyAccount;
