import { createContext, useCallback, useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// The only file that knows the toast library. Components call notify()
// and never learn how (or with which library) the message is shown.
export const NotificationContext = createContext(null)

const TOAST_STYLE = {
  background: '#1a1d27',
  color: '#f3f4f6',
  border: '1px solid #2a2e3b',
  fontWeight: 600,
}

export function NotificationProvider({ children }) {
  // type: 'success' | 'info' | 'error'
  const notify = useCallback((message, { type = 'info' } = {}) => {
    if (type === 'success') return toast.success(message)
    if (type === 'error') return toast.error(message)
    return toast(message, { icon: '💔' })
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster position="bottom-right" toastOptions={{ duration: 2500, style: TOAST_STYLE }} />
    </NotificationContext.Provider>
  )
}
