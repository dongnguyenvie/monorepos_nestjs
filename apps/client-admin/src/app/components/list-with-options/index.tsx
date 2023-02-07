import React, { useEffect } from 'react'
import { useMemo, useState } from 'react'
import { Select } from 'antd'
import { TABLE_DROPDOWN_OPTIONS } from 'utils/constants'
import { selectMe } from 'app/redux/user/selectors'
import { useSelector } from 'react-redux'

const { Option } = Select

interface ListWithOptionsProps {
  onChange: (...payload) => void
  isDeletedList: boolean
}
export const ListWithOptions = (props: ListWithOptionsProps) => {
  const me = useSelector(selectMe)
  const [dropdownOpt, setDropdownOpt] = useState(TABLE_DROPDOWN_OPTIONS.active.value)
  const tableDropDownOtps = useMemo(() => {
    return Object.values(TABLE_DROPDOWN_OPTIONS)
      .filter(o => {
        if (o.value === 1) {
          return !!props.isDeletedList || me.scp?.includes('all')
        }
        return true
      })
      .map(otps => ({ key: otps.value, title: otps.label }))
  }, [props])

  useEffect(() => {
    props.onChange(dropdownOpt)
  }, [dropdownOpt])

  return (
    <Select defaultValue={dropdownOpt} style={{ width: 200 }} onChange={setDropdownOpt}>
      {tableDropDownOtps.map(opt => (
        <Option value={opt.key} key={opt.key}>
          {opt.title}
        </Option>
      ))}
    </Select>
  )
}
