import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../test-setup/setup';
import  Main  from '../src/pages/main/Main';

describe('Main', () => {
  it('Should render the Main correctly', () => {
    shallow(<Main />);
  });
});
