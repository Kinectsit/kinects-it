import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { Home } from './Home';
// import { Link } from 'react-router';

describe('<Home />', () => {
  it('should have a header', () => {
    const wrapper = render(<Home />);
    const actual = wrapper.find('h1').text();
    const expected = 'Welcome to Kinects.It!';
    expect(actual).to.contain(expected);
  });
});

