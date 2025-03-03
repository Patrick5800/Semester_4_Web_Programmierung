"use client";

import { useEffect, useState } from "react";
import styles from "./customer-detailed.module.css";
import { fetchCustomerById } from "../lib/api";
import { useRouter } from "next/navigation";

interface Customer {
    customer_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
}

interface CustomerDetailedProps {
    customer_id: number;
}

export default function CustomerDetailed({ customer_id }: CustomerDetailedProps) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadCustomer() {
            try {
                const data = await fetchCustomerById(customer_id);
                setCustomer(data.customer); // Zugriff auf das verschachtelte Objekt
            } catch (error) {
                console.error("Error loading customer data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadCustomer();
    }, [customer_id]);

    if (loading) {
        return <div>Wird geladen...</div>;
    }

    if (!customer) {
        return <div>Keine Kundendaten verfügbar</div>;
    }

    const handleUpdateButtonClick = (customer_id: number) => {
        router.push(`/customer/${customer_id}/update`)
    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Kundendetails</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kunden-ID</td>
                        <td>{customer.customer_id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{customer.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{customer.email}</td>
                    </tr>
                    <tr>
                        <td>Telefon</td>
                        <td>{customer.phone}</td>
                    </tr>
                    <tr>
                        <td>Adresse</td>
                        <td>{customer.address}</td>
                    </tr>
                    <tr>
                        <td>Erstellt am</td>
                        <td>{customer.created_at}</td>
                    </tr>
                    <tr>
                        <td>Aktualisiert am</td>
                        <td>{customer.updated_at}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            
                                <button className={styles.updateButton} onClick={() => handleUpdateButtonClick(customer.customer_id)}>Bearbeiten</button>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}