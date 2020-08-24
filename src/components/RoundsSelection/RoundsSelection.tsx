import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/components/common/ControlPanel.styles";
import React, { useCallback, useState } from "react";

import { ButtonGroupStyled } from "@/components/common/Button.styles";
import { RoundsSelectionButton } from "./RoundsSelectionButton";

export interface RoundsSelectionProps {
	title: string;
	isCumulative: boolean;
	rounds: string[];
	selectedRound?: number;
	selectRound: (id: number) => void;
}

export const RoundsSelection: React.FC<RoundsSelectionProps> = ({
	title,
	isCumulative,
	rounds,
	selectedRound,
	selectRound,
}) => {
	const [focusedRound, setFocusedRound] = useState<number | undefined>();
	const handleButtonFocus = useCallback((id: number) => {
		setFocusedRound(id);
	}, []);
	const handleUnfocus = useCallback(() => {
		setFocusedRound(undefined);
	}, []);
	return (
		<ControlPanelStyled>
			<ControlPanelTitleStyled>{title}</ControlPanelTitleStyled>
			<ButtonGroupStyled
				data-testid="rounds-selection"
				onMouseLeave={handleUnfocus}
			>
				{rounds.map((round, id) => (
					<RoundsSelectionButton
						key={id}
						id={id}
						isSelected={
							isCumulative ? id <= selectedRound : id === selectedRound
						}
						isFocused={
							isCumulative
								? focusedRound !== undefined && id <= focusedRound
								: id === focusedRound
						}
						handleClick={selectRound}
						handleMouseEnter={handleButtonFocus}
					>
						{round}
					</RoundsSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
