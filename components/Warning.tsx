import React from 'react';

interface WarningProps {
  title: string;
  children: React.ReactNode;
}

const Warning: React.FC<WarningProps> = ({ title, children }) => {
  return (
    <div className="warning">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
};

export default Warning;