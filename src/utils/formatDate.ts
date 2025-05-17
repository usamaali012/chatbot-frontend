export function formatDate(date: Date): string {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Same day
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  }
  
  // Yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Within the last 7 days
  const diff = now.getTime() - date.getTime();
  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 7) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }
  
  // Otherwise show the date
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric' 
  }).format(date);
}