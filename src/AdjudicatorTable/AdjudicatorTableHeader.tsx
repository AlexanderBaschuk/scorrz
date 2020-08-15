import { ThGrid, ThSum } from "./AdjudicatorTable.styles";

import React from "react";

interface AdjudicatorTableHeaderProps {
	selectedRounds: boolean[];
	rounds: string[];
	shouldShowSums: boolean;
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	selectedRounds,
	rounds,
	shouldShowSums,
}) => {
	return (
		<tr>
			<th colSpan={2}>Competitor</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
			{shouldShowSums && <ThSum>Sum</ThSum>}
			<ThGrid>Grid</ThGrid>
		</tr>
	);
};
