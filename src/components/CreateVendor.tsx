"use client";

import React, { useState } from "react";
import styles from "../styles/CreateVendor.module.css";
import { CreateModelProps } from "@/utils/types";

const CreateVendor: React.FC<CreateModelProps> = ({ handleCloseModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgPic, setOrgPic] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newVendor = {
      name,
      email,
      password,
      orgPic,
      org: orgName,
    };

    // Sending the data to the backend API to insert into MongoDB
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVendor),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Vendor added successfully!");
        // Clear form after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setOrgPic("");
        setOrgName("");
      } else {
        console.log(`Error: ${result.message}`);
      }
    } catch (error) {
      console.log(error);
      console.log("Error submitting data");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form 
          onSubmit={handleSubmit} 
          className={styles.formContainer}
          aria-labelledby="vendor-form-heading"
          role="form"
        >
          <h2 id="vendor-form-heading" className={styles.formHeading}>Add New Vendor</h2>
          
          <div className={styles.formSubContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Username</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.formInput}
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.formInput}
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.formInput}
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="orgName" className={styles.formLabel}>Organization Name</label>
              <input
                type="text"
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="orgPic" className={styles.formLabel}>Organization Logo URL</label>
              <input
                type="text"
                id="orgPic"
                value={orgPic}
                onChange={(e) => setOrgPic(e.target.value)}
                className={styles.formInput}
              />
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
              aria-label="Add vendor"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVendor;
