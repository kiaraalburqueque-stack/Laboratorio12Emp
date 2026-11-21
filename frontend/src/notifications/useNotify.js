import { useContext } from 'react'
import { NotificationContext } from './NotificationProvider'

// Custom hook: any component under NotificationProvider gets notify().
export function useNotify() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used inside <NotificationProvider>')
  }
  return context.notify
}
