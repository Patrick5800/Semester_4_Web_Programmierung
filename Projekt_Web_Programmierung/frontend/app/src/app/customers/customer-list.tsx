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
                const response = await fetch("http://localhost:8080/customer");
                const data = await response.json();
                setCustomers(data);
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
                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}