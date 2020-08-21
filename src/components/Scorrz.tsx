import React, { useCallback } from "react";
import {
	adjudicatorTablesSelector,
	finalTableSelector,
} from "@/resultsSelectors";
import {
	adjudicatorsSelector,
	competitionTitleSelector,
	errorMessageSelector,
	eventTitleSelector,
	loadingSelector,
	roundsNamesSelector,
	selectedAdjudicatorsSelector,
	selectedRoundsSelector,
} from "@/selectors";
import { toggleAdjudicator, toggleRound } from "@/actions";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorSelection } from "./AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTableWrapper } from "./AdjudicatorTable/AdjudicatorTableWrapper";
import { CompetitionPageTitle } from "./CompetitionTitle/CompetitionPageTitle";
import { FinalTableWrapper } from "./FinalTable/FinalTableWrapper";
import { RoundsSelection } from "./RoundsSelection/RoundsSelection";
import { ScorrzStyled } from "./Scorrz.styles";

export const Scorrz: React.FC = () => {
	const dispatch = useDispatch();

	const isLoading = useSelector(loadingSelector);
	const errorMessage = useSelector(errorMessageSelector);
	const eventTitle = useSelector(eventTitleSelector);
	const competitionTitle = useSelector(competitionTitleSelector);
	const adjudicators = useSelector(adjudicatorsSelector);
	const rounds = useSelector(roundsNamesSelector);
	const selectedAdjudicators = useSelector(selectedAdjudicatorsSelector);
	const selectedRounds = useSelector(selectedRoundsSelector);

	const adjudicatorTables = useSelector(adjudicatorTablesSelector);
	const finalTable = useSelector(finalTableSelector);

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

	if (isLoading) {
		return <>Loading...</>;
	}

	if (errorMessage !== undefined) {
		return <>{errorMessage}</>;
	}

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
						<AdjudicatorTableWrapper key={i} tableView={adjResults} />
					),
			)}
			{finalTable && <FinalTableWrapper tableView={finalTable} />}
		</ScorrzStyled>
	);
};
