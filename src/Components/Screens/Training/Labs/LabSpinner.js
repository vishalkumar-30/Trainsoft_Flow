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
      }, 3000);
    };

    init();
  }, []);
  return (
    <>

      <div id="circle">
        <svg className="S" width="80px" height="80px" viewBox="0 0 42 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Desktop-+expanded-Copy-4" transform="translate(-615.000000, -353.000000)">
              <g id="Group-2" transform="translate(583.000000, 323.000000)">
                <g id="Group-Copy" transform="translate(32.000000, 30.000000)">
                  <path d="M25.7938508,26.1361607 C25.7938508,28.4129578 25.2200158,30.434422 24.0723286,32.2006138 C22.9246414,33.9668057 21.2696681,35.3395598 19.1073589,36.3189174 C16.9450497,37.298275 14.4085327,37.7879464 11.4977319,37.7879464 C9.06929229,37.7879464 7.03176227,37.6163522 5.38508065,37.2731585 C3.73839902,36.9299648 2.02521051,36.3314775 0.24546371,35.4776786 L0.24546371,26.6383929 C2.1250094,27.6093799 4.07937493,28.3669058 6.10861895,28.9109933 C8.13786297,29.4550808 10.0007476,29.7271205 11.6973286,29.7271205 C13.1610456,29.7271205 14.2338676,29.4718217 14.9158266,28.9612165 C15.5977857,28.4506113 15.9387601,27.7935308 15.9387601,26.9899554 C15.9387601,26.4877207 15.8015387,26.048272 15.5270917,25.671596 C15.2526448,25.29492 14.811873,24.9140644 14.2047631,24.5290179 C13.5976532,24.1439713 11.9801039,23.3571488 9.35206653,22.1685268 C6.97352641,21.0803517 5.18964808,20.0256747 4.00037802,19.0044643 C2.81110796,17.9832538 1.92956436,16.8113905 1.35572077,15.4888393 C0.781877171,14.166288 0.494959677,12.6010135 0.494959677,10.7929687 C0.494959677,7.41125541 1.71747769,4.77456303 4.1625504,2.8828125 C6.60762311,0.99106197 9.96746855,0.0452008929 14.2421875,0.0452008929 C18.017912,0.0452008929 21.868428,0.924098354 25.7938508,2.68191964 L22.7749496,10.3409598 C19.3651543,8.76729124 16.4211313,7.98046875 13.9427923,7.98046875 C12.66204,7.98046875 11.7305977,8.20647095 11.1484375,8.65848214 C10.5662773,9.11049333 10.2752016,9.67131362 10.2752016,10.3409598 C10.2752016,11.0608295 10.6452836,11.7053543 11.3854587,12.2745536 C12.1256337,12.8437528 14.1340562,13.8816889 17.4107863,15.3883929 C20.5544512,16.811391 22.7375191,18.3389985 23.9600554,19.9712612 C25.1825918,21.6035238 25.7938508,23.6584698 25.7938508,26.1361607 Z" id="S" fill="#000000" />
                  <ellipse id="Oval" fill="#86BC25" cx="36.3225806" cy="33" rx="5.67741935" ry="5.71428571" />
                </g>
              </g>
            </g>
          </g>
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