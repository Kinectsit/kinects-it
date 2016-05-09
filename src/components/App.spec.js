import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import { App } from './App';
import { TitleBar } from './TitleBar';

describe('<App />', () => {
  it('should have a navbar', () => {
    const wrapper = render(<App />);
    const actual = wrapper.find('.title-bar-container h1').text();
    const expected = 'Kinects.It';
    expect(actual).to.contain(expected);
  });

  it('TitleBar exists', () => {
    expect(shallow(<TitleBar />).find('.title-bar-container').length).to.equal(1);
  });
});
