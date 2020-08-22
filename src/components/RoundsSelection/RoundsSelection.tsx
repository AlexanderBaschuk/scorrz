import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/components/common/ControlPanel.styles";

import { ButtonGroupStyled } from "@/components/common/Button.styles";
import React from "react";
import { RoundsSelectionButton } from "./RoundsSelectionButton";

export interface RoundsSelectionProps {
	rounds: string[];
	roundGroups: string[];
	selectedRound?: number;
	selectedRoundGroup?: number;
	selectRound: (id: number) => void;
	selectRoundGroup: (id: number) => void;
}

export const RoundsSelection: React.FC<RoundsSelectionProps> = ({
	rounds,
	roundGroups,
	selectedRound,
	selectedRoundGroup,
	selectRound,
	selectRoundGroup,
}) => {
	return (
		<ControlPanelStyled>
			<ControlPanelTitleStyled>Rounds: </ControlPanelTitleStyled>
			<ButtonGroupStyled data-testid="rounds-selection">
				{rounds.map((round, id) => (
					<RoundsSelectionButton
						key={id}
						id={id}
						isSelected={selectedRound === id}
						onClick={selectRound}
					>
						{round}
					</RoundsSelectionButton>
				))}
				{roundGroups.map((group, id) => (
					<RoundsSelectionButton
						key={id}
						id={id}
						isSelected={selectedRoundGroup === id}
						onClick={selectRoundGroup}
					>
						{group}
					</RoundsSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
