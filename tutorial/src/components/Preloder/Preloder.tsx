import React, {
    FunctionComponent,
    useEffect,
    useState
} from 'react';

import styles from './Preloder.module.css';

type Props = {
    /* Состояние показа индикатора загрузки */
    active: boolean;

    /* Время, на которое нужно отложить появление индикатора */
    timeout?: number;
};

const Preloder: FunctionComponent<Props> = ({children, active, timeout}) => {
    let initialState = active;

    if (timeout && active) {
        useEffect(() => {
            const timer = window.setTimeout(() => {
                setVisibility(true);
            }, timeout);

            return () => {
                window.clearTimeout(timer);
            };
        }, []);

        initialState = false;
    }

    const [visible, setVisibility] = useState<boolean>(initialState);

    if (visible) {
        if (children) {
            return <>{children}</>;
        }

        return <div className={styles.preloader} />;
    }

    return null;
};

export {Preloder};
