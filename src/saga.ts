import { call, delay, put } from "redux-saga/effects";

import { initResults } from "./actions";
import { testResultsDto } from "./testResultsDto";

function* loadResults() {
	console.log("Loading results");
	yield delay(1000);
	yield put(initResults(testResultsDto));
	console.log("Loaded results");
}

export function* mainSaga() {
	yield call(loadResults);
}
