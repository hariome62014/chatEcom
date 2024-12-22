import React from 'react';

function HighlightText({ text }) {
  return (
    <span className='bg-gradient-to-r from-blue-500 via-teal-400 to-green-300 text-transparent bg-clip-text font-bold'>
        &nbsp;{text}
    </span>
  );
}

export default HighlightText;
