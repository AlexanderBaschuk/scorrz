import {
	AdjudicatorResults,
	AdjudicatorTableRowView,
	AdjudicatorTableView,
	Competitor,
	CompetitorId,
	FinalTableView,
} from "./types";
import {
	SumAndGrid,
	calculateFinalResults,
	calculateGridScores,
} from "./calc/calculations";
import {
	competitorsSelector,
	resultsSelector,
	roundsSelector,
	selectedAdjudicatorsSelector,
	selectedChampionshipRoundSelector,
	selectedRoundsSelector,
} from "./selectors";

import { createSelector } from "@reduxjs/toolkit";

const sumsAndGridsSelector = createSelector(
	resultsSelector,
	selectedRoundsSelector,
	(
		results: AdjudicatorResults[],
		selectedRounds: boolean[],
	): Map<CompetitorId, SumAndGrid>[] =>
		results.map((adjudicator) => {
			const selectedResults = adjudicator.resultLines.map((resultLine) => ({
				competitorId: resultLine.competitorId,
				score: resultLine.score.filter((_, i) => selectedRounds[i] === true),
			}));
			return calculateGridScores(selectedResults);
		}),
);

export const adjudicatorTablesSelector = createSelector(
	roundsSelector,
	resultsSelector,
	selectedAdjudicatorsSelector,
	selectedRoundsSelector,
	competitorsSelector,
	sumsAndGridsSelector,
	(
		rounds,
		results,
		selectedAdjudicators,
		selectedRounds,
		competitors,
		sumsAndGrids,
	): AdjudicatorTableView[] =>
		results.map((adjudicator, adjId) => {
			if (selectedAdjudicators[adjId] === false) {
				return null;
			}

			return {
				adjudicatorName: adjudicator.adjudicatorName,
				rounds: rounds.map((round, i) =>
					selectedRounds[i] === true ? round.shortName : null,
				),
				resultRows: adjudicator.resultLines
					.map(
						(resultLine): AdjudicatorTableRowView => ({
							id: resultLine.competitorId,
							name: getCompetitorName(competitors, resultLine.competitorId),
							scores: resultLine.score.map((score, i) =>
								selectedRounds[i] === true ? score : null,
							),
							sum: sumsAndGrids[adjId].get(resultLine.competitorId).sum,
							gridScore: sumsAndGrids[adjId].get(resultLine.competitorId).grid,
						}),
					)
					.sort((result1, result2) => {
						const diff = result2.sum - result1.sum;
						if (diff !== 0) return diff;
						if (result1.id === result2.id) return 0;
						return result1.id > result2.id ? 1 : -1;
					}),
			};
		}),
);

export const finalTableSelector = createSelector(
	selectedAdjudicatorsSelector,
	selectedChampionshipRoundSelector,
	competitorsSelector,
	sumsAndGridsSelector,
	(
		selectedAdjudicators,
		selectedChampionshipRound,
		competitors,
		sumsAndGrids,
	): FinalTableView => {
		if (selectedAdjudicators.filter((a) => a === true).length <= 1) return null;

		if (selectedChampionshipRound === undefined) return null;

		const allRequiredGrids = sumsAndGrids
			.filter((_sg, i) => selectedAdjudicators[i] === true)
			.map((adjResults) => {
				const gridsMap = new Map<CompetitorId, number>();
				adjResults.forEach((value, id) => gridsMap.set(id, value.grid));
				return gridsMap;
			});

		const finalResults = calculateFinalResults(allRequiredGrids);

		const finalTableRows = Array.from(finalResults, ([id, value]) => ({
			place: value.place,
			id,
			name: getCompetitorName(competitors, id),
			school: getCompetitorSchool(competitors, id),
			gridSum: value.gridSum,
		})).sort((result1, result2) => {
			const diff = result1.place - result2.place;
			if (diff !== 0) return diff;
			if (result1.id === result2.id) return 0;
			return result1.id > result2.id ? 1 : -1;
		});

		return { results: finalTableRows };
	},
);

const getCompetitorName = (competitors: Competitor[], id: CompetitorId) =>
	getCompetitor(competitors, id)?.name ?? "";

const getCompetitorSchool = (competitors: Competitor[], id: CompetitorId) =>
	getCompetitor(competitors, id)?.school ?? "";

const getCompetitor = (
	competitors: Competitor[],
	id: CompetitorId,
): Competitor | undefined => competitors.find((c) => c.id === id);
