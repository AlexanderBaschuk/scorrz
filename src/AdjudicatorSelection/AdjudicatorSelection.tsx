import { AdjudicatorSelectionButton } from "./AdjudicatorSelectionButton";
import React from "react";

export interface AdjudicatorSelectionProps {
	adjudicators: string[];
	selectedAdjudicators: boolean[];
	toggleAdjudicator: (id: number) => void;
}

export const AdjudicatorSelection: React.FC<AdjudicatorSelectionProps> = ({
	adjudicators,
	selectedAdjudicators,
	toggleAdjudicator,
}) => {
	return (
		<div>
			{adjudicators.map((adj, id) => (
				<AdjudicatorSelectionButton
					key={id}
					id={id}
					onClick={toggleAdjudicator}
				>
					{adj + (selectedAdjudicators[id] ? "*" : "")}
				</AdjudicatorSelectionButton>
			))}
		</div>
	);
};
