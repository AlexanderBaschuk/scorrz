import { call, delay, put } from "redux-saga/effects";

import { initResults } from "./actions";
import { testResultsDto } from "./testResultsDto";

function* loadResults() {
	yield delay(1000);
	yield put(initResults(testResultsDto));
}

export function* mainSaga() {
	yield call(loadResults);
}
