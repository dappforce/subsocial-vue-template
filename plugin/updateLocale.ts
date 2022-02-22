import {
  I18N_DAYJS_RELATIVE_TIME_KEY,
  RelativeTimeProps,
  relativeTimeUnits,
  SubDate,
  SubsocialDateLocaleProps
} from '@subsocial/utils'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $updateDateLocal(lang: string): void
  }
}

const myPlugin: Plugin = (context, inject) => {
  const i18n = context.i18n
  inject('updateDateLocal', (lang: string) => {
    return updateDateLocal(lang)
  })

  function updateDateLocal (lang: string) {
    const subDateLocale: SubsocialDateLocaleProps = {
      localeName: lang,
      relativeTime: fillRelativeTime()
    }
    SubDate.updateLocale(subDateLocale)
    context.redirect(context.switchLocalePath(lang))
  }

  function fillRelativeTime () {
    const relativeTime = Object.assign({}, relativeTimeUnits)
    for (const key in relativeTimeUnits) {
      const unit = relativeTimeUnits[key as keyof RelativeTimeProps]
      relativeTime[key as keyof RelativeTimeProps] = i18n.t(combineI18nKey(key), { unit }) as string
    }

    return relativeTime
  }

  function combineI18nKey (key: string) {
    const BASE_I18N_KEY = I18N_DAYJS_RELATIVE_TIME_KEY
    return `${BASE_I18N_KEY}.${key}`
  }
}

export default myPlugin
