import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

const BUTTON_COLOR = "#f3ad63";
const HOVER_COLOR_SELECTED = "#f1a250;";
const HOVER_COLOR_UNSELECTED = "#fff6ed";

export const RoundsSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) => (props.isSelected ? BUTTON_COLOR : "white")};
	color: ${(props) => (props.isSelected ? "white" : BUTTON_COLOR)};
	font-size: 1.2em;

	&:hover {
		background-color: ${(props) =>
			props.isSelected ? HOVER_COLOR_SELECTED : HOVER_COLOR_UNSELECTED};
	}
`;
