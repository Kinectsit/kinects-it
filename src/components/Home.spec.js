import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Home from './Home';
import { Link } from 'react-router';

describe('<Home />', () => {
  it('should have a header', () => {
    const wrapper = shallow(<Home />);
    const actual = wrapper.find('h1').text();
    const expected = 'Welcome t Kinects.It!';
    expect(actual).to.equal(expected);
  });
});

