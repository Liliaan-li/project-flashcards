import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import './styles/index.scss'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
