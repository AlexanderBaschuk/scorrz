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
	selectedChampionshipRoundSelector,
	selectedRoundSelector,
} from "@/selectors";
import {
	initResultsRequest,
	selectChampionshipRound,
	selectRound,
	toggleAdjudicator,
} from "@/actions";
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
	const selectedChampionshipRound = useSelector(
		selectedChampionshipRoundSelector,
	);
	const selectedRound = useSelector(selectedRoundSelector);

	const adjudicatorTables = useSelector(adjudicatorTablesSelector);
	const finalTable = useSelector(finalTableSelector);

	const toggleAdjudicatorInternal = useCallback(
		(id: number | null) => {
			dispatch(toggleAdjudicator(id));
		},
		[dispatch],
	);

	const selectRoundInternal = useCallback(
		(id: number) => {
			dispatch(selectRound(id));
		},
		[dispatch],
	);

	const selectChampionshipRoundInternal = useCallback(
		(id: number) => {
			dispatch(selectChampionshipRound(id));
		},
		[dispatch],
	);

	const loadChampionship = useCallback(
		(filename: string) => {
			dispatch(initResultsRequest(`./results/${filename}.json`));
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
			<div>
				<a
					href="#"
					onClick={() => loadChampionship("SpbFeis2019_IntermediateCup_9-16")}
				>
					SPb 2019 Preliminary
				</a>
			</div>
			<div>
				<a href="#" onClick={() => loadChampionship("SpbFeis2019_Open_16-27")}>
					SPb 2019 Open
				</a>
			</div>
			<div>
				<a
					href="#"
					onClick={() => loadChampionship("MoscowFeis2019_Open_10-20")}
				>
					Moscow Feis 2019
				</a>
			</div>
			<div>
				<a href="#" onClick={() => loadChampionship("ComFeis2020_Open_17-26")}>
					CoM Feis 2020
				</a>
			</div>
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
				title="Rounds: "
				isCumulative={false}
				rounds={rounds}
				selectedRound={selectedRound}
				selectRound={selectRoundInternal}
			/>
			<RoundsSelection
				title="Championship: "
				isCumulative={true}
				rounds={rounds}
				selectedRound={selectedChampionshipRound}
				selectRound={selectChampionshipRoundInternal}
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
