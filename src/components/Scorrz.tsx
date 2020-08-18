import { CompetitorId, CompetitorSelectionIndex } from "@/types";
import React, { useCallback, useEffect } from "react";
import {
	adjudicatorTablesSelector,
	adjudicatorsSelector,
	competitionTitleSelector,
	eventTitleSelector,
	finalTableSelector,
	roundsNamesSelector,
	selectedAdjudicatorsSelector,
	selectedCompetitorsSelector,
	selectedRoundsSelector,
} from "@/selectors";
import {
	loadState,
	toggleAdjudicator,
	toggleCompetitor,
	toggleRound,
} from "@/actions";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorSelection } from "./AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { CompetitionPageTitle } from "./CompetitionTitle/CompetitionPageTitle";
import { FinalTable } from "./FinalTable/FinalTable";
import { RoundsSelection } from "./RoundsSelection/RoundsSelection";
import { ScorrzStyled } from "./Scorrz.styles";
import { testResultsDto } from "@/testResultsDto";

export const Scorrz: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadState(testResultsDto));
	}, [dispatch]);

	const eventTitle = useSelector(eventTitleSelector);
	const competitionTitle = useSelector(competitionTitleSelector);
	const adjudicators = useSelector(adjudicatorsSelector);
	const rounds = useSelector(roundsNamesSelector);
	const selectedAdjudicators = useSelector(selectedAdjudicatorsSelector);
	const selectedRounds = useSelector(selectedRoundsSelector);

	const adjudicatorTables = useSelector(adjudicatorTablesSelector);
	const finalTable = useSelector(finalTableSelector);
	const selectedCompetitors = useSelector(selectedCompetitorsSelector);

	const toggleAdjudicatorInternal = useCallback(
		(id: number | null) => {
			dispatch(toggleAdjudicator(id));
		},
		[dispatch],
	);

	const toggleRoundInternal = useCallback(
		(id: number | null) => {
			dispatch(toggleRound(id));
		},
		[dispatch],
	);

	const getCompetitorSelectionIndex = useCallback(
		(id: CompetitorId): CompetitorSelectionIndex => {
			const index = selectedCompetitors.findIndex((value) => value === id);
			return index >= 0 ? index : null;
		},
		[selectedCompetitors],
	);

	const clickCompetitorRow = useCallback(
		(id: CompetitorId) => {
			dispatch(toggleCompetitor(id));
		},
		[dispatch],
	);

	return (
		<ScorrzStyled>
			<CompetitionPageTitle
				eventTitle={eventTitle}
				competitionTitle={competitionTitle}
			/>
			<AdjudicatorSelection
				adjudicators={adjudicators}
				selectedAdjudicators={selectedAdjudicators}
				toggleAdjudicator={toggleAdjudicatorInternal}
			/>
			<RoundsSelection
				rounds={rounds}
				selectedRounds={selectedRounds}
				toggleRound={toggleRoundInternal}
			/>
			{adjudicatorTables.map(
				(adjResults, i) =>
					adjResults && (
						<AdjudicatorTable
							key={i}
							adjudicatorName={adjResults.adjudicatorName}
							selectedRounds={selectedRounds}
							rounds={adjResults.rounds}
							resultRows={adjResults.resultRows}
							getCompetitorSelectionIndex={getCompetitorSelectionIndex}
							clickCompetitorRow={clickCompetitorRow}
						/>
					),
			)}
			{finalTable && (
				<FinalTable
					results={finalTable.results}
					getCompetitorSelectionIndex={getCompetitorSelectionIndex}
					clickCompetitorRow={clickCompetitorRow}
				/>
			)}
		</ScorrzStyled>
	);
};
