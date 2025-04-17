import React from "react";
import { Link } from "react-router-dom";

function User() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">User Page</h2>
      <div className="flex flex-col space-y-2">
        <Link to="/admin/users" className="text-blue-600 hover:underline">
          Go to Admin/User
        </Link>
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
          Go to Admin/Dashboard
        </Link>
      </div>
    </div>
  );
}

export default User;
