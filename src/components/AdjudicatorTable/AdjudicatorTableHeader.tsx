import { DisplayMode } from "@/types";
import React from "react";

interface AdjudicatorTableHeaderProps {
	displayMode: DisplayMode;
	selectedRounds: boolean[];
	rounds: string[];
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	displayMode,
	selectedRounds,
	rounds,
}) => {
	return (
		<tr>
			<th colSpan={2}>Competitor</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
			{displayMode === DisplayMode.Championship && <th>Sum</th>}
			{displayMode === DisplayMode.Championship && <th>Grid</th>}
		</tr>
	);
};
