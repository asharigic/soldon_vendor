import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CommonModal = ({ isOpen, toggle, title, message, redirectTo, buttonText }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navigate to the specified route (if provided)
    if (redirectTo) {
      navigate(redirectTo);
    }
    // Close the modal
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabIndex="-1">
      <div className="modal-content">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            {message}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={handleRedirect}>
            {buttonText || 'Okay'}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default CommonModal;
