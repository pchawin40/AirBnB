import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { propertyTypeList } from '../../../../data/data';
import Arrow from './Arrow.tsx'

import './LowerNavigation.css';

const getItems = () => propertyTypeList;

function LowerNavigation() {
  const [items ] = React.useState(getItems);

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} className="scroll-menu-container">
      {items.map(({name, iconImage}) => (
        <Card
          key={name}
          name={name}
          iconImage={iconImage}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <i className="fa-solid fa-angle-left"></i>
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <i className="fa-solid fa-angle-right"></i>
    </Arrow>
  );
}

function Card({ onClick, iconImage, name }) {
  return (
    <div
      style={{
        width: '160px',
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{iconImage}</div>
        <div>{name}</div>
      </div>
    </div>
  );
}

export default LowerNavigation;
