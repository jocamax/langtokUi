import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import "@mantine/carousel/styles.css"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Auth from "./auth"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      <MantineProvider>
        <SignedIn>
          {/* <Auth />  OVO JE PRIVREMENO, I OVO I SIGNED IN I SIGNED OUT*/}
          <App />
        </SignedIn>
        <SignedOut>
          {/* <Auth /> */}

          <App />
        </SignedOut>
      </MantineProvider>
    </ClerkProvider>
  </React.StrictMode>
)
