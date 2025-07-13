import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/UserAuthentication/Register/Register";
import Login from "../Pages/UserAuthentication/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRouter from "../Components/Private/PrivateRouter";
import Forbidden from "../Pages/Forbidden/Forbidden";
import MemberRoute from "../Components/Private/MemberRoute";
import ActivityLog from "../Pages/MemberRoutePages/ActivityLog";
import BookedTrainer from "../Pages/MemberRoutePages/BookedTrainer";
import Profile from "../Pages/MemberRoutePages/Profile";
import TrainerRoute from "../Components/Private/TrainerRouter";
import AddSlot from "../Pages/TrainerRoutePages/AddSlot";
import ManageSlot from "../Pages/TrainerRoutePages/ManageSlot";
import AdminRoute from "../Components/Private/AdminRoute";
import AllNewsletter from "../Pages/AdminRoutePages/AllNewsletter";
import AppliedTrainer from "../Pages/AdminRoutePages/AppliedTrainer";
import Balance from "../Pages/AdminRoutePages/Balance";
import NewClass from "../Pages/AdminRoutePages/NewClass";
import AllTrainerAdmin from "../Pages/AdminRoutePages/AllTrainerAdmin";
import BeATrainer from "../Pages/BeATrainer/BeATrainer";
import TrainerDetails from "../Pages/TrainerDetails/TrainerDetails";
import Payment from "../Components/Payment/Payment";
import AppliedTrainerDetails from "../Pages/AdminRoutePages/AppliedTrainerDetails";
import TrainerBooked from "../Pages/TrainerBooked/TrainerBooked";
import ForumsPage from "../Pages/Forums/ForumsPage";
import AddForum from "../Pages/Forums/AddForum";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'allTrainer',
                Component: AllTrainer
            },
            {
                path: 'trainerDetails/:id',
                Component: TrainerDetails
            },
            {
                path: 'bookTrainer/:id',
                element: <PrivateRouter><TrainerBooked></TrainerBooked></PrivateRouter>
            },
            {
                path: 'allClasses',
                Component: AllClasses
            },
            {
                path: 'forums',
                Component: ForumsPage
            },
            {
                path: 'beATrainer',
                element: <MemberRoute><BeATrainer></BeATrainer></MemberRoute>
            },
            {
                path: 'payment',
                element: <PrivateRouter><Payment /></PrivateRouter>
            }
            
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRouter> <DashboardLayout></DashboardLayout></PrivateRouter>,
        children:[
            {
                path: 'activityLog',
                element: <MemberRoute><ActivityLog></ActivityLog></MemberRoute>
            },
            {
                path: 'bookedTrainer',
                element: <MemberRoute><BookedTrainer></BookedTrainer></MemberRoute>
            },
            {
                path: 'profile',
                element: <MemberRoute><Profile></Profile></MemberRoute>
            },
            {
                path: 'trainer/addForum',
                element: <TrainerRoute><AddForum></AddForum></TrainerRoute>
            },
            {
                path: 'trainer/addSlot',
                element: <TrainerRoute><AddSlot></AddSlot></TrainerRoute>
            },
            {
                path: 'trainer/manageSlot',
                element: <TrainerRoute><ManageSlot></ManageSlot></TrainerRoute>
            },
            {
                path: 'admin/allNewsletter',
                element: <AdminRoute><AllNewsletter></AllNewsletter></AdminRoute>
            },
            {
                path: 'admin/allTrainer',
                element: <AdminRoute><AllTrainerAdmin></AllTrainerAdmin></AdminRoute>
            },
            {
                path: 'admin/appliedTrainer',
                element: <AdminRoute><AppliedTrainer></AppliedTrainer></AdminRoute>
            },
            {
                path: 'admin/appliedTrainer/:id',
                element: <AdminRoute><AppliedTrainerDetails></AppliedTrainerDetails></AdminRoute>
            },
            {
                path: 'admin/balance',
                element: <AdminRoute><Balance></Balance></AdminRoute>
            },
            {
                path: 'admin/addForum',
                element: <AdminRoute><AddForum></AddForum> </AdminRoute>
            },
            {
                path: 'admin/newClass',
                element: <AdminRoute><NewClass></NewClass></AdminRoute>
            },
            
        ]
    },
    {
        path: '/forbidden',
        Component: Forbidden
    }
])