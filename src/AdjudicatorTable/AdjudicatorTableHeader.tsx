import React from "react";

interface AdjudicatorTableHeaderProps {
	adjudicatorName: string;
	selectedRounds: boolean[];
	rounds: string[];
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	selectedRounds,
	adjudicatorName,
	rounds,
}) => {
	return (
		<tr>
			<th>{adjudicatorName}</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
			<th>Sum</th>
			<th>Grid</th>
		</tr>
	);
};
