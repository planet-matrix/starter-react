import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "./router"

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
