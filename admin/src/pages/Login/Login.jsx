import { useState } from "react";
import axios from "axios";
import './Login.css'

export default function Login({ onAuthenticated, accessNotice, clearAccessNotice }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = import.meta.env.DEV ? "http://localhost:4000" : "";

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    clearAccessNotice?.();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        { email, password },
        { withCredentials: true },
      );

      if (!response.data?.success) {
        setMessage(response.data?.message || "You don't have access to the admin dashboard.");
        return;
      }

      const isAdmin = await onAuthenticated?.();

      if (!isAdmin) {
        setMessage("You don't have access to the admin dashboard.");
        return;
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "You don't have access to the admin dashboard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayMessage = message || accessNotice || "";

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h2>Admin Login</h2>

        {displayMessage && (
          <p className="login-message login-message-error">
            {displayMessage}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setMessage("")
            clearAccessNotice?.()
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setMessage("")
            clearAccessNotice?.()
          }}
        />

        <button disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}