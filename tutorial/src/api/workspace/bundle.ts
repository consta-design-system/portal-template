import ky, {Options} from 'ky';

type BundleRequest = {
    name: string;
}

type BundleResponse = {
    src: string;
    integrity: string;
};

const api = ky.create({
    searchParams: {
        version: '1'
    }
});

const API_URL = '/api/workspace/bundle';

const fetchBundle = (searchParams: BundleRequest, options?: Options): Promise<BundleResponse> | never => {
    const request = api.get(API_URL, {searchParams, ...options});

    return request.json<BundleResponse>();
};

export {fetchBundle};
