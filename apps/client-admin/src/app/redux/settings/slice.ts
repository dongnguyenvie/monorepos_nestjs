import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { IContainerState } from './types'
import { AppSettings } from 'types/Utils'
import { onAppSettings } from 'utils/helpers'

export const initialState: IContainerState = {
  ...onAppSettings.get(),
  isLocalMapping: false,
}

const CategorySlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateCurrentPath(state, action: PayloadAction<{ path: string }>) {
      const { path } = action.payload
      state.path = path
    },
    localMappingLoaded(state) {
      state.isLocalMapping = true
    },
    updateMenu(state, action: PayloadAction<{ menu: any }>) {
      const { menu } = action.payload
      state.dashboard.menu = menu
    },
    updateSettings(state, action: PayloadAction<Partial<AppSettings> & Partial<AppSettings['dashboard']>>) {
      const { dashboard, path, theme, menu } = action.payload
      if (menu) {
        state.dashboard.menu = menu
      }
      if (theme) {
        state.theme = theme
      }
      if (path) {
        state.path = path
      }
      if (dashboard) {
        state.dashboard = dashboard
      }
      onAppSettings.set({ ...state, isLocalMapping: false })
    },
    loadedSettings(state, action: PayloadAction<{ settings: any }>) {
      const { settings } = action.payload
      state.settings = settings
    },
  },
})

export const { actions, reducer, name: sliceKey } = CategorySlice
