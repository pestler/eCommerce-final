import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import './../test-setup/setup';
import  Main  from '../src/pages/main/Main';

describe('LoginPage', () => {
  it('Should render the LoginPage correctly', () => {
    shallow(<Main />);
  });
});
