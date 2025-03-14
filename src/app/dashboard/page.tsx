"use client";

import React, { useState } from "react";
import AdminNav from "@/sections/AdminNav";
import styles from "./page.module.css";
import Footer from "@/sections/Footer";
import CreateCertificate from "@/components/CreateCertificate";
import CreateVendor from "@/components/CreateVendor";
import { Modal } from "@mui/material";
import CreateAdmin from "@/components/CreateAdmin";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/AuthModal";
import Head from "next/head";

const AdminDashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<
    "vendor" | "certificate" | "admin" | null
  >(null);

  const router = useRouter();
  const { adminUser, showModal } = useAdmin();

  // Open Modal and Set Content functions
  const openCreateVendorModal = () => {
    setModalContent("vendor");
    setOpenModal(true);
  };

  const openCreateCertificateModal = () => {
    setModalContent("certificate");
    setOpenModal(true);
  };

  const openCreateAdminModal = () => {
    setModalContent("admin");
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | E-Verify Portal | Technotran Solutions</title>
        <meta
          name="description"
          content="Manage certificates, vendors, and administrators through the E-Verify Portal admin dashboard. A secure certificate verification system by Technotran Solutions."
        />
        <meta
          name="keywords"
          content="admin dashboard, certificate management, vendor management, e-verify portal, technotran solutions"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://e-verify-portal.com/admin-dashboard"
        />
      </Head>

      <main
        className={styles.dashboardMain}
        aria-labelledby="dashboard-heading"
      >
        {/* Show the LoginModal if user is not authenticated */}
        {!adminUser && showModal && <LoginModal authParams="Admin" />}

        <AdminNav />
        
        <section className={styles.mainBody}>
          <div className={styles.dashboardHeader}>
            <div className={styles.headerContent}>
              <h1 id="dashboard-heading" className={styles.landingHeading}>
                E-Verify Portal Dashboard
              </h1>
              <p className={styles.subHeading}>A Technotran Solutions Venture</p>
            </div>
          </div>

          <div className={styles.dashboardContent}>
            <div className={styles.sideProfile}>
              <div
                className={styles.userProfileContainer}
                aria-label="Admin Profile"
              >
                <Image
                  src={
                    adminUser?.profilePic ||
                    "https://github.com/CVSCharan/Technotran_Assets/blob/main/Picture11.png?raw=true"
                  }
                  alt={`Profile picture of ${adminUser?.username || "admin"}`}
                  height={100}
                  width={100}
                  className={styles.userPic}
                  priority
                />
                <h2 className={styles.userName}>{adminUser?.username}</h2>
                <p className={styles.userRole}>
                  {adminUser?.role === "superadmin" ? "Super Admin" : "Admin"}
                </p>
              </div>
            </div>

            <div className={styles.dashboardActions}>
              <div className={styles.actionSection}>
                <h3 className={styles.sectionTitle}>Management</h3>
                {adminUser?.role === "superadmin" && (
                  <div className={styles.cardContainer} aria-label="Admin Actions">
                    <div className={styles.actionCard} onClick={openCreateVendorModal}>
                      <div className={styles.cardIcon}>
                        <span className={styles.iconPlaceholder}>+</span>
                      </div>
                      <div className={styles.cardContent}>
                        <h4>Add Vendor</h4>
                        <p>Create a new vendor account</p>
                      </div>
                    </div>
                    
                    <div className={styles.actionCard} onClick={openCreateCertificateModal}>
                      <div className={styles.cardIcon}>
                        <span className={styles.iconPlaceholder}>+</span>
                      </div>
                      <div className={styles.cardContent}>
                        <h4>Add Certificate</h4>
                        <p>Create a new certificate</p>
                      </div>
                    </div>
                    
                    <div className={styles.actionCard} onClick={openCreateAdminModal}>
                      <div className={styles.cardIcon}>
                        <span className={styles.iconPlaceholder}>+</span>
                      </div>
                      <div className={styles.cardContent}>
                        <h4>Add Admin</h4>
                        <p>Create a new admin user</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.actionSection}>
                <h3 className={styles.sectionTitle}>View Data</h3>
                <div className={styles.cardContainer} aria-label="View Options">
                  <div className={styles.actionCard} onClick={() => router.push("/vendors")}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconPlaceholder}>👥</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4>View Vendors</h4>
                      <p>Manage all vendor accounts</p>
                    </div>
                  </div>
                  
                  <div className={styles.actionCard} onClick={() => router.push("/certificates")}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconPlaceholder}>🔖</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4>View Certificates</h4>
                      <p>Manage all certificates</p>
                    </div>
                  </div>
                  
                  <div className={styles.actionCard} onClick={() => router.push("/users")}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconPlaceholder}>👤</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4>View Users</h4>
                      <p>Manage all admin users</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.actionSection}>
                <h3 className={styles.sectionTitle}>Tools</h3>
                <div className={styles.cardContainer} aria-label="Additional Options">
                  <div className={styles.actionCard} onClick={() => router.push("/analytics")}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconPlaceholder}>📊</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4>Analytics</h4>
                      <p>View system analytics</p>
                    </div>
                  </div>
                  
                  <div className={styles.actionCard} onClick={() => router.push("/downloads")}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconPlaceholder}>⬇️</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4>Downloads</h4>
                      <p>Download reports and data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Component for Create Vendor, Certificate, Admin */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={styles.modalMainContainer}
        >
          <div className={styles.modalBox} role="dialog">
            <div className={styles.modalContent}>
              {modalContent === "vendor" && (
                <CreateVendor handleCloseModal={handleCloseModal} />
              )}
              {modalContent === "certificate" && <CreateCertificate />}
              {modalContent === "admin" && (
                <CreateAdmin handleCloseModal={handleCloseModal} />
              )}
            </div>
          </div>
        </Modal>

        <Footer />
      </main>
    </>
  );
};

export default AdminDashboardPage;
