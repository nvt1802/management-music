import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Components/App'
import reportWebVitals from './reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import 'Translations'

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
)

reportWebVitals()
