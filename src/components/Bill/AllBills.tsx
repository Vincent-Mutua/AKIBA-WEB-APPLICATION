import React from 'react';
import styled from 'styled-components';

const AllBills = () => {
  return (
    <Card className='card'>
      <Title>Upcoming Bills</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Due Date</TableHeader>
            <TableHeader>Logo</TableHeader>
            <TableHeader>Item Description</TableHeader>
            <TableHeader>Last Charge</TableHeader>
            <TableHeader>Amount</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <BillItem>
            <TableCell>Date</TableCell>
            <TableCell>
              <Icons>
               
              </Icons>
            </TableCell>
            <TableCell>
              <ItemTitle> </ItemTitle>
              <ItemDescriptionDetail>
               
              </ItemDescriptionDetail>
            </TableCell>
            <TableCell>Last Charge Date: Date</TableCell>
            <TableCell>ksh 0</TableCell>
          </BillItem>
          <BillItem>
            <TableCell>Date</TableCell>
            <TableCell>
              <Icons>
               
              </Icons>
            </TableCell>
            <TableCell>
              <ItemTitle>  </ItemTitle>
              <ItemDescriptionDetail>
                
              </ItemDescriptionDetail>
            </TableCell>
            <TableCell>Last Charge Date:</TableCell>
            <TableCell>ksh 0</TableCell>
          </BillItem>
        </tbody>
      </Table>
    </Card>
  );
};

const Card = styled.div`
margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--Gray-02, #878787);
  width: 100%;
  font: 400 15px/145% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
    padding: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid var(--Gray-02, #878787);
`;

const BillItem = styled.tr`
  border-bottom: 1px solid rgba(210, 210, 210, 0.25);
`;

const TableCell = styled.td`
  padding: 12px;
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  aspect-ratio: 0.68;
  object-fit: auto;
  object-position: center;
  width: 27px;
`;

const ItemTitle = styled.div`
  color: var(--Default-Black, #191919);
  font-weight: bold;
`;

const ItemDescriptionDetail = styled.div`
  color: var(--Gray-03, #9f9f9f);
`;

export default AllBills;
