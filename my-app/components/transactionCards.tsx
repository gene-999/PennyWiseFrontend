import { MoreHorizontal, Wallet, WalletCards, HandCoins, ArrowLeftRight } from 'lucide-react';
import { getParamByISO } from 'iso-country-currency';
import { format, isSameDay, isSameWeek, isSameMonth, parseISO } from 'date-fns';
import { groupBy } from 'lodash';

export default function TransactionCards({ transactions }: { transactions: any[] }) {
  // Helper: Extract top N categories/descriptions
  function extractTopCategories(transactions, field = 'category', top = 2) {
    const grouped = groupBy(transactions, field);
    const sorted = Object.entries(grouped)
      .map(([key, txns]) => ({ key, count: txns.length }))
      .sort((a, b) => b.count - a.count);
    return sorted
      .slice(0, top)
      .map((item) => item.key)
      .filter(Boolean);
  }

  // Filter transactions by period
  const todayTxns = transactions.filter((txn) => txn.date && isSameDay(txn.date, new Date()));
  const weekTxns = transactions.filter(
    (txn) => txn.date && isSameWeek(txn.date, new Date(), { weekStartsOn: 1 }),
  );
  const monthTxns = transactions.filter((txn) => txn.date && isSameMonth(txn.date, new Date()));

  const todayNote =
    todayTxns.length > 0
      ? `Top spend: ${extractTopCategories(todayTxns).join(' & ')}.`
      : 'No spending recorded today.';

  const weekNote =
    weekTxns.length > 0
      ? `You mostly spent on ${extractTopCategories(weekTxns).join(', ')}.`
      : 'No spending this week yet.';

  const monthNote =
    monthTxns.length > 0
      ? `Biggest categories: ${extractTopCategories(monthTxns).join(', ')}.`
      : 'No spending this month.';

  const currency = getParamByISO('GH', 'currency') || 'GHS';

  // Make sure the transaction dates are parsed to JS Date objects
  const parsedTransactions = transactions.map((txn) => ({
    ...txn,
    date: txn.date ? new Date(txn.date) : null,
    amount: Number(txn.amount || 0),
  }));

  // Filter & reduce by time frame
  const todayTotal = parsedTransactions
    .filter((txn) => txn.date && isSameDay(txn.date, new Date()))
    .reduce((sum, txn) => sum + txn.amount, 0);

  const weekTotal = parsedTransactions
    .filter((txn) => txn.date && isSameWeek(txn.date, new Date(), { weekStartsOn: 1 })) // week starts on Monday
    .reduce((sum, txn) => sum + txn.amount, 0);

  const monthTotal = parsedTransactions
    .filter((txn) => txn.date && isSameMonth(txn.date, new Date()))
    .reduce((sum, txn) => sum + txn.amount, 0);

  const transactionCount = parsedTransactions.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Today Card */}
      <SummaryCard
        title="Today"
        icon={<Wallet size={16} className="text-gray-400 mb-2" />}
        amount={todayTotal}
        currency={currency}
        note={todayNote}
      />

      <SummaryCard
        title="This Week 🔥"
        icon={<WalletCards size={16} className="text-gray-400 mb-2" />}
        amount={weekTotal}
        currency={currency}
        note={weekNote}
      />

      <SummaryCard
        title="This Month 💚"
        icon={<HandCoins size={16} className="text-gray-400 mb-2" />}
        amount={monthTotal}
        currency={currency}
        note={monthNote}
      />
      {/* Transactions Count Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Transactions</span>
              <span className="text-sm">📊</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">{transactionCount}</div>
          <ArrowLeftRight size={16} className="text-gray-400 mb-2" />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          You've logged {transactionCount} expenses so far this month.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  icon,
  amount,
  currency,
  note,
}: {
  title: string;
  icon: React.ReactNode;
  amount: number;
  currency: string;
  note: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{title}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">
          {currency} {amount.toFixed(2)}
        </div>
        {icon}
      </div>
      <p className="text-sm text-gray-500 mt-2">{note}</p>
    </div>
  );
}
