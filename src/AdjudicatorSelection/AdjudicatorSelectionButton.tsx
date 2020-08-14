import React, { useCallback } from "react";

export interface AdjudicatorSelectionButtonProps {
	id: number;
	onClick: (id: number) => void;
}

export const AdjudicatorSelectionButton: React.FC<AdjudicatorSelectionButtonProps> = ({
	id,
	onClick,
	children,
}) => {
	const callback = useCallback(() => {
		onClick(id);
	}, [id, onClick]);
	return <button onClick={callback}>{children}</button>;
};
