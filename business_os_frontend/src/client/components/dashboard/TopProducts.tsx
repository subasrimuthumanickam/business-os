 import React from 'react';

interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
}

interface TopProductsProps {
  products: TopProduct[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Top Products</h3>
      </div>
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-revenue">₹{product.revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
