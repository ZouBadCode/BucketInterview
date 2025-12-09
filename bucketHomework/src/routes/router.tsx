import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import { Home } from "../pages/home";
import { Story2 } from "../pages/story2";
import { Story3 } from "../pages/story3";
import { Stroy4 } from "../pages/story4";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "2", element: <Story2 /> },
            { path: "3", element: <Story3 />},
            { path: "4", element: <Stroy4 /> },
        ],
    },
]);