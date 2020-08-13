import React from "react";

export interface RoundsSelectionProps {
	rounds: string[];
	selectedRounds: boolean[];
	toggleRound: (id: number) => void;
}

export const RoundsSelection: React.FC<RoundsSelectionProps> = ({
	rounds,
	selectedRounds,
	toggleRound,
}) => {
	return (
		<div>
			{rounds.map((round, id) => (
				<button key={id} onClick={() => toggleRound(id)}>
					{round + (selectedRounds[id] ? "*" : "")}
				</button>
			))}
		</div>
	);
};
