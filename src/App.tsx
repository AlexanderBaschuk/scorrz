import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./model/types";

const rootReducer = (state) => {
	return state;
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};
