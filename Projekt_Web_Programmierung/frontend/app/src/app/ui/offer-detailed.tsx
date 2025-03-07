"use client";

import { useEffect, useState } from "react";
import styles from "./offer-detailed.module.css";
import { fetchOfferById, updateOffer, deleteOffer, updateOfferStatus } from "../lib/api";
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

interface OfferDetailedProps {
    offer_id: number;
}

export default function OfferDetailed({ offer_id }: OfferDetailedProps) {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadOffer();
    }, [offer_id]);

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

    const handleSaveClick = async () => {
        try {
            if (offer) {
                await updateOffer(offer_id, offer);
                await updateOfferStatus(offer_id, offer.status);
                alert("Offer and status updated successfully");
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating offer or status:", error);
            alert("Error updating offer or status");
        }
    };

    const handleDeleteButtonClick = async (offer_id: number) => {
        const confirmed = window.confirm("Möchten Sie dieses Angebot wirklich löschen?");
        if (confirmed) {
            try {
                await deleteOffer(offer_id);
                router.push("/offer/all");
            } catch (error) {
                console.error("Error deleting offer:", error);
            }
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setOffer((prevOffer) => prevOffer ? { ...prevOffer, status: value } : null);
    };

    const handleCancelClick = async () => {
        setIsEditing(false);
        await loadOffer();
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
                                    <th colSpan={2}>Angebotsdetails bearbeiten</th>
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
                                    <td><input type="text" name="name" value={offer.name} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td>Preis</td>
                                    <td><input type="text" name="price" value={offer.price} onChange={handleInputChange} /> <input type="text" name="currency" value={offer.currency} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        <select value={offer.status} onChange={handleStatusChange} className={styles.dropdownOptions}>
                                            <option value="Draft">Entwurf</option>
                                            <option value="In Progress">In Bearbeitung</option>
                                            <option value="Active">Aktiv</option>
                                            <option value="On Ice">Auf Eis</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Erstellt am</td>
                                    <td>{offer.created_at}</td>
                                </tr>
                                <tr>
                                    <td>Aktualisiert am</td>
                                    <td>{offer.updated_at}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className={styles.crudButton} onClick={handleSaveClick}>Speichern</button>
                        <button type="button" className={styles.crudButton} onClick={handleCancelClick}>Abbrechen</button>
                    </form>
                </div>
            ) : (
                <div>
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
                        </tbody>
                    </table>
                    {(role === "Account-Manager" || role === "Developer") && (
                        <>
                            <button className={styles.crudButton} onClick={() => setIsEditing(true)}>Bearbeiten</button>
                            <button className={styles.crudButton} onClick={() => handleDeleteButtonClick(offer.offer_id)}>Löschen</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}