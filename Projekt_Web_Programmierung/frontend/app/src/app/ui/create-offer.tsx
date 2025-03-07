"use client";

import { useState } from "react";
import styles from "./offer-list.module.css";
import { useRouter } from "next/navigation";
import { createOffer } from "../lib/api";

interface Offer {
    customer_id: number | null;
    name: string;
    price: number | null;
    currency: string;
}

export default function CreateOffer() {
    const [offer, setOffer] = useState<Offer>({
        customer_id: null,
        name: "",
        price: null,
        currency: ""
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOffer((prevOffer) => ({
            ...prevOffer,
            [name]: name === "price" || name === "customer_id" ? (value === "" ? null : Number(value)) : value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (offer.customer_id === null || !offer.name || offer.price === null || !offer.currency) {
            alert("Please fill out the form.");
            return;
        }
        try {
            await createOffer(offer);
            alert("Offer created successfully");
            router.push("/offer/all");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert("Error creating offer");
        }
    };

    return (
        <div className={styles["table-container"]}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="customer_id">Kunden-ID</label></td>
                            <td><input type="number" id="customer_id" name="customer_id" value={offer.customer_id ?? ""} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">Name</label></td>
                            <td><input type="text" id="name" name="name" value={offer.name} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="price">Preis</label></td>
                            <td><input type="number" id="price" name="price" value={offer.price ?? ""} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="currency">Währung</label></td>
                            <td><input type="text" id="currency" name="currency" value={offer.currency} onChange={handleInputChange} required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className={styles.createButton}>Angebot erstellen</button>
            </form>
        </div>
    );
}