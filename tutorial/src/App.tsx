import React, { FunctionComponent } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { EventInterceptorProvider, eventInterceptorMap } from '@consta/uikit/EventInterceptor';
import { Button } from '@consta/uikit/Button';

import { createStore } from '@reatom/core';

import { context as ReatomContext } from '@reatom/react';

import { About } from './pages/About';
import { Tutorial } from './pages/Tutorial';
import { PortalMenu } from './components/PortalMenu';
import { Layout } from './components/Layout';

import { Routes } from './routes';

type Props = {};

const App: FunctionComponent<Props> = () => {
    const store = createStore();

    console.log('ddd');

    return (
        <ReatomContext.Provider value={store}>
            <EventInterceptorProvider
                eventHandler={(props) => {
                    console.log('EventInterceptor с хостового прилоджения');
                    console.log(props);
                }}
                map={eventInterceptorMap}
            >
                <Theme preset={presetGpnDefault}>
                    <BrowserRouter>
                        <Layout header={<PortalMenu />}>
                            <Switch>
                                <Route path={[Routes.HOME, Routes.ABOUT]} exact={true}>
                                    <About />
                                </Route>

                                <Route path={Routes.TUTORIAL}>
                                    <Tutorial />
                                </Route>
                                {/* <Button /> */}
                            </Switch>
                        </Layout>
                    </BrowserRouter>
                </Theme>
            </EventInterceptorProvider>
        </ReatomContext.Provider>
    );
};

export { App };
