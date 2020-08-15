import React from "react";

interface AdjudicatorTableHeaderProps {
	adjudicatorName: string;
	selectedRounds: boolean[];
	rounds: string[];
	shouldShowSums: boolean;
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	selectedRounds,
	adjudicatorName,
	rounds,
	shouldShowSums,
}) => {
	return (
		<tr>
			<th>{adjudicatorName}</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
			{shouldShowSums && <th>Sum</th>}
			<th>Grid</th>
		</tr>
	);
};
