import * as React from "react";
import styled from "styled-components";

const AllTransactions: React.FC = () => {
  return (
    <Container>
      <Title>Recent Transactions</Title>
      <Tabs>
        <Tab className="active">All</Tab>
        <Tab>Revenue</Tab>
        <Tab>Expenses</Tab>
      </Tabs>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Items</TableHeader>
            <TableHeader>Shop Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Payment Method</TableHeader>
            <TableHeader>Amount</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6d7b4057eec418f8e232ef61f200dacc92073e73f3861dd4b1cc498bf25fc6a?"
                />
              </ImageContainer>
              <TransactionTitle>GTR 5</TransactionTitle>
            </TableCell>
            <TableCell>Gadget & Gear</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$160.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7993a7577ad9e7a99ca93b56f05cb02b18680bbe98d418a668c4727a86ae460c?"
                />
              </ImageContainer>
              <TransactionTitle>Polo shirt</TransactionTitle>
            </TableCell>
            <TableCell>XL fashions</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$20.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc1ad51a606562d4fdd08225ca0d6793b494612bf940445a06cabc813196cd05?"
                />
              </ImageContainer>
              <TransactionTitle>Biriyani</TransactionTitle>
            </TableCell>
            <TableCell>Hajir Biriyani</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$12.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09ee95f034439efa2a67b2cd0f389ec7d22776deb0f381d971d75ac53981870b?"
                />
              </ImageContainer>
              <TransactionTitle>Movie ticket</TransactionTitle>
            </TableCell>
            <TableCell>Inox</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$15.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bad82c14f358624a76759e62537496e02f9072aad4448b6741d50654f376b55c?"
                />
              </ImageContainer>
              <TransactionTitle>Taxi fare</TransactionTitle>
            </TableCell>
            <TableCell>Uber</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$10.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc1ad51a606562d4fdd08225ca0d6793b494612bf940445a06cabc813196cd05?"
                />
              </ImageContainer>
              <TransactionTitle>Pizza</TransactionTitle>
            </TableCell>
            <TableCell>Pizza Hit</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$20.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ImageContainer>
                <TransactionImage
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7993a7577ad9e7a99ca93b56f05cb02b18680bbe98d418a668c4727a86ae460c?"
                />
              </ImageContainer>
              <TransactionTitle>Keyboard</TransactionTitle>
            </TableCell>
            <TableCell>Gadget & Gear</TableCell>
            <TableCell>17 May, 2023</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$30.00</TableCell>
          </TableRow>
        </tbody>
      </Table>
      <LoadMore>Load More</LoadMore>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 15px;
  line-height: 32px;
  color: #737373;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Tab = styled.div`
  padding: 10px 10px;
  font-size: 14px;
  font-weight: bold;
  color: #525252;
  cursor: pointer;

  &.active {
    color: #14b8a6;
    border-bottom: 2px solid #14b8a6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

const TableHeader = styled.th`
  padding: 12px; /* Adjusted padding */
  text-align: left;
  font-size: 14px; /* Reduced font size */
  font-weight: bold;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const TableCell = styled.td`
  padding: 5px; /* Adjusted padding */
  text-align: left;
  font-size: 14px; /* Reduced font size */
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const ImageContainer = styled.div`
  width: 36px; /* Reduced width */
  height: 36px; /* Reduced height */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-right: 8px; /* Reduced margin */
`;

const TransactionImage = styled.img`
  width: 24px; /* Reduced width */
  height: 24px; /* Reduced height */
`;

const TransactionTitle = styled.span`
  color: #737373;
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #14b8a6;
  cursor: pointer;
`;

export default AllTransactions;