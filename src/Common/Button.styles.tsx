import styled from "@emotion/styled";

export const Button = styled.button`
	border-top: 1px solid;
	border-bottom: 1px solid;
	border-left: 1px solid;
	border-right: none;
	padding: 10px 20px;
	cursor: pointer;
	font-size: 1em;

	&:focus {
		outline: 0;
	}

	&:first-child {
		border-radius: 3px 0 0 3px;
	}

	&:last-child {
		border-right: 1px solid;
		border-radius: 0 3px 3px 0;
	}
`;

export const ButtonGroupStyled = styled.div`
	display: inline-block;
`;
