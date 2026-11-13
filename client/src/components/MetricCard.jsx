export default function MetricCard({ label, value, Icon, theme = 'indigo', note }) {
  return <div className="metric-card">
    <div className="metric-top"><span>{label}</span><span className={`metric-icon metric-icon--${theme}`}><Icon size={20}/></span></div>
    <strong>{value}</strong><small>{note}</small>
  </div>;
}
