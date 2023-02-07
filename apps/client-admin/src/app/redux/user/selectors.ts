import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'
import { initialState } from './slice'

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.me || initialState

export const selectLoadingMe = createSelector([selectDomain], state => state.loadingMeData)
export const selectMe = createSelector([selectDomain], state => state)
export const selectFetchMe = createSelector([selectDomain], state => state.isFetch)
