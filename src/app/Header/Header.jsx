import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./headerCss/header.css"

const Header = () => {
	const [showMenu, setShowMenu] = useState(false);
	const handleClose = () => setShowMenu(false);
	const handleShow = () => setShowMenu(true);

	return (
		<div className='header'>
			<div className='header-logo-container'>
				<h2>testChat</h2>
			</div>
			<div className='header-menu-container'>
				<>
					<Button variant='primary' onClick={handleShow}>
						Menu
					</Button>

					<Offcanvas show={showMenu} onHide={handleClose} placement="end">
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							Menu content
						</Offcanvas.Body>
					</Offcanvas>
				</>
			</div>
		</div>
	);
};

export default Header;
