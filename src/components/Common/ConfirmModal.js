import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ isOpen, toggle, title, message, onConfirm, redirectTo, buttonText = "Confirm" }) => {
    const navigate = useNavigate();

    // Handle the confirmation
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(); // Execute the provided confirmation function
        }

        if (redirectTo) {
            navigate(redirectTo); // Redirect to the specified route
        }

        toggle(); // Close the modal
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="light" onClick={toggle}>Close</Button>
                <Button color="primary" onClick={handleConfirm}>{buttonText}</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
