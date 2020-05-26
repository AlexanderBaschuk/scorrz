import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import React from "react";

interface AdjudicatorTableProps {
	adjudicatorId: number;
}

const getAdjName = (id: number): string => {
	return `Adjudicator ${id}`;
};

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorId,
}) => {
	const competitors = ["Laura", "Sasha", "John", "Paul", "Mike", "Sandra"];
	const rounds = ["H", "L", "S"];
	return (
		<table>
			<AdjudicatorTableHeader
				adjudicatorName={getAdjName(adjudicatorId)}
				rounds={rounds}
			/>
			{competitors.map((c) => (
				<AdjudicatorTableRow
					key={c}
					competitorName={c}
					scores={[75, 81, 78]}
					sum={75 + 81 + 78}
					gridScore={100}
				/>
			))}
		</table>
	);
};
