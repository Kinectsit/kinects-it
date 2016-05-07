import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { App } from './App';
import { TitleBar } from './TitleBar';
// import { Link } from 'react-router';

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

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = mount(
  //     <TitleBar onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });
});
