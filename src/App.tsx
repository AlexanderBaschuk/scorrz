import { initialState, testInitialState } from "./model/types";

import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = (state) => {
	return state;
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: testInitialState,
});

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};