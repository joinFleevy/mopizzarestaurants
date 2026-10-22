/**
 * Business hours utility for MO PIZZA restaurants.
 * Branches are open 7 days a week: 11:30 AM to 01:00 AM (next morning) in Algeria Time (Africa/Algiers, UTC+1).
 */
export function getBranchStatus() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Algiers',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric'
    });
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const timeValue = hour + minute / 60;

    // Open from 11:30 AM (11.5) to 01:00 AM (1.0)
    // 00:00 - 01:00 (midnight to 1 AM) is open
    // 11:30 - 23:59 is open
    // 01:00 - 11:30 is closed
    const isOpen = timeValue >= 11.5 || timeValue < 1.0;

    return {
      isOpen,
      timeString: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    };
  } catch (err) {
    // Graceful fallback: assume open during daytime hours
    return { isOpen: true, timeString: '12:00' };
  }
}
