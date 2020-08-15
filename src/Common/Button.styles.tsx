import styled from "@emotion/styled";

export const Button = styled.button`
	border: 1px solid;
	border-right: none;
	padding: 6px 20px;
	cursor: pointer;

	&:focus {
		outline: 0 !important;
	}

	&:first-child {
		border-radius: 3px 0 0 3px;
	}

	&:last-child {
		border-right-width: 1px;
		border-right-style: solid;
		border-radius: 0 3px 3px 0;
	}
`;

export const ButtonGroupStyled = styled.div`
	display: inline-block;
`;
