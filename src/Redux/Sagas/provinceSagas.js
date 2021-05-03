import { takeLatest, call, put } from "redux-saga/effects"
import * as actionTypes from 'Redux/Actions/actionTypes'

export function* watcherProvinceSaga() {
	yield takeLatest(actionTypes.PROVINCE_API_CALL_REQUEST, workerSaga)
}

function fetchProvinceData() {
	return []
}

function* workerSaga() {
	try {
		const response = yield call(fetchProvinceData)
		const data = response?.data?.results
		yield put({ type: actionTypes.PROVINCE_API_CALL_SUCCESS, data })
	} catch (error) {
		yield put({ type: actionTypes.PROVINCE_API_CALL_FAILURE, error })
	}
}