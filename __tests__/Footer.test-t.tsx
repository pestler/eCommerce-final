import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import  Footer  from '../src/components/footer/Footer';
import  {LoaderProvider}  from '../src/providers/LoaderProvider';

describe('Renders footer correctly', async () => {
  it('Should render footer correctly', async () => {
    
    render(LoaderProvider (Footer) );
    const h3 = screen.queryByText('Разработчики');
    expect(h3).not.toBeNull();
  });
});


