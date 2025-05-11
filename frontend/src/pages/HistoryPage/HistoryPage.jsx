// frontend/src/pages/UserHistory.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./userhistory.module.css";

const UserHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get("/api/user_det");
                if (response.data.success) {
                    setHistory(response.data.data);
                } else {
                    alert("Failed to fetch user history");
                }
            } catch (error) {
                console.error("Error fetching user history:", error);
                alert("Error fetching history");
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className={styles.historyContainer}>
            <h2 className={styles.title}>Your Towing Service Requests</h2>
            {history.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                history.map((item, index) => (
                    <div key={index} className={styles.historyCard}>
                        <h3>Request #{index + 1}</h3>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Contact:</strong> {item.contactNumber}</p>
                        <p><strong>Vehicle:</strong> {item.vehicleModel} ({item.vehicleYear})</p>
                        <p><strong>Pickup:</strong> {item.pickupLocation}</p>
                        <p><strong>Drop:</strong> {item.dropLocation}</p>
                        <p><strong>Distance:</strong> {item.distance} km</p>
                        <p><strong>Payment:</strong> ₹{item.payment}</p>
                        <p><em>Requested on: {new Date(item.createdAt).toLocaleString()}</em></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserHistory;
