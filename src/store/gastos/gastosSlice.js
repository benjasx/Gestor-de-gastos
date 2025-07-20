import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isSaving: false,
  messageSaved: '',
  gastos: [],
  active: null,
}

export const gastosSlice = createSlice({
  name: 'gastos',
  initialState,
  reducers: {
    limpiarMessage: (state) => {
      state.messageSaved = ''
    },
    desactivarGasto: (state) => {
      state.active = null
    },
    isSavingNewCosto: (state) => {
      state.isSaving = true
      state.messageSaved = '';
    },
    addNewGasto: (state, action) => {
      state.gastos.push(action.payload)
      state.isSaving = false
      state.messageSaved = 'Gasto guardado correctamente'
    },
    setGastos: (state, action) => {
      state.isSaving = false;
      state.gastos = action.payload;
    },
    setSaveMessage: (state, action) => { 
      state.messageSaved = action.payload;
      state.isSaving = false; 
    },

  },
})

// Action creators are generated for each case reducer function
export const { addNewGasto, desactivarGasto, isSavingNewCosto, limpiarMessage, setGastos, setSaveMessage} = gastosSlice.actions
