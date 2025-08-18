import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getParamByISO } from 'iso-country-currency';

export default function Chart() {
  const chartData = [
    { day: '1st', amount: 180, label: '1st' },
    { day: '2nd', amount: 120, label: '2nd' },
    { day: '3rd', amount: 45, label: '3rd' },
    { day: '4th', amount: 80, label: '4th' },
    { day: '5th', amount: 85, label: '5th' },
    { day: '6th', amount: 160, label: '6th' },
    { day: '7th', amount: 165, label: '7th' },
    { day: '8th', amount: 110, label: '8th' },
    { day: '9th', amount: 65, label: '9th' },
    { day: '10th', amount: 55, label: '10th' },
    { day: '11th', amount: 95, label: '11th' },
    { day: '12th', amount: 120, label: '12th' },
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg text-gray-600 mb-2">Monthly Overview July</h3>
        <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          {getParamByISO('GH', 'currency')} 1,982.10
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-500 text-sm">▲ (+75%)</span>
          <span className="text-gray-500 text-sm">more Last 2 Weeks</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 0, left: -30, bottom: 20 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
            />
            <YAxis
              domain={[0, 180]}
              ticks={[0, 45, 90, 135, 180]}
              axisLine={false}
              tickLine={false}
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
                          {getParamByISO('GH', 'currency')} {payload[0].value}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6B7280"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#6B7280', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
