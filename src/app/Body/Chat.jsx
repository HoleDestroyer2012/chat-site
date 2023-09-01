import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CloseButton, Form } from "react-bootstrap";
import { actions as messagesActions } from "../store/slices/messages.slice";
import "./bodyCss/chat.css";
import { Send } from "react-bootstrap-icons";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const Chat = ({ socket }) => {
	const navigate = useNavigate();
	const { messages } = useSelector((state) => state.reducers.messagesSlice);
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (room === "") {
			socket.on("startChat", (roomPartner) => {
				console.log(roomPartner);
				setRoom(roomPartner.room);
			});
		}

		socket.on("receiveMessage", (message) => {
			console.log(message);
			dispatch(
				messagesActions.addMessage({
					socketId: socket.id,
					message: message.message,
				})
			);
		});
	}, [socket]);

	const handleSendMessage = (event) => {
		event.preventDefault();

		socket.emit("sendMessage", {
			message: message,
			room: room,
			socketId: socket.id,
		});
		setMessage("");
		console.log(messages);
	};
	return (
		<div className='chat-container'>
			<div className='chat-window'>
				<CloseButton
					onClick={() => navigate("/")}
					className='exit-chat-button'
				/>
				{messages.length !== 0 &&
					messages.map((uniqueMessage, index) => {
						console.log(uniqueMessage);
						return (
							<Message
								messageKey={`${uniqueMessage.message}_${index}`}
								message={uniqueMessage.message}
							/>
						);
					})}
			</div>
			<div className='chat-footer'>
				<Form onSubmit={handleSendMessage}>
					<Form.Group className='mb-3 send-message-input-and-button'>
						<Form.Control
							type='text'
							placeholder='your message...'
							className='send-message-input'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<Button
							type='submit'
							variant='outline-primary'
							className='send-message-btn'>
							<Send className='send-message-icon' />
						</Button>
					</Form.Group>
				</Form>
			</div>
		</div>
	);
};

export default Chat;
