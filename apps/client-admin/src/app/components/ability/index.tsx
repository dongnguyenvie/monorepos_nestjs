import { selectMe } from 'app/redux/user/selectors'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'
import _isString from 'lodash/isString'

interface CanProps {
  children: React.ReactNode
  ability?: string | string[]
}
export const Can = (props: CanProps) => {
  const me = useSelector(selectMe)

  const isCan = useMemo(() => {
    const ability = props.ability || ''
    const scp = _get(me, 'scp', []) as string[]

    if (!ability) return true

    if (scp.includes('all')) return true

    if (_isString(ability)) {
      return scp.includes(ability)
    } else {
      return scp.some(role => ability.includes(role))
    }
  }, [me, props.ability])

  if (isCan) {
    return <>{props.children}</>
  }

  return null
}
