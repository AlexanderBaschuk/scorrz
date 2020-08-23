import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/components/common/ControlPanel.styles";

import { ButtonGroupStyled } from "@/components/common/Button.styles";
import React from "react";
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
	return (
		<ControlPanelStyled>
			<ControlPanelTitleStyled>{title}</ControlPanelTitleStyled>
			<ButtonGroupStyled data-testid="rounds-selection">
				{rounds.map((round, id) => (
					<RoundsSelectionButton
						key={id}
						id={id}
						isSelected={isCumulative ? id <= selectedRound : id === selectedRound}
						onClick={selectRound}
					>
						{round}
					</RoundsSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
