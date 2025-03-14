"use client";

import React, { useState } from "react";
import styles from "../styles/AdminLoginComp.module.css";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import ForgotPasswordModal from "./ForgotPasswordModal";

const AdminLoginComp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const router = useRouter();

  const { login } = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        setMessage(data.message);
        setError(null);
        router.push(`/dashboard`);
      } else {
        setMessage(null);
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          aria-labelledby="login-heading"
        >
          <h2 id="login-heading" className={styles.formHeading}>
            Administrator Login
          </h2>

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`${styles.formInput} ${styles.usernameInput}`}
              aria-required="true"
              aria-invalid={error && !username ? "true" : "false"}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${styles.formInput} ${styles.passwordInput}`}
              aria-required="true"
              aria-invalid={error && !password ? "true" : "false"}
            />
          </div>

          <button
            type="button"
            className={styles.forgotPassword}
            onClick={() => setForgotPasswordOpen(true)}
          >
            Forgot Password?
          </button>

          <button type="submit" className={styles.formButton}>
            Log In
          </button>

          <ForgotPasswordModal
            target="Admin"
            open={forgotPasswordOpen}
            onClose={() => setForgotPasswordOpen(false)}
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className={styles.success} role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLoginComp;
