import { render, screen } from '@testing-library/react';

import App from './../src/App';
import { describe, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    screen.debug();

    // check if App components renders headline
  });
});

/* import React from 'react';
import ReactDOM from 'react-dom';
import MoviesSingle from './../src/components/footer/Footer';
import { it } from 'vitest';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoviesSingle />, div);
}); */