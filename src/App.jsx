import { useState } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
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

import ProtectedRoute from './modules/Shared/Components/ProtectedRoute/ProtectedRoute';
import RecipesData from './modules/Recipes/Components/RecipesData/RecipesData';
import VerifyAcount from './modules/Authentication/Components/VerifyAcount/VerifyAcount';
import NotFound from './modules/Shared/Components/NotFound/NotFound';
import { LoadingProvider } from './Context/LoadingContext';
import Favorites from './modules/Favorites/Favorites';

const App = () => {

  const routes = createHashRouter([
    {
      path: "",
      element: <LoadingProvider>
        <AuthLayout />
      </LoadingProvider>,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verifyAcount", element: <VerifyAcount /> },
        { path: "resetPass", element: <ResetPass /> },
        { path: "forgetPass", element: <ForgetPass /> }
      ],
      errorElement: <NotFound />

    },
    {
      path: "dashboard",
      element: <ProtectedRoute  >
        <MasterLayout />
      </ProtectedRoute>,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "recipestList", element: <RecipesList /> },
        { path: "recipestData", element: <RecipesData /> },
        { path: "myFavorite", element: <Favorites /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> }
      ],
      errorElement: <NotFound />
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
