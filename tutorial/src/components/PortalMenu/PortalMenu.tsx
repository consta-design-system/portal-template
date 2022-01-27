import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

import {
    Header,
    HeaderModule,
    HeaderMenu,
    HeaderLogin,
    HeaderLogo
} from '@consta/uikit/Header';

import {Routes} from '../../routes';
import {Logo} from './Logo';
import {useMenuItems} from './useMenuItems';

type Props = {};

const PortalMenu: FunctionComponent<Props> = () => {
    const items = useMenuItems();

    return (
        <Header
            leftSide={
                <>
                    <HeaderModule>
                        <HeaderLogo>
                            <Link to={Routes.HOME}>
                                <Logo />
                            </Link>
                        </HeaderLogo>
                    </HeaderModule>

                    <HeaderModule indent="l">
                        <HeaderMenu items={items} />
                    </HeaderModule>
                </>
            }
            rightSide={
                <HeaderModule>
                    <HeaderLogin
                        isLogged={true}
                        personName="Александр Абашкин"
                        personInfo="ПАО «Газпромнефть»"
                        personStatus="available"
                    />
                </HeaderModule>
            }
        />
    );
};

export {PortalMenu};
