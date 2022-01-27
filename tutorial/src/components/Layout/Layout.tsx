import React, {FunctionComponent, ReactNode} from 'react';

import styles from './Layout.module.css';

type Props = {
    header: ReactNode;
} & JSX.IntrinsicElements['div'];

const Layout: FunctionComponent<Props> = ({children, header, ...otherProps}) => {
    return (
        <div {...otherProps}
             className={styles.layout}
             data-test-id="layout"
        >
            <header>{header}</header>
            <main className={styles.content}>{children}</main>
        </div>
    );
};

export {Layout};
