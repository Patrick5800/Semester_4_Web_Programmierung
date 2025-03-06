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
    const router = useRouter();

    useEffect(() => {
        async function loadOffers() {
            const data = await fetchAllOffers();
            // Sortiere die Angebote nach der größten offer_id zuerst
            const sortedData = data.sort((a: Offer, b: Offer) => b.offer_id - a.offer_id);
            setOffers(sortedData);
            setLoading(false);
        }
        loadOffers();
    }, []);

    if (loading) {
        return <div>Wird geladen...</div>;
    }

    const handleRowClick = (offer_id: number) => {
        router.push(`/offer/${offer_id}`);
    };

    return (
        <div className={styles["table-container"]}>
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
                            <td colSpan={6}>No offers available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}