import React from "react";

interface propInterface {
	people: {
		name: string;
		age: number;
		picture?: string;
		location?: string;
	}[];
}

export const GuestCard: React.FC<propInterface> = ({ people }) => {
	return (
		<div className="guestsWrapper">
			{people.map((person) => (
				<div className="guest" key={person.name}>
					<div className="guestAvi">
						<img src={person.picture} alt="thumbnail" />
					</div>
					<span>{person.name}</span>
					<span>Age: {person.age}</span>
					<span>{person.location}</span>
				</div>
			))}
		</div>
	);
};
