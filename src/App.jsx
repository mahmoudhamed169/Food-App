import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from './modules/Shared/Components/AuthLayout/AuthLayout';
import Login from './modules/Authentication/Components/Login/Login';
import Register from './modules/Authentication/Components/Register/Register';
import ResetPass from './modules/Authentication/Components/ResetPass/ResetPass';
import ForgetPass from './modules/Authentication/Components/ForgetPass/ForgetPass';
import MasterLayout from './modules/Shared/Components/MasterLayout/MasterLayout';
import Home from './modules/Home/Components/Home/Home';
import RecipesList from './modules/Recipes/Components/RecipesList/RecipesList';
import CategoriesList from './modules/Categories/Components/CategoriesList/CategoriesList';
import UsersList from './modules/Users/Components/UsersList/UsersList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "resetPass", element: <ResetPass /> },
        { path: "forgetPass", element: <ForgetPass /> }
      ]
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "recipestList", element: <RecipesList /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />

      <ToastContainer />
    </>
  );
};

export default App;
