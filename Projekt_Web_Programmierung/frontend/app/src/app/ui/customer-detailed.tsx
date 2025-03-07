"use client";

import { useEffect, useState } from "react";
import styles from "./customer-detailed.module.css";
import { fetchCustomerById, updateCustomer, deleteCustomer } from "../lib/api";
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
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadCustomer();
    }, [customer_id]);

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

    const handleSaveClick = async () => {
        try {
            await updateCustomer(customer_id, customer);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDeleteButtonClick = async (customer_id: number) => {
        const confirmed = window.confirm("Möchten Sie diesen Kunden wirklich löschen?");
        if (confirmed) {
            try {
                await deleteCustomer(customer_id);
                router.push("/customer/all");
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    const handleCancelClick = async () => {
        setIsEditing(false);
        await loadCustomer();
        router.refresh();
    };

    const role = localStorage.getItem("role");

    return (
        <div className={styles.tableContainer}>
            {isEditing ? (
                <div>
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Kundendetails bearbeiten</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Kunden-ID</td>
                                    <td>{customer.customer_id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td><input type="text" name="name" value={customer.name} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><input type="text" name="email" value={customer.email} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td>Telefon</td>
                                    <td><input type="text" name="phone" value={customer.phone} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td>Adresse</td>
                                    <td><input type="text" name="address" value={customer.address} onChange={handleInputChange} /></td>
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
                                        <button className={styles.crudButton} onClick={handleSaveClick}>Speichern</button>
                                        <button className={styles.crudButton} onClick={handleCancelClick}>Abbrechen</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            ) : (
                <div>
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
                        </tbody>
                    </table>
                    {(role === "Account-Manager" || role === "Developer") && (
                        <>
                            <button className={styles.crudButton} onClick={() => setIsEditing(true)}>Bearbeiten</button>
                            <button className={styles.crudButton} onClick={() => handleDeleteButtonClick(customer.customer_id)}>Löschen</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}