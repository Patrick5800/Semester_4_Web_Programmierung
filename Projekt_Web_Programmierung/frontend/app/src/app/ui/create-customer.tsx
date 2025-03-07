"use client";

import { useState } from "react";
import styles from "./customer-list.module.css";
import { useRouter } from "next/navigation";
import { createCustomer } from "../lib/api";

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function CreateCustomer() {
    const [customer, setCustomer] = useState<Customer>({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer.name || !customer.email || !customer.phone || !customer.address) {
            alert("Please fill out the form.");
            return;
        }
        try {
            await createCustomer(customer);
            alert("Customer created successfully");
            router.push("/customer/all");
        } catch (error) {
            console.error("Error creating customer:", error);
            alert("Error creating customer");
        }
    };

    return (
        <div className={styles["table-container"]}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name</label></td>
                            <td><input type="text" id="name" name="name" value={customer.name} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email</label></td>
                            <td><input type="email" id="email" name="email" value={customer.email} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phone">Telefon</label></td>
                            <td><input type="text" id="phone" name="phone" value={customer.phone} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="address">Adresse</label></td>
                            <td><input type="text" id="address" name="address" value={customer.address} onChange={handleInputChange} required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className={styles.createButton}>Kunde erstellen</button>
            </form>
        </div>
    );
}