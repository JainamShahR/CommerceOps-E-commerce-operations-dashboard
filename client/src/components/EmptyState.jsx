import { SearchX } from 'lucide-react';
export default function EmptyState({ message = 'Nothing found. Try a different search.' }) {
  return <div className="empty-state"><SearchX size={34}/><strong>No results</strong><p>{message}</p></div>;
}
