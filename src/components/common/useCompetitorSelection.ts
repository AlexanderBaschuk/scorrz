import { CompetitorId, CompetitorSelectionIndex } from "@/types";
import { useDispatch, useSelector } from "react-redux";

import { selectedCompetitorsSelector } from "@/selectors";
import { toggleCompetitor } from "@/actions";
import { useCallback } from "react";

interface UseCompetitorSelectionResult {
	getCompetitorSelectionIndex: (CompetitorId) => CompetitorSelectionIndex;
	selectCompetitor: (CompetitorId) => void;
}

export const useCompetitorSelection = (): UseCompetitorSelectionResult => {
	const dispatch = useDispatch();

	const selectedCompetitors = useSelector(selectedCompetitorsSelector);

	const getCompetitorSelectionIndex = useCallback(
		(id: CompetitorId): CompetitorSelectionIndex => {
			const index = selectedCompetitors.findIndex((value) => value === id);
			return index >= 0 ? index : null;
		},
		[selectedCompetitors],
	);

	const selectCompetitor = useCallback(
		(id: CompetitorId) => {
			dispatch(toggleCompetitor(id));
		},
		[dispatch],
	);

	return { getCompetitorSelectionIndex, selectCompetitor };
};
