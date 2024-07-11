import React from 'react';
import styled from 'styled-components';

const Goals: React.FC = () => {
  return (
    <StyledCard className='card'>
      <TopSection>
        <TopLeft>
          <GoalAmount>Ksh 0</GoalAmount>
          <IconContainer>
            <Icon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5e72175061bdd0ba49d7d156825eb3c5ca91f747545ab5a96fd2a8f99047cf8?"
              loading="lazy"
            />
          </IconContainer>
        </TopLeft>
        <Month>Goals</Month>
      </TopSection>
      <BottomSection>
        <GoalAchieved>
          <Icon2
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/15163b72fda8fd89a53fdd850406fd84061e45881946ca128c4f2c381d4c0c82?"
            loading="lazy"
          />
          <AchievedDetails>
            <AchievementTitle>Target Achieved</AchievementTitle>
            <AchievementAmount>Ksh 0</AchievementAmount>
          </AchievedDetails>
        </GoalAchieved>
        <CurrentMonthGoal>
         
          <GoalDetails>
          <Icon3
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4298c7a83ffb1f721ae3eeffcb1446b8f07da9e4dc24e2ec2b4008a249167d4e?"
            loading="lazy"
          />
            <GoalTitle>This month Target</GoalTitle>
            <GoalAmount1>Ksh 0</GoalAmount1>
          </GoalDetails>
        </CurrentMonthGoal>
        <TargetVsAchievement>
          <Icon4
           
          />
          <TargetAchievementDetails>
            <Achieved>Target vs Achievement</Achieved>
            <AchievedAmounts>
              <AchievedAmount>Ksh 0</AchievedAmount>
              <AchievedAmount>Ksh 0</AchievedAmount>
              <AchievedAmount>Ksh 0</AchievedAmount>
            </AchievedAmounts>
          </TargetAchievementDetails>
        </TargetVsAchievement>
      </BottomSection>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
  display: flex;
  max-width: 352px;
  flex-direction: column;
  padding: 16px;
  border 1px solid rgba(243, 243, 243, 1);
  height: 97%;
`;

const TopSection = styled.div`
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: start;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  gap: 10px;
`;

const TopLeft = styled.div`
  display: flex;
  gap: 6px;
`;

const GoalAmount = styled.div`
  color: var(--Default-Black, #191919);
  font: 600 16px/145% Inter, sans-serif;
`;
const GoalAmount1 = styled.div`
  color: var(--Default-Black, #191919);
  font: 700 14px/120% Inter, sans-serif;
`;

const IconContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: var(--Special-BG, rgba(210, 210, 210, 0.25));
  display: flex;
  justify-content: center;
  width: 28px;
  height: 28px;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
`;

const Month = styled.div`
  color: var(--Secondary, #525256);
  text-align: right;
  text-transform: capitalize;
  align-self: start;
  font: 500 12px/120% Inter, sans-serif;
`;

const BottomSection = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  padding: 8px 0;
`;

const GoalAchieved = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Icon2 = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
`;

const AchievementTitle = styled.div`
  color: var(--Gray-02, #878787);
  font: 400 10px/110% Inter, sans-serif;
`;

const AchievementAmount = styled.div`
  color: var(--Default-Black, #191919);
  font: 700 14px/120% Inter, sans-serif;
`;

const AchievedDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const CurrentMonthGoal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Icon3 = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
`;

const GoalDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const GoalTitle = styled.div`
  color: var(--Gray-02, #878787);
  font: 400 10px/110% Inter, sans-serif;
`;

const TargetVsAchievement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Icon4 = styled.img`
  aspect-ratio: 2.2;
  object-fit: cover;
  width: 100px;
`;

const TargetAchievementDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Achieved = styled.div`
  color: var(--Default-Black, #191919);
  font: 700 10px/100% Inter, sans-serif;
`;

const AchievedAmounts = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

const AchievedAmount = styled.div`
  color: var(--Gray-02, #878787);
  font: 400 10px/110% Inter, sans-serif;
`;

export default Goals;
