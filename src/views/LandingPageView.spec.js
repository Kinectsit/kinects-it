import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { LandingPageView } from './LandingPageView';
// import { Link } from 'react-router';

describe('<LandingPageView />', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<LandingPageView />).find('h2').length).to.equal(1);
  });
});

