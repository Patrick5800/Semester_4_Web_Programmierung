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
    const router = useRouter();

    useEffect(() => {
        async function loadCustomers() {
            const data = await fetchAllCustomers();
            setCustomers(data);
            setLoading(false);
        }
        loadCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleRowClick = (customer_id: number) => {
        router.push(`/customer/${customer_id}`);
    };

    return (
        <div className={styles["table-container"]}>
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