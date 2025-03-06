"use client";

import { useEffect, useState } from "react";
import styles from "./offer-update.module.css";
import { fetchOfferById, updateOffer } from "../lib/api";
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
}

interface OfferUpdateProps {
    offer_id: number;
}

export default function OfferUpdate({ offer_id }: OfferUpdateProps) {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOffer((prevOffer) => prevOffer ? { ...prevOffer, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateOffer(offer_id, offer);
            router.push(`/offer/${offer_id}`);
        } catch (error) {
            console.error("Error updating offer data:", error);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={offer.name} onChange={handleInputChange} />
                </label>
                <label>
                    Preis:
                    <input type="text" name="price" value={offer.price} onChange={handleInputChange} />
                </label>
                <label>
                    Währung:
                    <input type="text" name="currency" value={offer.currency} onChange={handleInputChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={offer.status} onChange={handleInputChange} />
                </label>
                <button type="submit">Aktualisieren</button>
            </form>
        </div>
    );
}