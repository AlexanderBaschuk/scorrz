import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../redux/reducer";

const store = configureStore({
	reducer,
});

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};
