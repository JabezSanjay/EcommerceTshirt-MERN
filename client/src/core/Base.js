import React from "react";
import styled from "styled-components";
import COLORS from "../assets/colors";

const Base = () => {
  return (
    <BaseTag>
      <div className="footer">
        <p>Footer</p>
      </div>
    </BaseTag>
  );
};

export default Base;

const BaseTag = styled.div`
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      ${COLORS.primaryBackgroundColor},
      ${COLORS.secondaryBackgroundColor},
      0.2
    );
    color: white;
    text-align: center;
  }
`;
