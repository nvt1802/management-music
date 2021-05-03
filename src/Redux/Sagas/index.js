import { fork } from "redux-saga/effects"
import { watcherProvinceSaga } from 'Redux/Sagas/provinceSagas'

export function* rootSaga() {
    yield fork(watcherProvinceSaga)
}