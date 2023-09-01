import { Button, Form } from "react-bootstrap";
import "./bodyCss/startDroch.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { actions as userFormActions } from "../store/slices/userForm.slice";
import { useDispatch } from "react-redux";

const StartDroch = ({ socket }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("choose_your_gender");
	const handleSubmit = () => {
		if (username !== "" && gender !== "choose_your_gender") {
			dispatch(
				userFormActions.setUser({
					username: username,
					gender: gender,
					socketId: socket.id,
					success: true,
				})
			);
			socket.emit("findPartner", {
				username: username,
				gender: gender,
				socketId: socket.id,
				success: true,
			});
			navigate("/chat");
		}
	};
	return (
		<div className='start-droch-container'>
			<div className='start-droch-card'>
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label className='form-label'>
							Welcome to {"testChat"}
						</Form.Label>
						<Form.Control
							type='username'
							placeholder='Enter username'
							className='form-control'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Select
							aria-label='Choose your gender'
							value={gender}
							onChange={(e) => setGender(e.target.value)}>
							<option value='choose_your_gender'>
								Choose your gender
							</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</Form.Select>
					</Form.Group>

					<Button
						onClick={handleSubmit}
						variant='outline-primary'
						className='btn-outline-primary'>
						Start talk
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default StartDroch;
