import { useState, useEffect, useContext } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { MessageContext } from './MessageContext';

const Messages = () => {
  const { message, clearMessage } = useContext(MessageContext);

  if (!message) return null;

  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast onClose={clearMessage} show={message} delay={message.duration} autohide={!!message.duration} bg={message.variant}>
        <Toast.Header>
          <strong className="me-auto">
            {message.variant === 'warning' ? 'Warning' : message.variant === 'danger' ? 'Error' : message.variant === 'success' ? 'Success' : 'Information'}
          </strong>
        </Toast.Header>
        <Toast.Body>{message.text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Messages;
