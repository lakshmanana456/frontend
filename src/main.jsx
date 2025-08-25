import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchProvider from './components/SearchContext.jsx'
import { CheckoutProvider } from './components/CheckoutContext.jsx'
import { CartProvider } from './components/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <CartProvider>
        <CheckoutProvider>
        <App />
        </CheckoutProvider>
      </CartProvider>
    </SearchProvider>
  </StrictMode>,
)
