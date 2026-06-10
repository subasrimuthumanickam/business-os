import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => (
  <section className="card">
    {title && (
      <div className="card-title-bar">
        {title}
      </div>
    )}

    <div className="card-content">
      {children}
    </div>
  </section>
);

export default Card;