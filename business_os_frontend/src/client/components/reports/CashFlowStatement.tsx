import React from "react";

export default function CashFlowStatement() {
  const operatingCashIn = 150000;
  const supplierPayments = 50000;
  const expensePayments = 25000;

  const investingOut = 30000;
  const investingIn = 10000;

  const financingIn = 50000;
  const financingOut = 20000;

  const operatingNet =
    operatingCashIn - supplierPayments - expensePayments;

  const investingNet =
    investingIn - investingOut;

  const financingNet =
    financingIn - financingOut;

  const netCashFlow =
    operatingNet + investingNet + financingNet;

  const openingBalance = 100000;
  const closingBalance =
    openingBalance + netCashFlow;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Cash Flow Statement
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <tbody>

            <tr className="bg-gray-100">
              <td className="px-4 py-3 font-semibold">
                Operating Activities
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-4 py-2">
                Cash Received From Customers
              </td>
              <td className="px-4 py-2 text-right">
                ₹{operatingCashIn.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                Payments To Suppliers
              </td>
              <td className="px-4 py-2 text-right">
                (₹{supplierPayments.toLocaleString()})
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                Operating Expenses
              </td>
              <td className="px-4 py-2 text-right">
                (₹{expensePayments.toLocaleString()})
              </td>
            </tr>

            <tr className="font-semibold">
              <td className="px-4 py-2">
                Net Cash From Operating Activities
              </td>
              <td className="px-4 py-2 text-right">
                ₹{operatingNet.toLocaleString()}
              </td>
            </tr>

            <tr className="bg-gray-100">
              <td className="px-4 py-3 font-semibold">
                Investing Activities
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-4 py-2">
                Asset Purchases
              </td>
              <td className="px-4 py-2 text-right">
                (₹{investingOut.toLocaleString()})
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                Asset Sales
              </td>
              <td className="px-4 py-2 text-right">
                ₹{investingIn.toLocaleString()}
              </td>
            </tr>

            <tr className="font-semibold">
              <td className="px-4 py-2">
                Net Cash From Investing Activities
              </td>
              <td className="px-4 py-2 text-right">
                ₹{investingNet.toLocaleString()}
              </td>
            </tr>

            <tr className="bg-gray-100">
              <td className="px-4 py-3 font-semibold">
                Financing Activities
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-4 py-2">
                Owner Investment
              </td>
              <td className="px-4 py-2 text-right">
                ₹{financingIn.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                Loan Repayment
              </td>
              <td className="px-4 py-2 text-right">
                (₹{financingOut.toLocaleString()})
              </td>
            </tr>

            <tr className="font-semibold">
              <td className="px-4 py-2">
                Net Cash From Financing Activities
              </td>
              <td className="px-4 py-2 text-right">
                ₹{financingNet.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t-2 font-bold">
              <td className="px-4 py-3">
                Net Increase In Cash
              </td>
              <td className="px-4 py-3 text-right">
                ₹{netCashFlow.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                Opening Cash Balance
              </td>
              <td className="px-4 py-2 text-right">
                ₹{openingBalance.toLocaleString()}
              </td>
            </tr>

            <tr className="font-bold bg-green-50">
              <td className="px-4 py-3">
                Closing Cash Balance
              </td>
              <td className="px-4 py-3 text-right">
                ₹{closingBalance.toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}