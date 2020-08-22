import { CompetitorId, CompetitorSelectionIndex } from "@/types";
import { focusCompetitor, toggleCompetitor } from "@/actions";
import {
	focusedCompetitorSelector,
	selectedCompetitorsSelector,
} from "@/selectors";
import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";

interface UseCompetitorSelectionResult {
	getCompetitorSelectionIndex: (CompetitorId) => CompetitorSelectionIndex;
	isFocused: (CompetitorId) => boolean;
	selectCompetitor: (CompetitorId) => void;
	hoverCompetitor: (CompetitorId?) => void;
}

export const useCompetitorSelection = (): UseCompetitorSelectionResult => {
	const dispatch = useDispatch();

	const selectedCompetitors = useSelector(selectedCompetitorsSelector);
	const focusedCompetitor = useSelector(focusedCompetitorSelector);

	const getCompetitorSelectionIndex = useCallback(
		(id: CompetitorId): CompetitorSelectionIndex => {
			const index = selectedCompetitors.findIndex((value) => value === id);
			return index >= 0 ? index : null;
		},
		[selectedCompetitors],
	);

	const isFocused = useCallback(
		(id: CompetitorId): boolean => focusedCompetitor === id,
		[focusedCompetitor],
	);

	const selectCompetitor = useCallback(
		(id: CompetitorId) => {
			dispatch(toggleCompetitor(id));
		},
		[dispatch],
	);

	const hoverCompetitor = useCallback(
		(id: CompetitorId) => {
			dispatch(focusCompetitor(id));
		},
		[dispatch],
	);


	return { getCompetitorSelectionIndex, isFocused, selectCompetitor, hoverCompetitor };
};
