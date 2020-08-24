import React, { useCallback } from "react";

import { RoundsSelectionButtonStyled } from "./RoundsSelection.styles";

export interface RoundsSelectionButtonProps {
	id: number;
	isSelected?: boolean;
	isFocused?: boolean;
	handleClick: (id: number) => void;
	handleMouseEnter: (id: number) => void;
}

export const RoundsSelectionButton: React.FC<RoundsSelectionButtonProps> = ({
	id,
	isSelected,
	isFocused,
	handleClick,
	handleMouseEnter,
	children,
}) => {
	const callback = useCallback(() => {
		handleClick(id);
	}, [id, handleClick]);
	const enter = useCallback(() => {
		handleMouseEnter(id);
	}, [id, handleMouseEnter]);
	return (
		<RoundsSelectionButtonStyled
			onClick={callback}
			isSelected={isSelected}
			isFocused={isFocused}
			onMouseEnter={enter}
		>
			{children}
		</RoundsSelectionButtonStyled>
	);
};
