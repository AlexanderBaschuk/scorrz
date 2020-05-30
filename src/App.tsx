import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { configureStore } from "redux-toolkit";
import { initialState } from "./model/types";

const rootReducer = (state) => {
	return state;
};

// const store = createStore(rootReducer, initialState);
const store = configureStore(rootReducer, initialState);

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};
