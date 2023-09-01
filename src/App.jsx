import React from "react";
import io from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./app/Header/Header.jsx";
import StartDroch from "./app/Body/StartDroch";
import Chat from "./app/Body/Chat";

const socket = io.connect("http://localhost:5050");

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<StartDroch socket={socket}/>} />
				<Route path='/chat' element={<Chat socket={socket}/>} />
			</Routes>
		</div>
	);
}

export default App;
