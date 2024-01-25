import React from 'react';
import PropTypes from 'prop-types';

// MESSAGE COMPONENT
const ChatMessage = ({ key, message, auth }) => {
  const { text, uid, name } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message${messageClass} bubble`}>
      <p className="username">{name}</p>
      <p className={`messageText ${messageClass}`}>{text}</p>
    </div>
  );
};

ChatMessage.propTypes = {};

export default ChatMessage;
