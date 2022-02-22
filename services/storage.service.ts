export const STORAGE_KEYS = {
  accountId: 'accountId',
  spaceId: 'spaceId',
  lang: 'lang'
}

export default class StorageService {
  setCurrentAccountId (id: string) {
    localStorage.setItem(STORAGE_KEYS.accountId, id)
  }

  getAccountId () {
    return localStorage.getItem(STORAGE_KEYS.accountId)
  }

  removeAccountId () {
    localStorage.removeItem(STORAGE_KEYS.accountId)
  }

  setCurrentSpaceId (id: string) {
    localStorage.setItem(STORAGE_KEYS.spaceId, id)
  }

  getCurrentSpaceId (): string {
    return localStorage.getItem(STORAGE_KEYS.spaceId) || ''
  }
  
  setSelectedLanguage (lang: string) {
    localStorage.setItem(STORAGE_KEYS.lang, lang)
  }

  getSelectedLanguage () {
    return localStorage.getItem(STORAGE_KEYS.lang)
  }
}
