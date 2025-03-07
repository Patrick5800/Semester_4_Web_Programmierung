"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./customer-list.module.css";
import { fetchAllCustomers } from "../lib/api";

interface Customer {
    customer_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadCustomers() {
            try {
                const data = await fetchAllCustomers();
                if (Array.isArray(data)) {
                    setCustomers(data);
                } else {
                    setError("Unexpected data format");
                }
            } catch (error) {
                setError("Error fetching customers");
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        }
        loadCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleRowClick = (customer_id: number) => {
        router.push(`/customer/${customer_id}`);
    };

    const handleCreateCustomerClick = () => {
        router.push('/customer/create');
    };

    const role = localStorage.getItem("role");

    return (
        <div className={styles["table-container"]}>
            {(role === "Account-Manager" || role === "Developer") && (
                <button className={styles.createButton} onClick={handleCreateCustomerClick}>
                    Kunde erstellen
                </button>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telefonnummer</th>
                        <th>Adresse</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.customer_id} onClick={() => handleRowClick(customer.customer_id)} className={styles.row}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No customers available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}