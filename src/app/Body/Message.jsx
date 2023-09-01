import "./bodyCss/myMessage.css";

const Message = ({ messageKey, message }) => {
	return (
		<div className='message-container' id={messageKey}>
			<div className='message-content'>{message}</div>
		</div>
	);
};

export default Message;
