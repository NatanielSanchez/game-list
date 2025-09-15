import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Games from "./pages/Games";
import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
import PageNotFound from "./pages/PageNotFound";
import ErrorFallback from "./ui/ErrorFallback";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GameDetails from "./pages/GameDetails";
import UserList from "./pages/UserList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorFallback />,
      children: [
        { index: true, element: <Navigate replace to="/games" /> },
        {
          path: "/games",
          element: <Games />,
        },
        {
          path: "/games/:gameId",
          element: <GameDetails />,
        },
        {
          path: "/userList",
          element: <UserList />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // time until data re-fetch in miliseconds
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster
          position="bottom-left"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 6000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-200)",
              color: "var(--color-grey-900)",
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
