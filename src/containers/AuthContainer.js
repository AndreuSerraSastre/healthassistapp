import React from 'react';
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router"
import { ProgressBar } from '../layout/utils/AppLoading';

const Login = lazy(() => import('../pages/Login'));

const AuthContainer = () => {
    return (
        <Suspense fallback={<ProgressBar />}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
                {/* <Route path='*' element={<Navigate to="/login" />} /> */}
            </Routes>
        </Suspense>
    )
};

export default AuthContainer;