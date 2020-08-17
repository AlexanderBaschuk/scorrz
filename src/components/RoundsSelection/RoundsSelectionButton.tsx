import React, { useCallback } from "react";

import { RoundsSelectionButtonStyled } from "./RoundsSelection.styles";

export interface RoundsSelectionButtonProps {
	id: number;
	isSelected: boolean;
	onClick: (id: number) => void;
}

export const RoundsSelectionButton: React.FC<RoundsSelectionButtonProps> = ({
	id,
	isSelected,
	onClick,
	children,
}) => {
	const callback = useCallback(() => {
		onClick(id);
	}, [id, onClick]);
	return (
		<RoundsSelectionButtonStyled onClick={callback} isSelected={isSelected}>
			{children}
		</RoundsSelectionButtonStyled>
	);
};
