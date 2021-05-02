import i18next from 'i18next'
import common_en from "Translations/en/common.json"
import common_vn from "Translations/vn/common.json"
import signin_en from "Translations/en/signin.json"
import signin_vn from "Translations/vn/signin.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: `${localStorage.getItem('lng') || 'vn'}`,
  resources: {
    en: {
      common: common_en,
      signin: signin_en
    },
    vn: {
      common: common_vn,
      signin: signin_vn
    },
  },
})