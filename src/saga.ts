import { call, delay, put } from "redux-saga/effects";

import { loadState } from "./actions";
import { testResultsDto } from "./testResultsDto";

function* loadResults() {
	console.log("Loading results");
	yield delay(1000);
	yield put(loadState(testResultsDto));
	console.log("Loaded results");
}

export function* mainSaga() {
	yield call(loadResults);
}
