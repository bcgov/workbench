import inRange from 'lodash/inRange';

export function timeOfDay(): string {
  const now = new Date();
  const hour = now.getHours();

  if (inRange(hour, 6, 11)) {
    return 'morning';
  } else if (inRange(hour, 11, 18)) {
    return 'afternoon';
  } else if (inRange(hour, 18, 24)) {
    return 'evening';
  } else if (inRange(hour, 0, 6)) {
    return 'very early morning';
  }

  return 'day';
}
