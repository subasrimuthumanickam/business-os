// ProductDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Package, DollarSign } from 'lucide-react';
import { Product } from '../../types/Inventory.types';
import { InventoryController } from '../../controllers/inventory.controller';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [controller] = useState(() => new InventoryController());

  const productFromState = location.state?.product as Product;

  useEffect(() => {
    const loadProduct = async () => {
      if (productFromState) {
        setProduct(productFromState);
        setLoading(false);
        return;
      }

      if (id) {
        try {
          await controller.initialize();
          const allProducts = controller.getProducts();
          const foundProduct = allProducts.find(p => p.id === id);
          
          if (foundProduct) {
            setProduct(foundProduct);
          }
          setLoading(false);
        } catch (error) {
          console.error('Failed to load product:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, productFromState, controller]);

  const handleBack = () => {
    navigate('/inventory');
  };

  const handleEdit = () => {
    navigate(`/inventory/product/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} />
          Back to Inventory
        </button>
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-3" />
          <h2 className="text-xl font-semibold text-gray-600">Product not found</h2>
          <p className="text-gray-400 mt-2">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null) return '0.00';
    return price.toFixed(2);
  };

  return (
    <div className="inventory-page">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-xs sm:text-sm text-gray-500">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Product Name</label>
                  <p className="text-gray-800 mt-1 font-medium">{product.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">SKU</label>
                  <p className="text-gray-800 mt-1 font-mono text-sm">{product.sku}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
                  <p className="text-gray-800 mt-1">{product.category}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                  <span className={`mt-1 inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' :
                    product.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Digital Product</label>
                  <p className="text-gray-800 mt-1">{product.digital === 'Yes' ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Created At</label>
                  <p className="text-gray-800 mt-1">{formatDate(product.createdAt)}</p>
                </div>
              </div>
            </div>

            {product.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                    <DollarSign size={14} />
                    Price
                  </label>
                  <p className="text-2xl font-bold text-gray-800">${formatPrice(product.price)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                    <DollarSign size={14} />
                    Cost
                  </label>
                  <p className="text-2xl font-bold text-gray-800">${formatPrice(product.cost)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">On Hand</span>
                  <span className="text-lg font-bold text-blue-700">{product.onHand}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Available</span>
                  <span className="text-lg font-bold text-green-700">{product.available}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-600">On Hold</span>
                  <span className="text-lg font-bold text-yellow-700">{product.onHold}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Add Stock
                </button>
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                  Remove Stock
                </button>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;