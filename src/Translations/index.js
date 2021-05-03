import i18next from 'i18next'
import common_en from "Translations/en/common.json"
import common_vn from "Translations/vn/common.json"
import signin_en from "Translations/en/signin.json"
import signin_vn from "Translations/vn/signin.json"
import signup_en from "Translations/en/signup.json"
import signup_vn from "Translations/vn/signup.json"
import forgot_password_en from "Translations/en/forgot-password.json"
import forgot_password_vn from "Translations/vn/forgot-password.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: `${localStorage.getItem('lng') || 'vn'}`,
  resources: {
    en: {
      common: common_en,
      signin: signin_en,
      signup: signup_en,
      forgot_password: forgot_password_en
    },
    vn: {
      common: common_vn,
      signin: signin_vn,
      signup: signup_vn,
      forgot_password: forgot_password_vn
    },
  },
})