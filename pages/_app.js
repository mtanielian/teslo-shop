import { SessionProvider } from "next-auth/react"
import { AuthContextProvider } from '../contexts/AuthContext'
import { UiContextProvider } from '../contexts/UiContext'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CartContextProvider } from '../contexts/CartContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import lightTheme  from '../themes/lightTheme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <SessionProvider options={{ 'client-id' : process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
      <PayPalScriptProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <UiContextProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
