import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { useInjectReducer } from 'utils/redux-injectors'
import { IContainerState, IMe } from './types'

export const initialState: IContainerState = {
  id: undefined,
  username: '',
  scp: [],
  email: '',
  sub: undefined,
  loadingMeData: false,
  isFetch: false,
}

const slice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    fetchLoginUser(state, action: PayloadAction) {
      state.isFetch = true
      state.loadingMeData = true
    },
    loginUserDataLoaded(state, action: PayloadAction<{ me: Partial<IMe> }>) {
      const { me } = action.payload
      Object.assign(state, { loadingMeData: false }, me)
    },
    loginUserDataError(state, action: PayloadAction<{ error: any | string }>) {},
    refreshUserData(state) {},
  },
})

export const { actions, reducer, name: sliceKey } = slice

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  return { actions: slice.actions }
}
