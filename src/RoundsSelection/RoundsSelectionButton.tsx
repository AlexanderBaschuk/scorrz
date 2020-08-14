import React, { useCallback } from "react";

export interface RoundsSelectionButtonProps {
	id: number;
	onClick: (id: number) => void;
}

export const RoundsSelectionButton: React.FC<RoundsSelectionButtonProps> = ({
	id,
	onClick,
	children,
}) => {
	const callback = useCallback(() => {
		onClick(id);
	}, [id, onClick]);
	return <button onClick={callback}>{children}</button>;
};
