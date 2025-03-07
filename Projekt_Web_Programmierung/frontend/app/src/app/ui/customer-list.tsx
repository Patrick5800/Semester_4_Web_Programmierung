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
    const [filters, setFilters] = useState<{ name?: string; address?: string }>({});
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function loadCustomers() {
            try {
                const data = await fetchAllCustomers(filters);
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
    }, [filters]);

    if (loading) {
        return <div>Wird geladen...</div>;
    }

    if (error) {
        return <div>Fehler: {error}</div>;
    }

    const handleRowClick = (customer_id: number) => {
        router.push(`/customer/${customer_id}`);
    };

    const handleCreateCustomerClick = () => {
        router.push('/customer/create');
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const role = localStorage.getItem("role");

    return (
        <div className={styles["table-container"]}>
            <div className={styles["button-container"]}>
                {(role === "Account-Manager" || role === "Developer") && (
                    <button className={styles.createButton} onClick={handleCreateCustomerClick}>
                        Kunde erstellen
                    </button>
                )}
                <button className={styles.createButton} onClick={() => setShowFilterMenu(!showFilterMenu)}>
                    Filter
                </button>
            </div>
            {showFilterMenu && (
                <div className={styles.filterMenu}>
                    <label>
                        Name:
                        <input type="text" name="name" value={filters.name || ""} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Adresse:
                        <input type="text" name="address" value={filters.address || ""} onChange={handleFilterChange} />
                    </label>
                </div>
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
                            <td colSpan={5}>Keine Kunden fefunden</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}