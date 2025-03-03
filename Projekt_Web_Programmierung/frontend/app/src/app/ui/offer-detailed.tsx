"use client";

import { useEffect, useState } from "react";
import styles from "./customer-detailed.module.css";
import { fetchOfferById } from "../lib/api";
import { useRouter } from "next/navigation";

interface Offer {
    offer_id: number;
    customer_id: number;
    name: string;
    price: string;
    currency: string;
    status: string;
    created_at: string;
    updated_at: string;
    commented: boolean; //für evtl übergabe ob kommentar vorhanden
}

interface OfferDetailedProps {
    offer_id: number;
}

export default function OfferDetailed({ offer_id }: OfferDetailedProps) {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadOffer() {
            try {
                const data = await fetchOfferById(offer_id);
                setOffer(data.offer); // Zugriff auf das verschachtelte Objekt
            } catch (error) {
                console.error("Error loading offer data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadOffer();
    }, [offer_id]);

    if (loading) {
        return <div>Wird geladen...</div>;
    }

    if (!offer) {
        return <div>Keine Angebotsdaten verfügbar</div>;
    }

    const handleUpdateButtonClick = (offer_id: number) => {
        router.push(`/offer/${offer_id}/update`)
    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Angebotsdetails</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Angebots-ID</td>
                        <td>{offer.offer_id}</td>
                    </tr>
                    <tr>
                        <td>Kunden-ID</td>
                        <td>{offer.customer_id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{offer.name}</td>
                    </tr>
                    <tr>
                        <td>Preis</td>
                        <td>{offer.price} {offer.currency}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{offer.status}</td>
                    </tr>
                    <tr>
                        <td>Erstellt am</td>
                        <td>{offer.created_at}</td>
                    </tr>
                    <tr>
                        <td>Aktualisiert am</td>
                        <td>{offer.updated_at}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button className={styles.updateButton} onClick={() => handleUpdateButtonClick(offer.offer_id)}>Bearbeiten</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}