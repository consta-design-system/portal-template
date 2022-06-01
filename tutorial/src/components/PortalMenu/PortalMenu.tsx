import React, {FunctionComponent} from 'react';

import { Header } from '@consta/header/Header';

import {Logo} from './Logo';
import {useMenuItems} from './useMenuItems';

type Props = {};

const PortalMenu: FunctionComponent<Props> = () => {
    const items = useMenuItems();

    return (
        <Header
            logo={<Logo />}
            userLogined={true}
            userName="Александр Абашкин"
            userInfo="ПАО «Газпромнефть»"
            loginButtonLabel="Войти"
            getMenuItemLabel={({label}) => `${label}`}
            getMenuItemHref={({href}) => href}
            getMenuItemActive={({active}) => active}
            menu={items}
        />
    );
};

export {PortalMenu};
