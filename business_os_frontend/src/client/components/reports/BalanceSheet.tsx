import React from "react";

export default function BalanceSheet() {
  // Assets
  const cash = 150000;
  const accountsReceivable = 50000;
  const inventory = 80000;

  const equipment = 100000;
  const furniture = 40000;

  const totalAssets =
    cash +
    accountsReceivable +
    inventory +
    equipment +
    furniture;

  // Liabilities
  const accountsPayable = 30000;
  const loansPayable = 90000;

  const totalLiabilities =
    accountsPayable +
    loansPayable;

  // Equity
  const ownerCapital = 200000;
  const retainedEarnings = 100000;

  const totalEquity =
    ownerCapital +
    retainedEarnings;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Balance Sheet
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <tbody>

            {/* Assets */}
            <tr className="bg-blue-50">
              <td className="px-4 py-3 font-bold">
                ASSETS
              </td>
              <td />
            </tr>

            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-medium">
                Current Assets
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-8 py-2">
                Cash & Bank
              </td>
              <td className="px-4 py-2 text-right">
                ₹{cash.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-8 py-2">
                Accounts Receivable
              </td>
              <td className="px-4 py-2 text-right">
                ₹{accountsReceivable.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-8 py-2">
                Inventory
              </td>
              <td className="px-4 py-2 text-right">
                ₹{inventory.toLocaleString()}
              </td>
            </tr>

            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-medium">
                Fixed Assets
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-8 py-2">
                Equipment
              </td>
              <td className="px-4 py-2 text-right">
                ₹{equipment.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-8 py-2">
                Furniture
              </td>
              <td className="px-4 py-2 text-right">
                ₹{furniture.toLocaleString()}
              </td>
            </tr>

            <tr className="font-bold border-t">
              <td className="px-4 py-3">
                Total Assets
              </td>
              <td className="px-4 py-3 text-right">
                ₹{totalAssets.toLocaleString()}
              </td>
            </tr>

            {/* Liabilities */}
            <tr className="bg-red-50">
              <td className="px-4 py-3 font-bold">
                LIABILITIES
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-8 py-2">
                Accounts Payable
              </td>
              <td className="px-4 py-2 text-right">
                ₹{accountsPayable.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-8 py-2">
                Loans Payable
              </td>
              <td className="px-4 py-2 text-right">
                ₹{loansPayable.toLocaleString()}
              </td>
            </tr>

            <tr className="font-bold border-t">
              <td className="px-4 py-3">
                Total Liabilities
              </td>
              <td className="px-4 py-3 text-right">
                ₹{totalLiabilities.toLocaleString()}
              </td>
            </tr>

            {/* Equity */}
            <tr className="bg-green-50">
              <td className="px-4 py-3 font-bold">
                EQUITY
              </td>
              <td />
            </tr>

            <tr>
              <td className="px-8 py-2">
                Owner Capital
              </td>
              <td className="px-4 py-2 text-right">
                ₹{ownerCapital.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-8 py-2">
                Retained Earnings
              </td>
              <td className="px-4 py-2 text-right">
                ₹{retainedEarnings.toLocaleString()}
              </td>
            </tr>

            <tr className="font-bold border-t">
              <td className="px-4 py-3">
                Total Equity
              </td>
              <td className="px-4 py-3 text-right">
                ₹{totalEquity.toLocaleString()}
              </td>
            </tr>

            {/* Final Total */}
            <tr className="bg-gray-100 border-t-2">
              <td className="px-4 py-4 font-bold">
                Total Liabilities & Equity
              </td>
              <td className="px-4 py-4 text-right font-bold">
                ₹{(totalLiabilities + totalEquity).toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}