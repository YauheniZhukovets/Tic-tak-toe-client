import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ERROR_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from '../utils/consts';
import {LoginPage} from '../page/LoginPage';
import {ErrorPage} from '../page/ErrorPage';
import {AppState} from '../context/AppProvider';
import {GameBox} from './GameBox/GameBox';


export const AppRouts = () => {
    const {user} = AppState()

    return (
        <Routes>
            <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
            <Route path={MAIN_ROUTE} element={!user ? <LoginPage/> : <GameBox/>}>
                <Route path={MAIN_ROUTE + ':id'} element={<GameBox/>}/>
            </Route>
            <Route path={ERROR_ROUTE} element={<ErrorPage/>}/>
            <Route path={'*'} element={<Navigate to={ERROR_ROUTE}/>}/>
        </Routes>
    )
}