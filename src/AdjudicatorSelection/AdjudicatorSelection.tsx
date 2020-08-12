import React from "react";

export interface AdjudicatorSelectionProps {
	adjudicators: string[];
	selectedAdjudicator?: number;
	selectAdjudicator: (id?: number) => void;
}

export const AdjudicatorSelection: React.FC<AdjudicatorSelectionProps> = ({
	adjudicators,
	selectedAdjudicator,
	selectAdjudicator,
}) => {
	return (
		<div>
			{adjudicators.map((adj, id) => (
				<button key={id} onClick={() => selectAdjudicator(id)}>
					{adj + (selectedAdjudicator === id ? "*" : "")}
				</button>
			))}
			<button onClick={() => selectAdjudicator(null)}>All</button>
		</div>
	);
};
