import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { App } from './App';
// import { Link } from 'react-router';

describe('<App />', () => {
  it('should have a navbar', () => {
    const wrapper = render(<App />);
    const actual = wrapper.find('.title-bar-container h1').text();
    const expected = 'Kinects.It';
    expect(actual).to.contain(expected);
  });
});

