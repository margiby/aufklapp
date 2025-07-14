import { ReactElement, lazy } from "react";
import { LocaleContextProvider} from "./hooks/Context";
import { createBrowserRouter, RouterProvider } from "react-router";

// Seitenkomponenten mit React.lazy importieren
const RootLayout = lazy(() => import('./components/RootLayout'));
const HomePage = lazy(() => import('./components/Content/HomePage')); 
const UploadPage = lazy(() => import('./components/Content/UploadPage'));
const ApiPage = lazy(() => import('./components/Content/ApiPage'));

// Konfiguration des Routers mit createBrowserRouter
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "upload", element: <UploadPage /> },
        { path: "api", element: <ApiPage /> },
      ],
    },
  ],
  { basename: import.meta.env.VITE_BASENAME }
);

// Die Haupt-App-Komponente
const App = (): ReactElement => (
  <LocaleContextProvider>
    <RouterProvider router={router} />
  </LocaleContextProvider>
);

export default App;
