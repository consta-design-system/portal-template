import * as React from 'react';

import {Video} from '../Video';
import {renderWithRouter} from '../../../../__tests__/utils/renderWithRouter';

type Props = React.ComponentProps<typeof Video>;

const testId = '/';

const renderComponent = (props: Props) => {
    return renderWithRouter(<Video data-test-id={testId} {...props} />);
};

describe('Компонент Video', () => {
    it('Проверить доступность data-test-id', () => {
        const {getByTestId} = renderComponent({});

        getByTestId(testId);
    });
});
