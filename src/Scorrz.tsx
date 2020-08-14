import React, { useCallback, useEffect } from "react";
import {
	adjudicatorTablesSelector,
	adjudicatorsSelector,
	finalTableSelector,
	roundsNamesSelector,
	selectedAdjudicatorsSelector,
	selectedRoundsSelector,
} from "./Scorrz.selectors";
import { calculate, toggleAdjudicator, toggleRound } from "./actions";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorSelection } from "./AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "./FinalTable/FinalTable";
import { RoundsSelection } from "./RoundsSelection/RoundsSelection";
import { ScorrzStyled } from "./Scorrz.styles";

export const Scorrz: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculate());
	}, [dispatch]);

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

	return (
		<ScorrzStyled>
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
						/>
					),
			)}
			{finalTable && <FinalTable results={finalTable.results} />}
		</ScorrzStyled>
	);
};
