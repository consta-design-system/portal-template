import React from 'react';
import YouTube from 'react-youtube';
import {useParams} from 'react-router-dom';

import {Item, items} from '../data';

const Content = () => {
    const [defaultItem] = items;
    const {videoId = defaultItem.videoId} = useParams<Item>();

    return (
        <YouTube videoId={videoId}
                 opts={{
                     height: '405',
                     width: '720'
                 }}
        />
    );
};

export {Content};
