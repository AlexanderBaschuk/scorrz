import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { mainSaga } from "@/saga";
import { reducer } from "@/reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer,
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(mainSaga);

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Scorrz />
		</Provider>
	);
};
