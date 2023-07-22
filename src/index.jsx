import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import "./index.css"

import { Home, Login,
    loginLoader, loginAction,
    NotFound, About } from "./pages"

import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail"

import {
    Dashboard, dashboardLoader,
    HostVans, Reviews, Income,
    HostVanDetail, hostVansLoader, hostVanDetailLoader,
    HostVanPricing, HostVanInfo, HostVanPhotos,
} from "./pages/Host"

import {Layout, HostLayout, Error} from "./components"
import { requireAuth } from "./utils"

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
            path="login"
            element={<Login />}
            loader={loginLoader}
            action={loginAction}
        />
        <Route
            path="vans"
            element={<Vans />}
            errorElement={<Error />}
            loader={vansLoader}
        />
        <Route
            path="vans/:id"
            errorElement={<Error />}
            element={<VanDetail />}
            loader={vanDetailLoader}
        />

        <Route path="host" element={<HostLayout />}>
            <Route
                index
                element={<Dashboard />}
                loader={dashboardLoader}
            />
            <Route
                path="income"
                element={<Income />}
                loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
                path="reviews"
                element={<Reviews />}
                loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
                path="vans"
                errorElement={<Error />}
                element={<HostVans />}
                loader={hostVansLoader}
            />
            <Route
                path="vans/:id"
                errorElement={<Error />}
                element={<HostVanDetail />}
                loader={hostVanDetailLoader}
            >
                <Route
                    index
                    element={<HostVanInfo />}
                    loader={async ({ request }) => await requireAuth(request)}
                />
                <Route
                    path="pricing"
                    element={<HostVanPricing />}
                    loader={async ({ request }) => await requireAuth(request)}
                />
                <Route
                    path="photos"
                    element={<HostVanPhotos />}
                    loader={async ({ request }) => await requireAuth(request)}
                />
            </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    )
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);