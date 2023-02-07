import { useMeStore } from 'app/redux/user'
import { useMemo } from 'react'
import { authentication } from '../authentication'

export function useGuard(props: { isAuth: boolean }) {
  const { isMeLoading, me, isFetchMe } = useMeStore()
  const { isAuth } = props

  const isExpired = authentication.isExpired()
  const isNext = useMemo(() => {
    return !(isAuth && isFetchMe && !isMeLoading && !me.id && isExpired)
  }, [isAuth, isExpired, isFetchMe, isMeLoading, me.id])
  return {
    isNext,
    me,
  }
}
