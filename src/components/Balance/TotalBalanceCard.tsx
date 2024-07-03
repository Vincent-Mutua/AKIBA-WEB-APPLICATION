// src/components/TotalBalanceCard.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, orderBy, query, limit, where } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const TotalBalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const transactionsQuery = query(
            collection(db, 'transactions'),
            where('userId', '==', userId), // Filter transactions for the logged-in user
            orderBy('uploadedAt', 'desc'),
            limit(1)
          );
          const querySnapshot = await getDocs(transactionsQuery);
          if (!querySnapshot.empty) {
            const latestTransaction = querySnapshot.docs[0].data();
            if (latestTransaction.transactions && latestTransaction.transactions.length > 0) {
              setBalance(latestTransaction.transactions[0].balance);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <CardContainer className="card">
      <CardContent className="card-body">
        <Header>
          <Balance>{balance !== null ? `ksh ${balance}` : 'Loading...'}</Balance>
          <AccountLabel>Balance</AccountLabel>
        </Header>
        <Details>
          <AccountInfo>
            <Label>Account type</Label>
            <AccountType> </AccountType>
            <AccountNumber> </AccountNumber>
          </AccountInfo>
          <CardImage>
            <ImageWrapper>
              <CardIcon
                loading="lazy"
                srcSet="..."
              />
            </ImageWrapper>
            <BalanceInfo>
              <CardBalance>{balance !== null ? `ksh ${balance}` : 'Loading...'}</CardBalance>
              <ArrowIconWrapper>
                <ArrowIcon
                  loading="lazy"
                />
              </ArrowIconWrapper>
            </BalanceInfo>
          </CardImage>
        </Details>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: start;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  gap: 20px;
  text-transform: capitalize;
`;

const Balance = styled.div`
  color: var(--Default-Black, #191919);
  font: 600 16px/145% Inter, sans-serif;
`;

const AccountLabel = styled.div`
  color: var(--Secondary, #525256);
  text-align: right;
  font: 500 14px/143% Inter, sans-serif;
`;

const Details = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  background-color: var(--Primary-color, #299d91);
  display: flex;
  margin-top: 12px;
  gap: 8px;
  padding: 16px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: var(--Special-BG2, rgba(255, 255, 255, 0.7));
  font-weight: 500;
  text-transform: capitalize;
  line-height: 143%;
`;

const Label = styled.div`
  font-family: Inter, sans-serif;
`;

const AccountType = styled.div`
  color: var(--White, #fff);
  font: 700 16px/150% Inter, sans-serif;
`;

const AccountNumber = styled.div`
  font-family: Inter, sans-serif;
`;

const CardImage = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  justify-content: center;
  align-items: center;
  align-self: end;
  display: flex;
  width: 48px;
`;

const CardIcon = styled.img`
  aspect-ratio: 1.72;
  object-fit: auto;
  object-position: center;
  width: 100%;
`;

const BalanceInfo = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
`;

const CardBalance = styled.div`
  color: var(--White, #fff);
  text-align: right;
  text-transform: capitalize;
  font: 700 10px/100% Inter, sans-serif;
`;

const ArrowIconWrapper = styled.div`
  align-items: center;
  border-radius: 20px;
  background-color: var(--White, #fff);
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
`;

const ArrowIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 16px;
`;

export default TotalBalanceCard;
