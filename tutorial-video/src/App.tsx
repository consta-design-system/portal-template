import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore} from '@reatom/core';
import {context as ReatomContext} from '@reatom/react';

import {
    Theme,
    presetGpnDefault
} from '@consta/uikit/Theme';

import Video from './modules/Video';
import {Routes} from './routes';

const App = () => {
    const store = createStore();

    return (
        <ReatomContext.Provider value={store}>
            <Theme preset={presetGpnDefault}>
                <BrowserRouter>
                    <Route path={Routes.HOME}>
                        <Video />
                    </Route>
                </BrowserRouter>
            </Theme>
        </ReatomContext.Provider>
    );
};

export {App};
