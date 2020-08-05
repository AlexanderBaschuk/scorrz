import {
	AdjudicatorTable,
	CompetitorRow,
} from "./AdjudicatorTable/AdjudicatorTable";
import React, { useCallback, useMemo } from "react";
import { allResultsSelector, competitorsSelector } from "./Scorrz.selectors";

import { CompetitorId } from "./model/types";
import { useSelector } from "react-redux";

export const Scorrz: React.FC = () => {
	const competitors = useSelector(competitorsSelector);

	const getCompetitor = useCallback(
		(id: CompetitorId) => {
			return competitors.filter((c) => c.id === id)[0];
		},
		[competitors],
	);
	const rounds = ["H", "L", "S"];
	const results = useSelector(allResultsSelector);
	const adjudicatorId = 0;
	const adjudicatorName = "adjudicator 1";

	const adjudicatorResults: CompetitorRow[] = useMemo(
		() =>
			results[adjudicatorId].resultLines.map((r) => ({
				id: r.competitorId,
				name: getCompetitor(r.competitorId).name,
				scores: r.score,
				sum: r.cumulativeSum[rounds.length - 1],
				gridScore: r.cumulativeGridScore[rounds.length - 1],
			})),
		[results, getCompetitor, rounds.length],
	);

	return (
		<AdjudicatorTable
			adjudicatorName={adjudicatorName}
			rounds={rounds}
			results={adjudicatorResults}
		/>
	);
};
