import React from "react";
import { Collapse } from "react-collapse";

import { css } from "@emotion/css";

class DropdownItem extends React.Component {
  state = {
    isDropdownOpen: false,
    dropdownToggleIcon: "˅"
  };

  onDropdownClicked = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen,
      dropdownToggleIcon: prevState.dropdownToggleIcon === "˅" ? "^" : "˅"
    }));
  };

  render() {
    return (
      <div
        className={
          this.props.theme === "dark"
            ? accordionContainerDark
            : accordionContainerLight
        }
        id={this.props.id}
      >
        <div
          className={
            this.props.theme === "dark" ? headerBarDark : headerBarLight
          }
          onClick={this.onDropdownClicked}
      
        >
          <div  style={{display:"flex",flexDirection:"column" }}>
          <div>{this.props.title}</div>
          <p className="pt-1 pb-1" style={{fontSize:"10px"}}>{this.props.total}</p>
          </div>
          <button
            // className={
            //   this.props.theme === "dark"
            //     ? openAccordionToggleDark
            //     : openAccordionToggleLight
            // }
            // onClick={this.onDropdownClicked}
          >
            {this.state.dropdownToggleIcon}
          </button>
        </div>
        <Collapse isOpened={this.state.isDropdownOpen}>
          <div className={displayText}>{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}

export default DropdownItem;

//Light Theme
const headerBarLight = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px  #FAFAFA;
  // margin-bottom: 12px;
  padding: 5px;
  font-size: 20px;
`;

const openAccordionToggleLight = css`
  background-color: transparent;
  border: none;
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
  cursor: pointer;
  color: #272D3B;
    font-weight: bold
`;

const displayText = css`
  text-align: left;
`;

const accordionContainerLight = css`
  margin: 10px;
  color: black;
`;
const color = 'darkgreen'
//Dark Theme
const headerBarDark = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1px ridge #1c1d1f;
  cursor:pointer;
  margin-bottom: 10px;

  padding: 5px;
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
  color: #272D3B;
    font-weight: bold;
    &:hover{
      background-color: #ececec;
border-radius:1px
    }`;

const accordionContainerDark = css`
  margin: 10px;
  color: #272D3B;
  font-weight: bold
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
`;

const openAccordionToggleDark = css`
  background-color: transparent;
  border: none;
  font-size: 14px !important;
  font-family: 'Montserrat', sans-serif !important;
  cursor: pointer;
  color: #272D3B;
    font-weight: bold
`;
