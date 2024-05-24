import React, { lazy, Suspense } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import AuthProvider from "./Auth/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeContext";
import PrivateRoute from "./Auth/PrivateRoute";
import Error404 from "./components/FunctionalComponents/Error404";
import Loader from "./components/FunctionalComponents/Loader";

const Root = lazy(() => import("./Pages/Root"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AddService = lazy(() => import("./Pages/AddService"));
const Services = lazy(() => import("./Pages/Services"));
const ServiceDetails = lazy(() => import("./Pages/ServiceDetails"));
const ManageServices = lazy(() => import("./Pages/ManageServices"));
const UpdateService = lazy(() => import("./Pages/UpdateService"));
const BookingConfirmation = lazy(() => import("./Pages/BookingConfirmation"));
const Bookings = lazy(() => import("./Pages/Bookings"));
const HomeBody = lazy(() => import("./components/HomeBody/HomeBody"));
const ToDo = lazy(() => import("./Pages/ToDo/ToDo"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error404></Error404>,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<Loader />}>
                        <HomeBody></HomeBody>
                    </Suspense>
                ),
            },
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login></Login>
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Register></Register>
                    </Suspense>
                ),
            },
            {
                path: "/allservices",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Services></Services>
                    </Suspense>
                ),
            },
            {
                path: "/services/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ServiceDetails></ServiceDetails>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/booking-confirmation/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <BookingConfirmation></BookingConfirmation>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-bookings",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <Bookings></Bookings>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/add-service",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <AddService></AddService>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/manage-services",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ManageServices></ManageServices>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/service/edit/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <UpdateService></UpdateService>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/to-do",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ToDo></ToDo>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
