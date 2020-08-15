import React from "react";
import { RoundsSelectionButton } from "./RoundsSelectionButton";

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
				<RoundsSelectionButton key={id} id={id} onClick={toggleRound}>
					{round + (selectedRounds[id] ? "*" : "")}
				</RoundsSelectionButton>
			))}
		</div>
	);
};
