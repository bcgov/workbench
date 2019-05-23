import React from 'react';
import formatDistance from 'date-fns/formatDistance';

function DateTimeAgo({ date }) {
  return <time>{formatDistance(date, new Date())}</time>;
}

export default DateTimeAgo;
