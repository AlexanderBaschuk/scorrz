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
	return displayMode === DisplayMode.Championship ? (
		<tr>
			<th colSpan={2}>Competitor</th>
			{rounds.map((roundName, i) => (
				<th key={i}>{roundName}</th>
			))}
			<th>Sum</th>
			<th>Grid</th>
		</tr>
	) : (
		<tr>
			<th colSpan={2}>Competitor</th>
			{rounds.map(
				(roundName, i) => selectedRounds[i] && <th key={i}>{roundName}</th>,
			)}
		</tr>
	);
};
