export const STORAGE_KEYS = {
  accountId: 'accountId'
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
}
