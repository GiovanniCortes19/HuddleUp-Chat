import PropTypes from 'prop-types';

// MESSAGE COMPONENT
const ChatMessage = ({ message, auth }) => {
  const { text, uid, name } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message${messageClass} bubble`}>
      <p className="username">{name}</p>
      <p className={`messageText ${messageClass}`}>{text}</p>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.object,
  auth: PropTypes.object,
};

export default ChatMessage;
