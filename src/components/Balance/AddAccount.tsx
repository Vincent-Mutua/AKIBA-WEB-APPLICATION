import * as React from "react";
import styled from "styled-components";

const AddAccount: React.FC = () => {
  return (
    <Card className="card">
      <Content>
        <AddButton>Add accounts</AddButton>
        <EditButton>Edit Accounts</EditButton>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
  display: flex;
  max-width: 352px;
  font-size: 16px;
  text-align: center;
  
  padding: 34px 24px;
  height: 97%;
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
  width: 208px;
  max-width: 100%;
  flex-direction: column;
`;

const AddButton = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 4px;
  background-color: var(--Primary-color, #299d91);
  color: var(--White, #fff);
  font-weight: 700;
  text-transform: capitalize;
  justify-content: center;
  padding: 12px 32px;
`;

const EditButton = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 4px;
  color: var(--Gray-03, #9f9f9f);
  font-weight: 500;
  justify-content: center;
  padding: 12px 24px;
`;

export default AddAccount;
