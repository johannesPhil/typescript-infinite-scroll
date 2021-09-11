import React, { useState } from "react";

function AddGuest() {
	const [input, setInput] = useState({
		name: "",
		age: "",
		picture: "",
		location: "",
	});
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div className="addWrapper">
			<input
				type="text"
				name="name"
				id=""
				className="addInput"
				placeholder="Name..."
				onChange={handleInput}
			/>
			<input
				type="text"
				name="age"
				id=""
				className="addInput"
				placeholder="Age..."
				onChange={handleInput}
			/>
			<input
				type="text"
				name="url"
				id=""
				className="addInput"
				placeholder="Avi URL..."
				onChange={handleInput}
			/>
			<input
				type="text"
				name="location"
				id=""
				className="addInput"
				placeholder="Location..."
				onChange={handleInput}
			/>
			<button className="addBtn">Add as Guest</button>
		</div>
	);
}

export default AddGuest;
