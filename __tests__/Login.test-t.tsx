import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../test-setup/setup';
import  Login  from '../src/pages/login/Login';

describe('Login', () => {
  it('Should render the Login correctly', () => {
    shallow(<Login />);
  });
});

