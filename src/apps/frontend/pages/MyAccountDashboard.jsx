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
    <div className="flex min-h-screen bg-blue-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-black dark:text-white">
          My Account
        </h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left cursor-pointer font-medium ${
                activeTab === "dashboard"
                  ? "text-blue-600 dark:text-blue-300"
                  : " text-black dark:text-white"
              }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left cursor-pointer font-medium ${
                activeTab === "orders"
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-black dark:text-white"
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
      <main className="flex-1 p-8 text-black dark:text-white">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default MyAccount;
