import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

const renderWithRouter = (component: any) => {
    return render(component, {wrapper: MemoryRouter});
};

export {renderWithRouter};
