import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getParamByISO } from 'iso-country-currency';
import { isAfter, isBefore, subDays, startOfDay, format } from 'date-fns';

type Transaction = {
  date: string; // ISO string expected
  amount: number | string;
};

export default function Chart({ transactions }: { transactions: Transaction[] }) {
  const currency = getParamByISO('GH', 'currency') || 'GHS';

  const today = startOfDay(new Date());

  // Ranges
  const startCurrent = subDays(today, 14);
  const startPrevious = subDays(today, 28);
  const endPrevious = subDays(today, 15);

  // Group transactions
  const currentTwoWeeks = transactions.filter((txn) => {
    const date = new Date(txn.date);
    return isAfter(date, startCurrent) && isBefore(date, today);
  });

  const previousTwoWeeks = transactions.filter((txn) => {
    const date = new Date(txn.date);
    return isAfter(date, startPrevious) && isBefore(date, endPrevious);
  });

  const sumAmount = (txns: typeof transactions) =>
    txns.reduce((sum, t) => sum + (parseFloat(t.amount as string) || 0), 0);

  const currentTotal = sumAmount(currentTwoWeeks);
  const previousTotal = sumAmount(previousTwoWeeks);

  let percentChange: number | null = null;

  if (previousTotal > 0) {
    percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
  }

  const dailyTotalsMap = new Map<string, number>();
  let earliestDate: Date | null = null;

  // Parse and group transactions by day
  transactions.forEach((txn) => {
    if (!txn.date) return;

    const dateObj = new Date(txn.date);
    const dateLabel = format(dateObj, 'd MMM');
    const amount = parseFloat(txn.amount as string) || 0;

    dailyTotalsMap.set(dateLabel, (dailyTotalsMap.get(dateLabel) || 0) + amount);

    // Track earliest date
    if (!earliestDate || dateObj < earliestDate) {
      earliestDate = dateObj;
    }
  });

  // If only one data point, inject a dummy previous day with 0 amount
  if (dailyTotalsMap.size === 1 && earliestDate) {
    const dayBefore = subDays(earliestDate, 1);
    const labelBefore = format(dayBefore, 'd MMM');
    dailyTotalsMap.set(labelBefore, 0);
  }

  // Sort data for chart
  const sortedChartData = Array.from(dailyTotalsMap.entries())
    .map(([label, amount]) => ({ label, amount }))
    .sort((a, b) => {
      const [dayA] = a.label.split(' ');
      const [dayB] = b.label.split(' ');
      return parseInt(dayA) - parseInt(dayB);
    }).reverse();

  const monthlyTotal = sortedChartData.reduce((sum, day) => sum + day.amount, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg text-gray-600 mb-2">
          Monthly Overview {format(new Date(), 'MMMM')}
        </h3>
        <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          {currency} {monthlyTotal.toFixed(2)}
        </div>
        {percentChange !== null ? (
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentChange >= 0 ? '▲' : '▼'} ({Math.abs(percentChange).toFixed(1)}%)
            </span>
            <span className="text-gray-500 text-sm">compared to previous 2 weeks</span>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Not enough data to compare</span>
        )}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedChartData} margin={{ top: 20, right: 0, left: -30, bottom: 20 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
            />
            <YAxis
              domain={[0, 'dataMax + 50']}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm">
                        Amount:{' '}
                        <span className="font-semibold">
                          {currency} {payload[0].value.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{
                stroke: '#6B7280',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6B7280"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#6B7280',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
