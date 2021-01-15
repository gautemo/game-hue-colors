import { createI18n } from 'vue-i18n'
import { text } from './text'

const i18n = createI18n({
  locale: 'no',
  messages: text
})

export { i18n }