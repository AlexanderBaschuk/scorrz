import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

const BUTTON_COLOR = "#ed7937";
const BORDER_COLOR = "#b55f2d";

export const RoundsSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) => (props.isSelected ? BUTTON_COLOR : "white")};
	color: ${(props) => (props.isSelected ? "white" : BUTTON_COLOR)};
	border-color: ${BORDER_COLOR};
	font-size: 1.2em;
`;
