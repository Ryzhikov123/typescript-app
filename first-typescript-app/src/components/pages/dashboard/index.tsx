import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { PageWrapper } from '../../wrappers/PageWrapper';

export const DashboardPage = () => {
  const { user } = useContext(UserContext);
  return (
    <PageWrapper>
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <div>
          Hello, {user?.lastName} {user?.firstName} ({user?.roles.join(',')})
        </div>
      </div>
    </PageWrapper>
  );
};