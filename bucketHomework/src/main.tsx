import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { SuiProvider } from './providers/sui-provider.tsx'
import '@mysten/dapp-kit/dist/index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuiProvider>
      <RouterProvider router={router} />
    </SuiProvider>
  </StrictMode>,
)
