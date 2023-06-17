import React, { useState } from 'react';
import Modal from 'react-modal';

// This line is important to bind the modal to your appElement
Modal.setAppElement('#root');

const NameModal = ({ isOpen, closeModal, setDisplayName }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInput = (e) => {
    setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(inputValue);
    closeModal();
    }

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Username"
        className="user-modal"
        overlayClassName="user-modal-overlay"
        shouldCloseOnOverlayClick={false}
    >
        <h2 className='user-text'>Please enter a username for leaderboard</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" className='user-input'value={inputValue} onChange={handleInput} />
            <button type="submit" className='user-button'>Submit</button>
        </form>
    </Modal>
    );
}

export default NameModal;