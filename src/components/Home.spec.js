import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Home } from './Home';

describe('<Home />', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<Home />).find('h2').length).to.equal(1);
  });
});

