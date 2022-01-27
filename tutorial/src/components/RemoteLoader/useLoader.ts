import {
    useEffect,
    useState
} from 'react';

import {addScript} from '@monolithed/module-federation-loader';
import {fetchBundle} from '../../api/workspace/bundle';

type State = {
    loading: boolean;
    error?: string;
}

const useLoader = (name: string): State => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [scriptLink, setScriptLink] = useState<HTMLScriptElement>();

    useEffect(() => {
        let abortController = new AbortController();

        (async (): Promise<void> => {
            let src: string;
            let integrity: string;

            try {
                ({src, integrity} = await fetchBundle({name}));
            } catch {
                setError(`Could not fetch the "${name}" bundle`);

                return void 0;
            }

            try {
                const {script} = await addScript({
                    src,
                    integrity,
                    crossOrigin: 'anonymous'
                });

                setScriptLink(script);
            } catch {
                setError(`Could not append the "${name}" script`);

                return void 0;
            }

            setLoading(false);
        })();

        return () => {
            abortController.abort();
            scriptLink?.remove();
        };
    }, [name]);

    return {loading, error};
};

export {useLoader};
