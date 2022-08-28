// frontend/src/components/Navigation/LowerNavigation/LowerNavigation.js

import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scroll-menu';
import './LowerNavigation.css';

import { propertyTypeList } from '../../../data/data';

const list = propertyTypeList;

// One item component
// selected prop will be passed
const MenuItem = ({ text, iconImage, selected }) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
  >{iconImage}{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map(el => {
    const { name } = el;
    const { iconImage } = el;

    return <MenuItem text={name} iconImage={iconImage} key={name} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

//? LowerNavigation component
class LowerNavigation extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
  }


  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div className="lower-nav-container">
        {/* //? scroll menu */}
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
        {/* //! TODO: filters button */}
        {/* <div className="filter-button-container">
          <button className="filter-button">
            Filters
          </button>
        </div> */}
      </div>
    );
  }
}

// export LowerNavigation component
export default LowerNavigation;
