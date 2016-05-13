import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { App } from './App';

describe('<App />', () => {
  it('should have the app container', () => {
    const actual = shallow(<App />).find('.app-container').length;
    expect(actual).to.equal(1);
  });
});
