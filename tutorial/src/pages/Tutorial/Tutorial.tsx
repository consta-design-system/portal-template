import React, {
    FunctionComponent
} from 'react';

import {RemoteLoader} from '../../components/RemoteLoader';
import {Remotes} from '../../remotes';

type Props = {};

const Tutorial: FunctionComponent<Props> = () => {
    return (
        <RemoteLoader remote={Remotes.TUTORIAL} module="./Video">
            <RemoteLoader.Component />
        </RemoteLoader>
    );
};

export {Tutorial};
