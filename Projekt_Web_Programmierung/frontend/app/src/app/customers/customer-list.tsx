"use client";

import { useEffect, useState } from "react";
import styles from "./customer-list.module.css";

interface Customer {
    customer_id: number;
    name: string;
    email: string;
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("http://localhost:8080/customer/all");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCustomers(data);
                } else {
                    console.error("Expected an array of customers");
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles["table-container"]}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(customers) ? (
                        customers.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No customers available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}