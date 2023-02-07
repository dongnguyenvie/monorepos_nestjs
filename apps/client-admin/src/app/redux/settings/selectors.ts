import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'
import { initialState } from './slice'

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.settings || initialState

export const selectIsLocalMapping = createSelector([selectDomain], state => state.isLocalMapping)
export const selectTheme = createSelector([selectDomain], state => state.theme)
export const selectCurrentPath = createSelector([selectDomain], state => state.path)
export const selectDashboard = createSelector([selectDomain], state => state.dashboard)
export const selectSettings = createSelector([selectDomain], state => state.settings)
