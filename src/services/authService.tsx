// src/services/authService.ts

import { auth, db } from '../config/firebase'; // Import db from firebase config
import { User } from 'firebase/auth'; // Adjust the import as per Firebase SDK version
import { doc, getDoc } from 'firebase/firestore';

// Function to get the current authenticated user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Function to fetch user data from your database
export const getUserData = async (): Promise<{ firstName: string; lastName: string; email: string }> => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: currentUser.email || '',
        };
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  } else {
    throw new Error('No user logged in');
  }
};


