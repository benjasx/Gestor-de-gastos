import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ControlGatosApp } from './ControlGatosApp.jsx'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ControlGatosApp />
    </Provider>
  </StrictMode>,
)
