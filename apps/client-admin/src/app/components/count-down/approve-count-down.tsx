import React, { useMemo, useState } from 'react'
import { CountDown } from '.'
import moment from 'moment'
import _isNull from 'lodash/isNull'
import { Button } from 'antd'

const defaultBtn = {
  minWidth: '150px',
}
const AUTO_APPROVE_TIME = 30
interface ApproveCountDownProps {
  time: string
  onApprove: () => void
  onReject: () => void
  onRefresh: () => void
}
export const ApproveCountDownButton = (props: ApproveCountDownProps) => {
  const [isDisable, setIsDisable] = useState(false)

  const eventTime = useMemo(() => {
    return moment(props.time).add(AUTO_APPROVE_TIME, 'second')
  }, [props.time])

  const handleCountdown = count => {
    if (_isNull(count) || count === 0) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }

  return (
    <div>
      {isDisable && (
        <Button type="primary" onClick={props.onRefresh} style={defaultBtn}>
          Làm mới
        </Button>
      )}
      <div style={{ display: isDisable ? 'none' : 'block' }}>
        <Button type="primary" onClick={props.onApprove} disabled={isDisable} style={defaultBtn}>
          Chấp nhận
          <span style={{ marginLeft: '2px' }}>
            <CountDown eventTime={eventTime} onCountdown={handleCountdown} />
          </span>
        </Button>
        <Button onClick={props.onReject} disabled={isDisable} style={{ ...defaultBtn, marginTop: '2px', ...(isDisable ? {} : { backgroundColor: 'var(--danger)', color: 'var(--light)' }) }}>
          Từ chối
        </Button>
      </div>
    </div>
  )
}
