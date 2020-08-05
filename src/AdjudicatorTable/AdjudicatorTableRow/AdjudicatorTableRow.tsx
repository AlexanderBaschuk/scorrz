import { AdjudicatorTableRowStyled } from "./AdjudicatorTableRow.styles";
import React from "react";

export type Score = number | undefined;

export interface AdjudicatorTableRowProps {
	competitorName: string;
	scores: Score[];
	sum: Score;
	gridScore: Score;
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
