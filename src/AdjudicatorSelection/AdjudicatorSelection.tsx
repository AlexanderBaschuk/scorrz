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
				<button key={id} onClick={() => toggleAdjudicator(id)}>
					{adj + (selectedAdjudicators[id] ? "*" : "")}
				</button>
			))}
		</div>
	);
};
