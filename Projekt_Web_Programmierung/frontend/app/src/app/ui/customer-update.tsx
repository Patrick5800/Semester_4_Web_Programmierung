"use client";

import { useEffect, useState } from "react";
import styles from "./customer-update.module.css";
import { fetchCustomerById, updateCustomer } from "../lib/api";
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

interface CustomerUpdateProps {
    customer_id: number;
}

export default function CustomerUpdate({ customer_id }: CustomerUpdateProps) {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => prevCustomer ? { ...prevCustomer, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateCustomer(customer_id, customer);
            router.push(`/customer/${customer_id}`);
        } catch (error) {
            console.error("Error updating customer data:", error);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={customer.name} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={customer.email} onChange={handleInputChange} />
                </label>
                <label>
                    Telefon:
                    <input type="text" name="phone" value={customer.phone} onChange={handleInputChange} />
                </label>
                <label>
                    Adresse:
                    <input type="text" name="address" value={customer.address} onChange={handleInputChange} />
                </label>
                <button type="submit">Aktualisieren</button>
            </form>
        </div>
    );
}