type OverviewChartProps = {
  points: number[]; // values in range 0..100 (we'll map to SVG height)
  labels?: { start: string; end: string };
};

export default function OverviewChart({
  points,
  labels = { start: 'Jul 1', end: 'Jul 12' },
}: OverviewChartProps) {
  const width = 800;  // will scale via viewBox
  const height = 180;
  const padding = 16;

  const stepX = (width - padding * 2) / (points.length - 1);
  const scaled = points.map((v, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - v / 100) * (height - padding * 2);
    return { x, y };
  });

  const poly = scaled.map(p => `${p.x},${p.y}`).join(' ');

  const gridLines = 5; // horizontal grid lines
  const gridYs = Array.from({ length: gridLines + 1 }, (_, i) =>
    padding + (i * (height - padding * 2)) / gridLines
  );

  return (
    <div className="chart-wrap">
      <svg
        className="chart"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-label="Monthly spending trend"
      >
        {/* Grid */}
        {gridYs.map((y, i) => (
          <line
            key={i}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Line */}
        <polyline
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          points={poly}
        />

        {/* Points */}
        {scaled.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0f172a" />
        ))}
      </svg>

      <div className="axis-labels">
        <span>{labels.start}</span>
        <span>{labels.end}</span>
      </div>
    </div>
  );
}