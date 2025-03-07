"use client";

import { useEffect, useState } from "react";
import styles from "./offer-list.module.css";
import { fetchAllOffers } from "../lib/api";
import { useRouter } from "next/navigation";

interface Offer {
    offer_id: number;
    customer_id: number;
    name: string;
    price: number;
    currency: string;
    status: string;
}

export default function OfferList() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<{ customer_id?: string; name?: string; status?: string }>({ status: "Draft" });
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function loadOffers() {
            try {
                const data = await fetchAllOffers(filters);
                // Sortiere die Angebote nach der größten offer_id zuerst
                const sortedData = data.sort((a: Offer, b: Offer) => b.offer_id - a.offer_id);
                setOffers(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching offers:", error);
                setLoading(false);
            }
        }
        loadOffers();
    }, [filters]);

    if (loading) {
        return <div>Wird geladen...</div>;
    }

    const handleRowClick = (offer_id: number) => {
        router.push(`/offer/${offer_id}`);
    };

    const handleCreateOfferClick = () => {
        router.push('/offer/create');
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleApplyFilters = () => {
        setShowFilterMenu(false);
    };

    const role = localStorage.getItem("role");

    return (
        <div className={styles["table-container"]}>
            <div className={styles["button-container"]}>
                {(role === "Account-Manager" || role === "Developer") && (
                    <button className={styles.createButton} onClick={handleCreateOfferClick}>
                        Angebot erstellen
                    </button>
                )}
                <button className={styles.createButton} onClick={() => setShowFilterMenu(!showFilterMenu)}>
                    Filter
                </button>
            </div>
            {showFilterMenu && (
                <div className={styles.filterMenu}>
                    <label>
                        Kunden-ID:
                        <input type="text" name="customer_id" value={filters.customer_id || ""} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" value={filters.name || ""} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Status:
                        <select name="status" value={filters.status || ""} onChange={handleFilterChange}>
                            <option value="">Alle</option>
                            <option value="Draft">Entwurf</option>
                            <option value="In Progress">In Bearbeitung</option>
                            <option value="Active">Aktiv</option>
                            <option value="On Ice">Auf Eis</option>
                        </select>
                    </label>
                                    </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kunden-ID</th>
                        <th>Name</th>
                        <th>Preis</th>
                        <th>Währung</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(offers) && offers.length > 0 ? (
                        offers.map((offer) => (
                            <tr key={offer.offer_id} onClick={() => handleRowClick(offer.offer_id)} className={styles.row}>
                                <td>{offer.offer_id}</td>
                                <td>{offer.customer_id}</td>
                                <td>{offer.name}</td>
                                <td>{offer.price}</td>
                                <td>{offer.currency}</td>
                                <td>{offer.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Keine Angebote gefunden</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}