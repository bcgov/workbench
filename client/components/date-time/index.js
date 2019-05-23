import React from 'react';
import format from 'date-fns/format';

const DateTime = ({ date = new Date(), formatString = 'LLL do, yyyy' }) => (
  <time
    dateTime={format(date, 'yyyy-MM-d')}
    title={format(date, 'LLL do, yyyy')}
  >
    {format(date, formatString)}
  </time>
);

export default DateTime;
