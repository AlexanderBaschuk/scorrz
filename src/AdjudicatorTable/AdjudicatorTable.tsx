import React, { useCallback } from "react";
import {
	competitorsSelector,
	resultsSelector,
} from "../../src/Scorrz.selectors";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader/AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow/AdjudicatorTableRow";
import { CompetitorId } from "src/model/types";
import { useSelector } from "react-redux";

interface AdjudicatorTableProps {
	adjudicatorId: number;
	adjudicatorName: string;
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorId,
	adjudicatorName,
}) => {
	const competitors = useSelector(competitorsSelector);

	const getCompetitor = useCallback(
		(id: CompetitorId) => {
			return competitors.filter((c) => c.id === id)[0];
		},
		[competitors],
	);
	const rounds = ["H", "L", "S"];
	const results = useSelector(resultsSelector);
	const adjudicatorResults = results[adjudicatorId].resultLines;

	return (
		<table>
			<AdjudicatorTableHeader
				adjudicatorName={adjudicatorName}
				rounds={rounds}
			/>
			{adjudicatorResults.map((r) => (
				<AdjudicatorTableRow
					key={r.competitorId}
					competitorName={getCompetitor(r.competitorId).name}
					scores={r.score}
					sum={r.cumulativeSum[r.cumulativeSum.length - 1]}
					gridScore={r.cumulativeGridScore[r.cumulativeGridScore.length - 1]}
				/>
			))}
		</table>
	);
};
