import { useState } from "react";
import axios from "axios";
import './Login.css'

export default function Login({ onAuthenticated, accessDenied, clearAccessDenied }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    clearAccessDenied?.();
    setIsSubmitting(true);
 

    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        { email, password },
        { withCredentials: true },
      );

      if (response.data.success) {
        const isAdmin = await onAuthenticated?.();

        if (!isAdmin) {
          setMessage("Access Denied");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h2>Admin Login</h2>

        {(message || accessDenied) && (
          <p className="login-message login-message-error">
            {message || "Access Denied"}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setMessage("")
            clearAccessDenied?.()
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setMessage("")
            clearAccessDenied?.()
          }}
        />

        <button disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
