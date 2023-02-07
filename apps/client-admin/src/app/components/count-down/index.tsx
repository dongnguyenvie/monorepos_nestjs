import React, { useEffect, useMemo, useState } from 'react'
import { useInterval } from 'react-use'
import moment from 'moment'
import _isNull from 'lodash/isNull'
import _isString from 'lodash/isString'
import _padStart from 'lodash/padStart'

interface CountDownProps {
  eventTime: moment.Moment | string
  onCountdown: (count: any) => void
}
export const CountDown = (props: CountDownProps) => {
  const [countdown, setCountdown] = useState<any>(null)

  const eventTime = useMemo(() => {
    return _isString(props.eventTime) ? moment(props.eventTime) : props.eventTime
  }, [props.eventTime])

  const isStop = useMemo(() => (!_isNull(countdown) && countdown! >= 0 ? null : 1000), [countdown])

  useEffect(() => {
    props.onCountdown(countdown)
  }, [countdown])

  useInterval(() => {
    let _countdown = moment().utc().diff(eventTime, 'seconds') as any
    console.log(_countdown)
    if (_countdown > 0) {
      _countdown = 0
    }
    setCountdown(_countdown)
  }, isStop)

  return !_isNull(countdown) && countdown !== 0 ? (
    <span>
      {'( '}
      {_padStart(Math.abs(countdown).toString(), 2, '0')}
      {' )'}
    </span>
  ) : (
    <span></span>
  )
}
