import {Item} from '@consta/uikit/__internal__/src/components/Header/Menu/HeaderMenu';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../routes';

enum Menu {
    ABOUT = 'Локальный модуль',
    VIDEO = 'Динамический модуль'
}

type Items = Array<Item & Required<{href: string}>>;

const items: Items = [
    {
        label: Menu.ABOUT,
        href: Routes.ABOUT,
        active: true
    },
    {
        label: Menu.VIDEO,
        href: Routes.TUTORIAL
    }
];

const useMenuItems = (): Item[] => {
    const history = useHistory();
    let {pathname} = useLocation();

    return items.map((item) => {
        const {href} = item;

        if (pathname === Routes.HOME) {
            pathname = Routes.ABOUT;
        }

        return {
            ...item,
            active: pathname.includes(href),
            onClick: (event) => {
                history.push(href);

                event.preventDefault();
            }
        }
    });
};

export {useMenuItems};
