import React from "react";
import { useSelector } from "react-redux";
import { useUserService } from "../../services/userService";

const Profile = () => {
  const { user } = useSelector((state) => state.auth ?? {});
  const { getUser, handleLogin, handleLogout, loginState } = useUserService();
  const { data, error, isLoading } = getUser("123") ?? {};
  const { isLoading: isLoggingIn } = loginState ?? {};

  return (
    <div>
      {isLoading && <p>Loading user...</p>}
      {error && <p style={{ color: "red" }}>Error loading user</p>}
      {data?.name && <p>Fetched User: {data?.name ?? "Unknown"}</p>}

      {user?.name ? (
        <>
          <p>Logged in as: {user?.name ?? "Unknown"}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button
          disabled={!!isLoggingIn}
          onClick={() =>
            handleLogin({ email: "test@test.com", password: "123456" })
          }
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      )}
    </div>
  );
};

export default Profile;
