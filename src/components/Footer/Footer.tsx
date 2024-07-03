import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: HSL(218, 18%, 11%);
  color: #fff;
  padding: 7px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0; /* Ensure it starts from the left edge */
  height: 30px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy;All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
