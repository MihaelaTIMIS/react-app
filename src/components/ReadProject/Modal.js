import React from 'react';
import { Button } from 'antd';
import Modal from 'react-modal';
import "./index.css";

//je l'ai mis parce qu'il me sortait un warning rouge "please set up an App element"
Modal.setAppElement('body');

export default function CalendarModalF({
    children,
    isOpen,
    onRequestClose,
}) {
    return (
        <Modal
            className="containerStyles"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
        >
            <h2>Ajouter à mon agenda</h2>
            <div>{children}</div>
            <Button onClick={onRequestClose}>Annuler</Button>
        </Modal>
    );
}
