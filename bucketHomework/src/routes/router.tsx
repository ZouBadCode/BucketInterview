import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import { Home } from "../pages/home";
import { Story2 } from "../pages/story2";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "2", element: <Story2 /> },
        ],
    },
]);