import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { GuestCard } from "./components/GuestCard";

interface stateInterface {
	people: {
		name: string;
		age: number;
		picture?: string;
		location?: string;
	}[];
}

function App() {
	const [people, setPeople] = useState<stateInterface["people"]>([]);
	const loader = useRef(null);
	const page = useRef(0);
	const intersectOptions = {
		root: null,
		threshold: 1,
	};

	// Function for modifying the response data to fit in with the 'People' interface

	const mapToState = (result: any): stateInterface["people"] => {
		let newArray: stateInterface["people"] = [];
		result.forEach((res: any) => {
			let newObject = {
				name: `${res.name.first} ${res.name.last}`,
				age: parseInt(`${res.dob.age}`),
				picture: `${res.picture.large}`,
				location: `${res.location.city}, ${res.location.country}`,
			};
			newArray.push(newObject);
		});

		return newArray;
	};

	const loadMore = (entries: any) => {
		const target = entries[0];
		if (target.isIntersecting) {
			page.current++;
			requestHandler(page.current);
		}
	};
	const requestHandler = async (page: number) => {
		console.log(`Page ${page} requested`);

		const request = await axios.get(
			`https://randomuser.me/api/?page=${page}&results=50&inc=name,dob,picture,location&seed=jp`
		);
		const response = request.data.results;
		const arranged = mapToState(response);
		setPeople((prevPeople) => {
			return [...prevPeople, ...arranged];
		});
	};

	useEffect(() => {
		const contentObserver = new IntersectionObserver(
			loadMore,
			intersectOptions
		);

		if (loader && loader.current) {
			contentObserver.observe(loader.current);
		}
	}, []);

	return (
		<div className="App">
			{/* <h1>Guest List</h1> */}
			<GuestCard people={people} />
			<div ref={loader} className="loader"></div>
		</div>
	);
}

export default App;
