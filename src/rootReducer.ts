import { Competitor, CompetitorId, testInitialState } from "./model/types";
import {
	calculateFinalResults,
	calculateGridScores,
} from "./Calculations/calculations";
import { createAction, createReducer } from "@reduxjs/toolkit";

import { AdjudicatorTableProps } from "./AdjudicatorTable/AdjudicatorTable";
import { AdjudicatorTableRowProps } from "./AdjudicatorTable/AdjudicatorTableRow";

export const calculate = createAction("CALCULATE");

export const rootReducer = createReducer(testInitialState, {
	[calculate.type]: (state) => {
		global.console.log("starting reducer")
		const getCompetitor = (id: CompetitorId): Competitor | undefined =>
			state.competitors.find((c) => c.id === id);

		const getCompetitorName = (id: CompetitorId) =>
			getCompetitor(id)?.name ?? "";

		const sumsAndGrids = state.results.map((adjudicator) =>
			calculateGridScores(adjudicator.resultLines),
		);

		const adjudicatorTables: AdjudicatorTableProps[] = state.results.map(
			(adjudicator, adjId) => ({
				adjudicatorName: adjudicator.adjudicatorName,
				rounds: state.rounds.map(r => r.shortName),
				resultRows: adjudicator.resultLines
					.map(
						(r): AdjudicatorTableRowProps => ({
							id: r.competitorId,
							name: getCompetitorName(r.competitorId),
							scores: r.score,
							sum: sumsAndGrids[adjId].get(r.competitorId).sum,
							gridScore: sumsAndGrids[adjId].get(r.competitorId).grid,
						}),
					)
					.sort((result1, result2) => {
						const diff = result2.sum - result1.sum;
						if (diff !== 0) return diff;
						if (result1.id === result2.id) return 0;
						return result1.id > result2.id ? 1 : -1;
					}),
			}),
		);

		const allGrids = sumsAndGrids.map((adjResults) => {
			const gridsMap = new Map<CompetitorId, number>();
			adjResults.forEach((value, id) => gridsMap.set(id, value.grid));
			return gridsMap;
		});

		const finalResults = calculateFinalResults(allGrids);

		const finalTable = Array.from(finalResults, ([id, value]) => ({
			place: value.place,
			id,
			name: getCompetitorName(id),
			gridSum: value.gridSum,
		})).sort((result1, result2) => {
			const diff = result1.place - result2.place;
			if (diff !== 0) return diff;
			if (result1.id === result2.id) return 0;
			return result1.id > result2.id ? 1 : -1;
		});

		state.adjudicatorTables = adjudicatorTables;
		state.finalTable = {results: finalTable};
	},
});
