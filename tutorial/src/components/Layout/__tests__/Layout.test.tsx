import * as React from 'react';

import {Layout} from '../Layout';
import {renderWithRouter} from '../../../../__tests__/utils/renderWithRouter';

type LayoutProps = React.ComponentProps<typeof Layout>;

const testId = 'Layout';

const renderComponent = (props: LayoutProps) => {
    return renderWithRouter(<Layout data-test-id={testId} {...props} />);
};

describe('Компонент Layout', () => {
    const header = 'header';

    it('Должен рендериться без ошибок', () => {
        expect(() => renderComponent({header: 'header'})).not.toThrow();
    });

    it(`Header отображается`, () => {
        const {getByText} = renderComponent({header});

        getByText(header);
    });

    it(`Children отображается`, () => {
        const children = 'children';

        const {getByText} = renderComponent({children, header});

        getByText(children);
    });
});
