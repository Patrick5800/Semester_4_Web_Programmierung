"use client";

import styles from './comment-list.module.css';
import React, { useState, useEffect } from 'react';
import { fetchCommentById, createComment, updateComment, getCommentsByOfferId, deleteComment } from '../lib/api';
import { useRouter } from 'next/navigation';

interface Comment {
    comment_id: number;
    offer_id: number;
    comment_text: string;
    created_at: string;
    updated_at: string;
}

interface CreateComment {
    offer_id: number;
    comment_text: string;
}

interface CommentListProps {
    offer_id: number;
}

export default function CommentList({ offer_id }: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const router = useRouter();
    const [commentToCreate, setCommentToCreate] = useState<CreateComment>({
            offer_id: offer_id,
            comment_text: "",});

    useEffect(() => {
        loadComments();
    }, [offer_id]);

    async function loadComments() {
        try {
            const data = await getCommentsByOfferId(offer_id);
            setComments(data);
        } catch (error) {
            console.error("Error loading comment data:", error);
        } finally {
            setLoading(false);
        }
    }

    const handlerowStyle = (comment: Comment) => {
        if (selectedComment && selectedComment.comment_id === comment.comment_id) {
            return styles.selectedRow;
        } else {
            return styles.row;
        }
    };

    const handleCommentButtonClick = () => {
        if (hasSelected) {
            alert("Bitte deselektieren sie den ausgewählten Kommentar, bevor Sie einen neuen erstellen.");
        }
        else {
            setIsEditing(false);
            setIsCreating(true);
        }
    };

    const handleRowClick = (comment: Comment) => {
        if (selectedComment !== null && selectedComment.comment_id === comment.comment_id) {
            setHasSelected(false)
            setSelectedComment(null);}
        else {
            setSelectedComment(comment);
            setHasSelected(true); // selcomment ungleich null und !has selected
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedComment) {
            setSelectedComment({
                ...selectedComment,
                comment_text: e.target.value,
            });
        } else {
            setSelectedComment({
                comment_id: 0, // oder eine andere Standard-ID
                offer_id: offer_id,
                comment_text: e.target.value,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
        }
    };
    const handleInputChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentToCreate({
            ...commentToCreate,
            comment_text: e.target.value,
        });
    }

    const handleSaveClick = async () => {
        if (isEditing && selectedComment && hasSelected) {
            try {
                await updateComment(selectedComment.comment_id, selectedComment);
                loadComments();
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating comment:", error);
            }
        }
        if (isCreating && commentToCreate) {
            try {
               await createComment(commentToCreate);
               loadComments();
               setIsCreating(false);
            } catch (error) {
                console.error("Error creating comment:", error);
            }
        }
        setSelectedComment(null);
    };

    const handleCancelClick = async () => {
        setSelectedComment(null);
        setIsEditing(false);
        setHasSelected(false);
        setIsCreating(false);
        await loadComments();
        router.refresh();
    };

    const handleEditButtonClick = () => {
        if (hasSelected)
        {
            setIsCreating(false);
            setIsEditing(true);
        } else {
            alert("Bitte wählen Sie einen Kommentar aus, den Sie bearbeiten möchten.");
        }
    };

    const handleDeleteButtonClick = async () => {
        if (hasSelected) {
            const confirmed = window.confirm("Möchten Sie diesen Kommentar wirklich löschen?");
            if (confirmed && selectedComment) {
                try {
                    await deleteComment(selectedComment.comment_id);
                    loadComments();
                } catch (error) {
                    console.error("Error deleting comment:", error);
                }
            }
        } else {
            alert("Bitte wählen Sie einen Kommentar aus, den Sie löschen möchten.");
        }
    }

    return (
        <div className={styles.tableContainer}>
            {selectedComment !== null && isEditing && hasSelected ? (
                <div>
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={5}>Kommentar bearbeiten</th>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <th>Offer-ID</th>
                                    <th>Text</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedComment?.comment_id || 0}</td>
                                    <td>{selectedComment?.offer_id || 0}</td>
                                    <td><input type="text" name="comment_text" value={selectedComment?.comment_text || ''} onChange={handleInputChange} /></td>
                                    <td>{selectedComment?.updated_at || ''}</td>
                                    <td>{selectedComment?.created_at || ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <button className={styles.crudButton} onClick={handleSaveClick}>Save</button>
                    <button className={styles.crudButton} onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : null}
            {isCreating && !hasSelected? (
                <div>
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Kommentar bearbeiten</th>
                            </tr>
                            <tr>
                                <th>Text</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="comment_text" value={commentToCreate.comment_text} onChange={handleInputChangeCreate} /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <button className={styles.crudButton} onClick={handleSaveClick}>Speichern</button>
                <button className={styles.crudButton} onClick={handleCancelClick}>Abbrechen</button>
            </div>
            ) : null}
            {!(selectedComment !== null && isEditing && hasSelected) && !(isCreating && !hasSelected) ? (
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Offer-ID</th>
                            <th>Text</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map((comment) => (
                                <tr key={comment.comment_id} 
                                className={handlerowStyle(comment)} 
                                onClick={() => handleRowClick(comment)}>
                                    <td>{comment.comment_id}</td>
                                    <td>{comment.offer_id}</td>
                                    <td>{comment.comment_text}</td>
                                    <td>{comment.created_at}</td>
                                    <td>{comment.updated_at}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No comments available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            <button className={styles.crudButton} onClick={handleCommentButtonClick}>Kommentieren</button>
            <button className={styles.crudButton} onClick={handleEditButtonClick}>Kommentar ändern</button>
            <button className={styles.crudButton} onClick={handleDeleteButtonClick}>Kommentar löschen</button>
            </div>
            ) : null}
        </div>
    );
}