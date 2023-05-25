import React, { useEffect } from 'react';
import "./labs.css"

const LabSpinner = () => {
  useEffect(() => {
    const isLast = (word) => {
      return word.nextElementSibling ? false : true;
    };

    const getNext = (word) => {
      return word.nextElementSibling;
    };

    const getVisible = () => {
      return document.getElementsByClassName('is-visible')[0];
    };

    const getFirst = () => {
      return document.querySelector('.words-wrapper').firstElementChild;
    };

    const switchWords = (current, next) => {
      current.classList.remove('is-visible');
      current.classList.add('is-hidden');
      next.classList.remove('is-hidden');
      next.classList.add('is-visible');
    };

    const getStarted = () => {
      const first = getVisible();
      const next = getNext(first);

      if (next) {
        switchWords(first, next);
      } else {
        first.classList.remove('is-visible');
        first.classList.add('is-hidden');
        const newEl = getFirst();
        newEl.classList.remove('is-hidden');
        newEl.classList.add('is-visible');
      }
    };

    const init = () => {
      setInterval(() => {
        getStarted();
      }, 5000);
    };

    init();
  }, []);
  return (
    <>

      <div id="circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" fill="#EFA4A3">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial" fontSize="32px" fontWeight="bold">
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.3; 1; 0.3"></animate>
            GnosisLabs
          </text>
        </svg>
      </div>


      <div className="newtext">
        <h2>
          <span className="words-wrapper">
            <b className="is-visible">Setting up Stuff...</b>
            <b>Loading things...</b>
            <b>Refreshing objects...</b>
          </span>
        </h2>
      </div>


    </>
  )
}

export default LabSpinner