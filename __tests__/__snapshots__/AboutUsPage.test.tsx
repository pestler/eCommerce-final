import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../setupTests';
//import { AboutUsPage } from './../../src/pages/';

describe('AboutUsPage', () => {
  it('Should render the AboutUsPage correctly', () => {
    shallow(<AboutUsPage />);
  });
});
