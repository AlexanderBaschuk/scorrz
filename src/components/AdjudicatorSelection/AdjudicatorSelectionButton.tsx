import React, { useCallback } from "react";

import { AdjudicatorSelectionButtonStyled } from "./AdjudicatorSelection.styles";

export interface AdjudicatorSelectionButtonProps {
	id: number;
	isSelected: boolean;
	onClick: (id: number) => void;
}

export const AdjudicatorSelectionButton: React.FC<AdjudicatorSelectionButtonProps> = ({
	id,
	isSelected,
	onClick,
	children,
}) => {
	const callback = useCallback(() => {
		onClick(id);
	}, [id, onClick]);
	return (
		<AdjudicatorSelectionButtonStyled
			onClick={callback}
			isSelected={isSelected}
		>
			{children}
		</AdjudicatorSelectionButtonStyled>
	);
};
