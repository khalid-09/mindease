'use client';

import React, { useEffect, useState } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('/api/quote');
        const data = await response.json();
        setQuote(data[0].q);
      } catch (error) {
        console.error('Error fetching the quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <h1 className="text-2xl">{quote ? quote : 'Getting your quote.....'}</h1>
  );
};

export default Quote;
