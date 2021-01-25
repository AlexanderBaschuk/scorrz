import { call, put, takeLatest } from "redux-saga/effects";
import {
	initResultsFailure,
	initResultsRequest,
	initResultsSuccess,
} from "./actions";

function* loadResults(action) {
	const response: Response = yield call(fetch, action.payload);
	try {
		if (response.ok) {
			const resultsDto = yield call([response, response.json]);
			yield put(initResultsSuccess(resultsDto));
		} else {
			const message = "HTTP error: " + response.status;
			console.error(message);
			yield put(initResultsFailure(message));
		}
	} catch (error) {
		console.error(error);
		yield put(initResultsFailure(error.message));
	}
}

export function* mainSaga() {
	yield takeLatest([initResultsRequest], loadResults);
	//yield put(initResultsRequest("./results/SpbFeis2019_IntermediateCup_9-16.json"));
	//yield put(initResultsRequest("./results/SpbFeis2019_Open_16-27.json"));
	//yield put(initResultsRequest("./results/ComFeis2020_Open_17-26.json"));
	//yield put(initResultsRequest("./results/MoscowFeis2019_Open_10-20.json"));
	yield put(initResultsRequest("./results/2021_Online_Feis.json"));
}
