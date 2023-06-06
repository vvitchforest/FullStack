import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      state = action.payload
      const filter = state
      return filter
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer