import {
	AdjudicatorTableRowView,
	AdjudicatorTableView,
	Competitor,
	CompetitorId,
	FinalTableView,
	State,
} from "@/types";
import {
	SumAndGrid,
	calculateFinalResults,
	calculateGridScores,
} from "../calculations/calculations";

export const calculateResultTables = (
	state: State,
): [AdjudicatorTableView[], FinalTableView] => {
	const sumsAndGrids = calculateSumsAndGrids(state);
	const adjudicatorTables = calculateAdjudicatorTables(state, sumsAndGrids);
	const finalTable = calculateFinalTable(state, sumsAndGrids);
	return [adjudicatorTables, finalTable];
};

const calculateSumsAndGrids = (state: State): Map<CompetitorId, SumAndGrid>[] =>
	state.results.map((adjudicator) => {
		const selectedResults = adjudicator.resultLines.map((resultLine) => ({
			competitorId: resultLine.competitorId,
			score: resultLine.score.filter(
				(_, i) => state.selectedRounds[i] === true,
			),
		}));
		return calculateGridScores(selectedResults);
	});

const calculateAdjudicatorTables = (
	state: State,
	sumsAndGrids: Map<CompetitorId, SumAndGrid>[],
): AdjudicatorTableView[] =>
	state.results.map((adjudicator, adjId) => {
		if (state.selectedAdjudicators[adjId] === false) {
			return null;
		}

		return {
			adjudicatorName: adjudicator.adjudicatorName,
			rounds: state.rounds.map((round, i) =>
				state.selectedRounds[i] === true ? round.shortName : null,
			),
			resultRows: adjudicator.resultLines
				.map(
					(resultLine): AdjudicatorTableRowView => ({
						id: resultLine.competitorId,
						name: getCompetitorName(state, resultLine.competitorId),
						scores: resultLine.score.map((score, i) =>
							state.selectedRounds[i] === true ? score : null,
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
	});

const calculateFinalTable = (
	state: State,
	sumsAndGrids: Map<CompetitorId, SumAndGrid>[],
): FinalTableView => {
	if (state.selectedAdjudicators.filter((a) => a === true).length <= 1)
		return null;

	if (state.selectedRounds.filter((a) => a === true).length === 0) return null;

	const allRequiredGrids = sumsAndGrids
		.filter((_sg, i) => state.selectedAdjudicators[i] === true)
		.map((adjResults) => {
			const gridsMap = new Map<CompetitorId, number>();
			adjResults.forEach((value, id) => gridsMap.set(id, value.grid));
			return gridsMap;
		});

	const finalResults = calculateFinalResults(allRequiredGrids);

	const finalTableRows = Array.from(finalResults, ([id, value]) => ({
		place: value.place,
		id,
		name: getCompetitorName(state, id),
		gridSum: value.gridSum,
	})).sort((result1, result2) => {
		const diff = result1.place - result2.place;
		if (diff !== 0) return diff;
		if (result1.id === result2.id) return 0;
		return result1.id > result2.id ? 1 : -1;
	});

	return { results: finalTableRows };
};

const getCompetitorName = (state: State, id: CompetitorId) =>
	getCompetitor(state, id)?.name ?? "";

const getCompetitor = (
	state: State,
	id: CompetitorId,
): Competitor | undefined => state.competitors.find((c) => c.id === id);
