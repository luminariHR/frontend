import React from 'react'
import BeforeMatch from './BeforeMatch.jsx';
import AfterMatch from './AfterMatch.jsx';

const MentoringPage = () => {
  const isMatched = false;

  return (
        <>
            {isMatched ? <AfterMatch /> : <BeforeMatch
            />}
        </>
    );
}

export default MentoringPage;