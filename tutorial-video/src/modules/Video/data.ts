type Item = {
    name: string;
    videoId: string;
};

const items: Item[] = [
    {
        name: 'Видео 1',
        videoId: '-ei6RqZilYI'
    },
    {
        name: 'Видео 2',
        videoId: 'nyIpDs2DJ_c'
    },
    {
        name: 'Видео 3',
        videoId: 'zl2xNwX2ZjU'
    }
];

const getItemByVideoId = (videoId: string) => {
    return items.find((item) => item.videoId === videoId);
};

export {
    Item,
    items,
    getItemByVideoId
};
