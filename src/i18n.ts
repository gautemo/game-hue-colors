import { createI18n } from 'vue-i18n'
import { text } from './text'

const i18n = createI18n({
  locale: localStorage.getItem('locale') ?? 'no',
  messages: text
})

const changeLocale = (locale: 'no' | 'nl') => {
  i18n.global.locale = locale
  localStorage.setItem('locale', locale)
}

export { i18n, changeLocale }