"use client";

import styles from './document-list.module.css';
import React, { useState, useEffect } from 'react';
import { fetchDocumentsByOfferId, deleteDocument, uploadDocument } from '../lib/api';
import { useRouter } from 'next/navigation';

interface Document {
    file_id: number;
    offer_id: number;
    file_name: string;
    file_path: string;
    created_at: string;
    updated_at: string;
}

interface DocumentListProps {
    offer_id: number;
}

export default function DocumentList({ offer_id }: DocumentListProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        loadDocuments();
    }, [offer_id]);

    async function loadDocuments() {
        try {
            const data = await fetchDocumentsByOfferId(offer_id);
            setDocuments(data);
        } catch (error) {
            console.error("Error loading document data:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteButtonClick = async () => {
        if (selectedDocument) {
            const confirmed = window.confirm("Möchten Sie dieses Dokument wirklich löschen?");
            if (confirmed) {
                try {
                    await deleteDocument(selectedDocument.file_id);
                    loadDocuments();
                    setSelectedDocument(null);
                } catch (error) {
                    console.error("Error deleting document:", error);
                }
            }
        } else {
            alert("Bitte wählen Sie ein Dokument aus, das Sie löschen möchten.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const response = await uploadDocument(file, offer_id);
                if (response) {
                    alert("Document uploaded successfully");
                    loadDocuments();
                    setFile(null); // Clear the file after upload
                    setFileName(null); // Clear the file name after upload
                }
            } catch (error) {
                console.error("Error uploading document:", error);
                alert("Error uploading document");
            }
        } else {
            alert("Please select a file to upload");
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div>
                <input type="file" id="fileSelect" className={styles.fileSelect} onChange={handleFileChange} />
                <label htmlFor="fileSelect" className={styles.crudButton}>Datei auswählen</label>
                {fileName && <span className={styles.fileName}>{fileName}</span>}
                <button className={styles.crudButton} onClick={handleUpload}>Hochladen</button>
            </div>
            {Array.isArray(documents) && documents.length > 0 ? (
                documents.map((document) => (
                    <div key={document.file_id} className={styles.documentItem}>
                        <a href={`http://localhost:8080/files/${document.file_id}/content`} target="_blank" rel="noopener noreferrer">
                            {document.file_name}
                        </a>
                        <button className={styles.deleteButton} onClick={() => setSelectedDocument(document)}>
                            Löschen
                        </button>
                    </div>
                ))
            ) : (
                <p>No documents available</p>
            )}
            {selectedDocument && (
                <button className={styles.crudButton} onClick={handleDeleteButtonClick}>
                    Dokument löschen
                </button>
            )}
        </div>
    );
}