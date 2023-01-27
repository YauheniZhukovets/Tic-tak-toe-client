import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {HashRouter} from 'react-router-dom';
import {AppProvider} from './context/AppProvider';
import {AppPage} from './page/AppPage';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <HashRouter>
        <AppProvider>
            <AppPage/>
        </AppProvider>
    </HashRouter>
)
