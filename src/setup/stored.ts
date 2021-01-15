type Stored = 'ip' | 'user' | 'light'

const getStored = (key: Stored) => localStorage.getItem(key)

const setStored = (key: Stored, value: string) => localStorage.setItem(key, value)

const clearStored = (key: Stored) => localStorage.removeItem(key)

export { getStored, setStored, clearStored }