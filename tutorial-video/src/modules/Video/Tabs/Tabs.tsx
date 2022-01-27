import React from 'react';
import {Tabs as ConstaTabs} from '@consta/uikit/Tabs';

import {
    useParams,
    useHistory
} from 'react-router-dom';

import {
    Item,
    items,
    getItemByVideoId
} from '../data';

type Props = JSX.IntrinsicElements['section'];

const Tabs: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const {videoId} = useParams<Item>();

    return (
        <ConstaTabs
            items={items}
            onChange={({value}) => history.push(value.videoId)}
            getLabel={(item) => item.name}
            value={getItemByVideoId(videoId)}
        />
    );
};

export {Tabs};
