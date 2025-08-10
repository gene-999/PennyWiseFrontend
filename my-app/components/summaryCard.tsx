type SummaryCardProps = {
  title: string;
  value: string;
  note: string;
};

export default function SummaryCard({ title, value, note }: SummaryCardProps) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <p className="card-value">{value}</p>
      <p className="card-note">{note}</p>
    </div>
  );
}