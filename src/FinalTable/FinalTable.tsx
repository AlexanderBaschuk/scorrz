import { CompetitorId, Score } from "@/model/types";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import { FinalTableWrapperStyled } from "./FinalTable.styles";
import React from "react";

interface FinalTableProps {
	results: CompetitorFinalResultRow[];
}

export interface CompetitorFinalResultRow {
	place: number;
	id: CompetitorId;
	name: string;
	gridSum: Score;
}

export const FinalTable: React.FC<FinalTableProps> = ({ results }) => {
	return (
		<FinalTableWrapperStyled>
			<table>
				<FinalTableHeader />
				{results.map((r) => (
					<FinalTableRow
						key={r.id}
						place={r.place}
						competitorId={r.id}
						competitorName={r.name}
						gridScore={r.gridSum}
					/>
				))}
			</table>
		</FinalTableWrapperStyled>
	);
};
