import React from "react";

interface AdjudicatorTableHeaderProps {
	selectedRounds: boolean[];
	rounds: string[];
	shouldShowSums: boolean;
	shouldShowGrids: boolean;
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	selectedRounds,
	rounds,
	shouldShowSums,
	shouldShowGrids,
}) => {
	return (
		<tr>
			<th colSpan={2}>Competitor</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
			{shouldShowSums && <th>Sum</th>}
			{shouldShowGrids && <th>Grid</th>}
		</tr>
	);
};
