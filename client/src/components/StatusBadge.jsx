export default function StatusBadge({ status }) {
  const normalized = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`status status--${normalized}`}><span className="status-dot"/>{status}</span>;
}
