"use client";

import React, { useState } from "react";
import styles from "../styles/CreateAdmin.module.css";
import { CreateModelProps } from "@/utils/types";

const CreateAdmin: React.FC<CreateModelProps> = ({ handleCloseModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          profilePic: profilePic || undefined,
          role,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Admin created successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setProfilePic("");
        setRole("admin");
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setMessage("Failed to create admin!");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form 
          onSubmit={handleSubmit} 
          className={styles.formContainer}
          aria-labelledby="admin-form-heading"
          role="form"
        >
          <h2 id="admin-form-heading" className={styles.formHeading}>Add New Admin</h2>
          
          <div className={styles.formSubContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.formInput}
                id="username"
                name="username"
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.formInput}
                id="email"
                name="email"
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.formInput}
                id="password"
                name="password"
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profilePic" className={styles.formLabel}>Profile Picture URL</label>
              <input
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                className={styles.formInput}
                id="profilePic"
                name="profilePic"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>Admin Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.formInput}
                id="role"
                name="role"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              type="button"
              onClick={handleCloseModal}
              className={`${styles.formButton} ${styles.cancelButton}`}
              aria-label="Close form"
            >
              Cancel
            </button>

            <button 
              type="submit" 
              className={`${styles.formButton} ${styles.submitButton}`}
              aria-label="Add admin"
            >
              Add Admin
            </button>
          </div>

          {message && <p className={`${styles.message} ${message.includes("success") ? styles.successMessage : styles.errorMessage}`} role="status">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
