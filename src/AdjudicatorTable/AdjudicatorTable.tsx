import {
	AdjudicatorTableRow,
	Score,
} from "./AdjudicatorTableRow/AdjudicatorTableRow";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader/AdjudicatorTableHeader";
import { AdjudicatorTableWrapperStyled } from "./AdjudicatorTable.styles";
import { CompetitorId } from "src/model/types";
import React from "react";

interface AdjudicatorTableProps {
	adjudicatorName: string;
	rounds: string[];
	results: CompetitorRow[];
}

export interface CompetitorRow {
	id: CompetitorId;
	name: string;
	scores: Score[];
	sum: Score;
	gridScore: Score;
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	rounds,
	results,
}) => {
	return (
		<AdjudicatorTableWrapperStyled>
			<table>
				<AdjudicatorTableHeader
					adjudicatorName={adjudicatorName}
					rounds={rounds}
				/>
				{results.map((r) => (
					<AdjudicatorTableRow
						key={r.id}
						competitorName={r.name}
						scores={r.scores}
						sum={r.sum}
						gridScore={r.gridScore}
					/>
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
