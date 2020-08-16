import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

const BUTTON_COLOR = "#00a3d8";
const HOVER_COLOR_SELECTED = "#0097c7";
const HOVER_COLOR_UNSELECTED = "#ebf5f9";

export const AdjudicatorSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) => (props.isSelected ? BUTTON_COLOR : "white")};
	color: ${(props) => (props.isSelected ? "white" : BUTTON_COLOR)};
	font-size: 1.2em;

	&:hover {
		background-color: ${(props) =>
			props.isSelected ? HOVER_COLOR_SELECTED : HOVER_COLOR_UNSELECTED};
	}
`;
