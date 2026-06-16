import React, { useState, useEffect } from 'react';

interface PaymentMethod {
  id: string;
  cardholderName: string;
  expiryDate: string;
  cardType: 'VISA' | 'Mastercard' | 'Amex';
  lastFour: string;
  isDefault: boolean;
  billingAddress?: string;
}

interface Payment {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  date: string;
  method: string;
  status: 'successful' | 'pending' | 'failed';
  reference: string;
  transactionId?: string;
}

interface PaymentListProps {
  payments?: Payment[];
  paymentMethods?: PaymentMethod[];
  onPaymentUpdate?: (payments: Payment[]) => void;
  onPaymentMethodUpdate?: (methods: PaymentMethod[]) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ 
  payments: propPayments,
  paymentMethods: propPaymentMethods,
  onPaymentUpdate,
  onPaymentMethodUpdate
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(propPaymentMethods || []);
  const [payments, setPayments] = useState<Payment[]>(propPayments || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState<Payment | null>(null);

  useEffect(() => {
    if (!propPayments) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockPaymentMethods: PaymentMethod[] = [
        {
          id: '1',
          cardholderName: 'AZUNYAN U WU',
          expiryDate: '08/11',
          cardType: 'VISA',
          lastFour: '6187',
          isDefault: true,
          billingAddress: '123 Main St, NY'
        },
        {
          id: '2',
          cardholderName: 'AZUNYAN U WU',
          expiryDate: '08/11',
          cardType: 'VISA',
          lastFour: '6187',
          isDefault: false,
          billingAddress: '456 Oak Ave, CA'
        },
        {
          id: '3',
          cardholderName: 'John Smith',
          expiryDate: '12/24',
          cardType: 'Mastercard',
          lastFour: '4321',
          isDefault: false,
          billingAddress: '789 Pine Rd, TX'
        },
      ];

      const mockPayments: Payment[] = [
        {
          id: '1',
          invoiceNumber: '#011',
          clientName: 'Tech Solutions Inc.',
          amount: 25.00,
          date: '2026-06-25',
          method: 'VISA ****6187',
          status: 'successful',
          reference: 'TXN-001-2026',
          transactionId: 'TRX_001'
        },
        {
          id: '2',
          invoiceNumber: '#010',
          clientName: 'Design Studio LLC',
          amount: 35.00,
          date: '2026-05-25',
          method: 'Mastercard ****4321',
          status: 'successful',
          reference: 'TXN-002-2026',
          transactionId: 'TRX_002'
        },
        {
          id: '3',
          invoiceNumber: '#009',
          clientName: 'Marketing Agency',
          amount: 40.00,
          date: '2026-04-25',
          method: 'VISA ****6187',
          status: 'failed',
          reference: 'TXN-003-2026',
          transactionId: 'TRX_003'
        },
        {
          id: '4',
          invoiceNumber: '#008',
          clientName: 'Consulting Group',
          amount: 30.00,
          date: '2026-03-25',
          method: 'PayPal',
          status: 'pending',
          reference: 'TXN-004-2026',
          transactionId: 'TRX_004'
        },
        {
          id: '5',
          invoiceNumber: '#007',
          clientName: 'Startup Labs',
          amount: 20.00,
          date: '2026-02-25',
          method: 'VISA ****6187',
          status: 'successful',
          reference: 'TXN-005-2026',
          transactionId: 'TRX_005'
        },
      ];

      setPaymentMethods(mockPaymentMethods);
      setPayments(mockPayments);
      if (onPaymentMethodUpdate) onPaymentMethodUpdate(mockPaymentMethods);
      if (onPaymentUpdate) onPaymentUpdate(mockPayments);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'successful':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getCardIcon = (type: string): React.ReactNode => {
    switch (type) {
      case 'VISA':
        return (
          <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
        );
      case 'Mastercard':
        return (
          <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MC</span>
          </div>
        );
      case 'Amex':
        return (
          <div className="w-10 h-7 bg-blue-400 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AMEX</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const updatedMethods = paymentMethods.map((method: PaymentMethod) => ({
        ...method,
        isDefault: method.id === id
      }));
      setPaymentMethods(updatedMethods);
      if (onPaymentMethodUpdate) onPaymentMethodUpdate(updatedMethods);
    } catch (error) {
      console.error('Error setting default payment method:', error);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    try {
      const updatedMethods = paymentMethods.filter((method: PaymentMethod) => method.id !== id);
      setPaymentMethods(updatedMethods);
      if (onPaymentMethodUpdate) onPaymentMethodUpdate(updatedMethods);
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  const filteredPayments = payments.filter((payment: Payment) =>
    payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoiceNumber.includes(searchTerm) ||
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayments = payments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
  const successfulPayments = payments.filter((p: Payment) => p.status === 'successful').length;
  const successRate = payments.length > 0 ? Math.round((successfulPayments / payments.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
            <p className="text-sm text-gray-500 mt-1">
              {paymentMethods.length} saved payment methods
            </p>
          </div>
          <button
            onClick={() => setShowAddMethod(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Payment Method
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No payment methods added yet
              </div>
            ) : (
              paymentMethods.map((method: PaymentMethod) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 flex items-center justify-between ${
                    method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {getCardIcon(method.cardType)}
                    <div>
                      <p className="font-medium text-gray-800">{method.cardholderName}</p>
                      <p className="text-sm text-gray-600">
                        {method.cardType} •••• {method.lastFour}
                      </p>
                      <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMethod(method.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
              <p className="text-sm text-gray-500 mt-1">{payments.length} Total transactions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="text-lg font-bold text-gray-800">${totalPayments.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Success Rate</p>
                <p className="text-lg font-bold text-green-600">{successRate}%</p>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full md:w-64 text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment: Payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {payment.reference}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600">
                      {payment.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.clientName}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(payment.status)}`}>
                        {payment.status === 'successful' && (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {payment.status === 'pending' && (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        )}
                        {payment.status === 'failed' && (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        )}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setShowPaymentDetails(payment)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Payment Method</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="4111 1111 1111 1111"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMethod(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Add Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showPaymentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
              <button
                onClick={() => setShowPaymentDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="font-medium">{showPaymentDetails.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Invoice</p>
                <p className="font-medium">{showPaymentDetails.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium">{showPaymentDetails.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-blue-600">${showPaymentDetails.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{new Date(showPaymentDetails.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Method</p>
                <p>{showPaymentDetails.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(showPaymentDetails.status)}`}>
                  {showPaymentDetails.status.charAt(0).toUpperCase() + showPaymentDetails.status.slice(1)}
                </span>
              </div>
              {showPaymentDetails.transactionId && (
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded">{showPaymentDetails.transactionId}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setShowPaymentDetails(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentList;