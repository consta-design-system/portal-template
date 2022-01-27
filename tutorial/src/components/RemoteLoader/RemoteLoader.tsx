import React, {
    FunctionComponent,
    Suspense,
    lazy
} from 'react';

import {remoteLoader} from '@monolithed/module-federation-loader';
import {ErrorBoundary} from '@monolithed/error-boundary-component';
import {SkeletonText} from '@consta/uikit/Skeleton';

import {useLoader} from './useLoader';

type Props = {
    remote: string;
    module: string;
    children?: any;
};

type ServiceComponent<Props> = FunctionComponent<Props> & {
    Component: FunctionComponent<any>;
};

const RemoteLoader: ServiceComponent<Props> = ({children, remote, module}): JSX.Element => {
    const {loading} = useLoader(remote);

    if (loading) {
        return <SkeletonText rows={4} />;
    }

    const remoteModule = remoteLoader({bundle: remote, module});
    const Component = lazy(remoteModule);

    return (
        <ErrorBoundary>
            <Suspense fallback={<SkeletonText rows={4} />}>
                <Component>{children.props}</Component>
            </Suspense>
        </ErrorBoundary>
    );
};

const Component: FunctionComponent<any> = (props) => {
    return <div {...props} />;
};

RemoteLoader.Component = Component;

export {RemoteLoader};
export type {Props};
