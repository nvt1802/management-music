import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Pages/App'
import reportWebVitals from './reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import 'Translations'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from "redux-saga"
import rootReducers from 'Redux/Reducers'
import { rootSaga } from "Redux/Sagas"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducers, compose(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
