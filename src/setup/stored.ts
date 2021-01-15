type Stored = 'ip' | 'user' | 'light'

const getStored = (key: Stored) => localStorage.getItem(key)

const setStored = (key: Stored, value: string) => localStorage.setItem(key, value)

export { getStored, setStored }