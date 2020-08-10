import React from "react";

interface AdjudicatorTableHeaderProps {
	adjudicatorName: string;
	rounds: string[];
}

export const AdjudicatorTableHeader: React.FC<AdjudicatorTableHeaderProps> = ({
	adjudicatorName,
	rounds,
}) => {
	return (
		<tr>
			<th>{adjudicatorName}</th>
			{rounds.map((roundName) => (
				<th key={roundName}>{roundName}</th>
			))}
			<th>Sum</th>
			<th>Grid</th>
		</tr>
	);
};
