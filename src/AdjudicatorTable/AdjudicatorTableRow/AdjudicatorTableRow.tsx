import { AdjudicatorTableRowStyled } from "./AdjudicatorTableRow.styles";
import React from "react";

interface AdjudicatorTableRowProps {
	competitorName: string;
	scores: number[];
	sum: number;
	gridScore: number;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	competitorName,
	scores,
	sum,
	gridScore,
}) => {
	return (
		<AdjudicatorTableRowStyled>
			<td>{competitorName}</td>
			{scores.map((score, i) => (
				<td key={i}>{score}</td>
			))}
			<td>{sum}</td>
			<td>{gridScore}</td>
		</AdjudicatorTableRowStyled>
	);
};
