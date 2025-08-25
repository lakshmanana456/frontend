import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import SearchProvider from './components/SearchContext.js'
import { CheckoutProvider } from './components/CheckoutContext.js'
import { CartProvider } from './components/CartContext.js'

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
