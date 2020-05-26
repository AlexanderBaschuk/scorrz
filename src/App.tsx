import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { createStore } from "redux";
import { initialState } from "./model/types";

const rootReducer = (state) => {
	return state;
};

const store = createStore(rootReducer, initialState);

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};
