// src/components/Header/Header.tsx

import * as React from "react";
import styled from "styled-components";
import { getUserData } from "../../services/authService"; // Adjust path as per your project structure

function Header() {
  const [userData, setUserData] = React.useState<{ firstName: string; lastName: string } | null>(null);
  const [currentDate, setCurrentDate] = React.useState<string>("");

  // Fetch user data and current date on component mount
  React.useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Function to get current date
    const getCurrentDate = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      };
      

    // Fetch user data and current date
    fetchUserData();
    getCurrentDate();
  }, []); // Empty dependency array to run only once on mount

  return (
    <HeaderContainer>
      <UserInfo>
        {userData && (
          <Greetings>
            Hello, {userData.firstName} {userData.lastName}
          </Greetings>
        )}
        <DateText>{currentDate}</DateText>
      </UserInfo>
      <SearchBar>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecfe137d69da551fc3da16516eb9e12bad1e6c8b018f0a7106567f83b278d090?"
          alt="Search Icon"
        />
        <SearchInput placeholder="Search here" />
      </SearchBar>
    </HeaderContainer>
  );
}

// Styled-components styles
const HeaderContainer = styled.div`
background-color: rgba(176, 176, 176, 0.1);
  justify-content: space-between;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  display: flex;
  gap: 20px;
  padding: 12px 28px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding: 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font size: 8px;
`;

const Greetings = styled.div`
  color: #191919;
  font-weight: 700;
  font-size: 15px;
  line-height: 117%;
`;

const DateText = styled.div`
  color: #9f9f9f;
  font-size: 14px;
`;

const SearchBar = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 26px 26px 0px rgba(106, 22, 58, 0.04);
  display: flex;
  gap: 10px;
  padding: 8px 12px;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  color: #9f9f9f;
  width: 100%;
  &::placeholder {
    color: #9f9f9f;
  }
`;

export default Header;
