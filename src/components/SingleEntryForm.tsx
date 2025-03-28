"use client";

import { useState } from "react";
import styles from "../styles/CreateCertificate.module.css";
import { SingleEntryFormProps } from "@/utils/types";
import Head from "next/head";

const SingleEntryForm: React.FC<SingleEntryFormProps> = ({ onMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "AICTE Internship",
    program: "",
    department: "",
    startDate: "",
    issueDate: "",
    certificateId: "",
    certificateImgSrc: "",
    rollNo: "",
    email: "",
    org: "",
  });

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Create Certificate",
    "description": "Create a new certificate in the E-Verify Portal system"
  };

  const handleFormItem = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/certificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          program: formData.program,
          department: formData.department,
          startDate: formData.startDate,
          issueDate: formData.issueDate,
          certificateId: formData.certificateId,
          certificateImgSrc: formData.certificateImgSrc,
          rollNo: formData.rollNo,
          email: formData.email,
          org: formData.org,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        onMessage(`Error: ${result.error || "Failed to create certificate!"}`);
        return;
      }

      onMessage("Certificate created successfully!");

      setFormData({
        name: "",
        type: "AICTE Internship",
        program: "",
        department: "",
        startDate: "",
        issueDate: "",
        certificateId: "",
        certificateImgSrc: "",
        rollNo: "",
        email: "",
        org: "",
      });
    } catch (error) {
      console.log(error);
      onMessage("Failed to create certificate!");
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <form 
        onSubmit={handleSubmit} 
        className={styles.formContainer}
        aria-labelledby="certificate-form-title"
      >
        <div className={styles.visuallyHidden} id="certificate-form-title">
          Create New Certificate Form
        </div>
        <div className={styles.formSubContainer}>
          <input
            placeholder="Username"
            name={"name"}
            type="text"
            value={formData.name}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-name"
            aria-label="Username"
          />

          {/* Dropdown for Type Selection */}
          <select
            value={formData.type}
            name={"type"}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-type"
            aria-label="Certificate Type"
          >
            <option value="AICTE Internship">AICTE Internship</option>
            <option value="Internship">Internship</option>
            <option value="Workshop">Workshop</option>
          </select>

          <input
            placeholder="Program"
            name={"program"}
            type="text"
            value={formData.program}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-program"
            aria-label="Program"
          />

          <input
            placeholder="Department"
            name={"department"}
            type="text"
            value={formData.department}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-department"
            aria-label="Department"
          />

          <input
            placeholder="Start Date"
            type="date"
            value={formData.startDate}
            name={"startDate"}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-start-date"
            aria-label="Start Date"
          />

          <input
            placeholder="Issued Date"
            type="date"
            value={formData.issueDate}
            name={"issueDate"}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-issue-date"
            aria-label="Issued Date"
          />

          <input
            placeholder="Certificate ID"
            type="text"
            value={formData.certificateId}
            name={"certificateId"}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-id"
            aria-label="Certificate ID"
          />

          <input
            placeholder="Certificate Img URL"
            type="text"
            value={formData.certificateImgSrc}
            name={"certificateImgSrc"}
            onChange={handleFormItem}
            className={styles.formInput}
            id="certificate-img-src"
            aria-label="Certificate Image URL"
          />

          <input
            placeholder="Roll No."
            type="text"
            name={"rollNo"}
            value={formData.rollNo}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-roll-no"
            aria-label="Roll Number"
          />

          <input
            placeholder="Email"
            type="email"
            name={"email"}
            value={formData.email}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-email"
            aria-label="Email"
          />

          <input
            placeholder="Organization"
            type="text"
            name={"org"}
            value={formData.org}
            onChange={handleFormItem}
            required
            className={styles.formInput}
            id="certificate-org"
            aria-label="Organization"
          />
        </div>
        <button 
          className={styles.formButton} 
          type="submit"
          aria-label="Add Certificate"
        >
          Add Certificate
        </button>
      </form>
    </>
  );
};

export default SingleEntryForm;
