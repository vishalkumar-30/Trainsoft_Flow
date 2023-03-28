import React,{useState,useEffect} from 'react'

import ReactSpeedometer from "react-d3-speedometer";
import "./style.css"

const SkillsLevelGraph = () => {
  const [finalRotation, setFinalRotation] = useState('180deg');
  // Set the Setfinal rotation value as per the below table
  // perc skill       weightage
  // 25%->Expert      100
  // -10%->profiecitn  80
  // -40%->competent   60
  // -80%->Advanced    40 
  // -100%->beginner   20

  useEffect(()=>{
    setFinalRotation('20deg');
  },[])
  return (
    <div >
          {/* <div>
      <ReactSpeedometer
        width={540}
        height={300}
        needleHeightRatio={0.8}
        value={400}
  
       
        currentValueText="Skill Meter"
        
        segmentColors={['#E3D0EF', '#C7A1DF', '#AA72CE','#8E43BE', '#7214AE']}
        customSegmentLabels={[
          {
            text: "Begineer",
            color: "rgb(73 22 126 / 24%)",
         
            position:"OUTSIDE",
         
          },
          {
            text: "Elementry",
            color: "#C7A1DF",
           
            position:"OUTSIDE"
          },
          {
            text: "Intermediate",
            color: "#AA72CE",
           
            position:"OUTSIDE"
          },
          {
            text: "Advanced",
            color: "#8E43BE",
         
            position:"OUTSIDE"
          },
          {
            text: "Proficient",
            color: "#7214AE",
          
            position:"OUTSIDE"
          },
         
         
          
        ]}
        ringWidth={40}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={"#49167E"}
        textColor={"#000000"}
      />
    </div> */}
<svg width="auto" height="285" viewBox="0 0 666 285" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.24 226L4.04 212H10.02C11.3667 212 12.42 212.253 13.18 212.76C13.94 213.267 14.32 214.007 14.32 214.98C14.32 215.887 14.1 216.647 13.66 217.26C13.22 217.86 12.64 218.313 11.92 218.62C11.2133 218.927 10.4467 219.08 9.62 219.08L10.06 218.62C11.18 218.62 12.0667 218.88 12.72 219.4C13.3867 219.907 13.72 220.66 13.72 221.66C13.72 222.593 13.4733 223.387 12.98 224.04C12.5 224.693 11.8133 225.187 10.92 225.52C10.0267 225.84 8.96667 226 7.74 226H1.24ZM2.94 224.78H7.86C9.26 224.78 10.34 224.513 11.1 223.98C11.8733 223.447 12.26 222.68 12.26 221.68C12.26 220.88 11.98 220.32 11.42 220C10.8733 219.68 10.0667 219.52 9 219.52H3.74L3.98 218.3H8.7C9.5 218.3 10.2067 218.187 10.82 217.96C11.4467 217.733 11.9333 217.393 12.28 216.94C12.6267 216.473 12.8 215.907 12.8 215.24C12.8 214.547 12.5333 214.04 12 213.72C11.4667 213.387 10.7133 213.22 9.74 213.22H5.24L2.94 224.78ZM20.8181 226.1C19.8181 226.1 18.9448 225.92 18.1981 225.56C17.4648 225.187 16.8981 224.667 16.4981 224C16.1115 223.333 15.9181 222.54 15.9181 221.62C15.9181 220.42 16.1715 219.353 16.6781 218.42C17.1848 217.487 17.8781 216.753 18.7581 216.22C19.6381 215.673 20.6315 215.4 21.7381 215.4C22.6715 215.4 23.4781 215.58 24.1581 215.94C24.8381 216.287 25.3648 216.793 25.7381 217.46C26.1248 218.127 26.3181 218.927 26.3181 219.86C26.3181 220.073 26.3048 220.293 26.2781 220.52C26.2515 220.733 26.2181 220.94 26.1781 221.14H16.9581L17.1381 220.08H25.5181L24.9381 220.48C25.0715 219.64 25.0115 218.933 24.7581 218.36C24.5048 217.787 24.1115 217.353 23.5781 217.06C23.0581 216.753 22.4315 216.6 21.6981 216.6C20.8448 216.6 20.0848 216.813 19.4181 217.24C18.7515 217.653 18.2315 218.233 17.8581 218.98C17.4848 219.713 17.2981 220.573 17.2981 221.56C17.2981 222.613 17.5981 223.427 18.1981 224C18.8115 224.56 19.7248 224.84 20.9381 224.84C21.6448 224.84 22.2981 224.727 22.8981 224.5C23.4981 224.26 23.9915 223.933 24.3781 223.52L25.0181 224.54C24.5248 225.033 23.9048 225.42 23.1581 225.7C22.4248 225.967 21.6448 226.1 20.8181 226.1ZM31.9684 229.98C30.9951 229.98 30.1084 229.84 29.3084 229.56C28.5084 229.293 27.8351 228.907 27.2884 228.4L28.1284 227.32C28.5551 227.747 29.1084 228.087 29.7884 228.34C30.4818 228.593 31.2418 228.72 32.0684 228.72C33.4018 228.72 34.4351 228.413 35.1684 227.8C35.9018 227.187 36.3884 226.24 36.6284 224.96L37.1884 222.2L37.7284 220.48L37.9484 218.68L38.5684 215.5H39.9284L38.0884 224.72C37.7284 226.573 37.0484 227.913 36.0484 228.74C35.0484 229.567 33.6884 229.98 31.9684 229.98ZM32.6684 225.6C31.7484 225.6 30.9351 225.427 30.2284 225.08C29.5351 224.733 28.9951 224.247 28.6084 223.62C28.2218 222.98 28.0284 222.227 28.0284 221.36C28.0284 220.507 28.1751 219.72 28.4684 219C28.7618 218.28 29.1751 217.653 29.7084 217.12C30.2418 216.573 30.8751 216.153 31.6084 215.86C32.3418 215.553 33.1484 215.4 34.0284 215.4C34.8684 215.4 35.6151 215.547 36.2684 215.84C36.9218 216.133 37.4351 216.573 37.8084 217.16C38.1951 217.747 38.3884 218.493 38.3884 219.4C38.4018 220.547 38.1751 221.593 37.7084 222.54C37.2418 223.473 36.5818 224.22 35.7284 224.78C34.8751 225.327 33.8551 225.6 32.6684 225.6ZM32.9484 224.34C33.8284 224.34 34.6084 224.14 35.2884 223.74C35.9818 223.34 36.5284 222.793 36.9284 222.1C37.3284 221.393 37.5284 220.593 37.5284 219.7C37.5284 218.74 37.2218 217.993 36.6084 217.46C35.9951 216.913 35.1418 216.64 34.0484 216.64C33.1684 216.64 32.3818 216.84 31.6884 217.24C30.9951 217.64 30.4484 218.193 30.0484 218.9C29.6618 219.593 29.4684 220.387 29.4684 221.28C29.4684 222.24 29.7751 222.993 30.3884 223.54C31.0018 224.073 31.8551 224.34 32.9484 224.34ZM41.7798 226L43.8598 215.5H45.2798L43.1998 226H41.7798ZM45.1798 213.18C44.8998 213.18 44.6665 213.087 44.4798 212.9C44.3065 212.713 44.2198 212.493 44.2198 212.24C44.2198 211.947 44.3198 211.693 44.5198 211.48C44.7332 211.267 44.9998 211.16 45.3198 211.16C45.5998 211.16 45.8332 211.247 46.0198 211.42C46.2065 211.593 46.2998 211.813 46.2998 212.08C46.2998 212.4 46.1932 212.667 45.9798 212.88C45.7665 213.08 45.4998 213.18 45.1798 213.18ZM54.3709 215.4C55.3176 215.4 56.0909 215.587 56.6909 215.96C57.3043 216.32 57.7243 216.847 57.9509 217.54C58.1909 218.233 58.2109 219.06 58.0109 220.02L56.8109 226H55.3909L56.5909 220C56.8043 218.96 56.6909 218.147 56.2509 217.56C55.8243 216.973 55.0643 216.68 53.9709 216.68C52.8509 216.68 51.9176 216.987 51.1709 217.6C50.4376 218.213 49.9443 219.133 49.6909 220.36L48.5709 226H47.1509L49.2309 215.5H50.5909L49.9909 218.52L49.6909 218C50.1976 217.093 50.8509 216.433 51.6509 216.02C52.4643 215.607 53.3709 215.4 54.3709 215.4ZM67.8866 215.4C68.8332 215.4 69.6066 215.587 70.2066 215.96C70.8199 216.32 71.2399 216.847 71.4666 217.54C71.7066 218.233 71.7266 219.06 71.5266 220.02L70.3266 226H68.9066L70.1066 220C70.3199 218.96 70.2066 218.147 69.7666 217.56C69.3399 216.973 68.5799 216.68 67.4866 216.68C66.3666 216.68 65.4332 216.987 64.6866 217.6C63.9532 218.213 63.4599 219.133 63.2066 220.36L62.0866 226H60.6666L62.7466 215.5H64.1066L63.5066 218.52L63.2066 218C63.7132 217.093 64.3666 216.433 65.1666 216.02C65.9799 215.607 66.8866 215.4 67.8866 215.4ZM78.9822 226.1C77.9822 226.1 77.1089 225.92 76.3622 225.56C75.6289 225.187 75.0622 224.667 74.6622 224C74.2755 223.333 74.0822 222.54 74.0822 221.62C74.0822 220.42 74.3355 219.353 74.8422 218.42C75.3489 217.487 76.0422 216.753 76.9222 216.22C77.8022 215.673 78.7955 215.4 79.9022 215.4C80.8355 215.4 81.6422 215.58 82.3222 215.94C83.0022 216.287 83.5289 216.793 83.9022 217.46C84.2889 218.127 84.4822 218.927 84.4822 219.86C84.4822 220.073 84.4689 220.293 84.4422 220.52C84.4155 220.733 84.3822 220.94 84.3422 221.14H75.1222L75.3022 220.08H83.6822L83.1022 220.48C83.2355 219.64 83.1755 218.933 82.9222 218.36C82.6689 217.787 82.2755 217.353 81.7422 217.06C81.2222 216.753 80.5955 216.6 79.8622 216.6C79.0089 216.6 78.2489 216.813 77.5822 217.24C76.9155 217.653 76.3955 218.233 76.0222 218.98C75.6489 219.713 75.4622 220.573 75.4622 221.56C75.4622 222.613 75.7622 223.427 76.3622 224C76.9755 224.56 77.8889 224.84 79.1022 224.84C79.8089 224.84 80.4622 224.727 81.0622 224.5C81.6622 224.26 82.1555 223.933 82.5422 223.52L83.1822 224.54C82.6889 225.033 82.0689 225.42 81.3222 225.7C80.5889 225.967 79.8089 226.1 78.9822 226.1ZM86.2525 226L88.3325 215.5H89.6925L89.0925 218.6L88.9325 218.06C89.3992 217.14 90.0125 216.467 90.7725 216.04C91.5458 215.613 92.5058 215.4 93.6525 215.4L93.3925 216.78C93.3258 216.78 93.2592 216.78 93.1925 216.78C93.1392 216.767 93.0725 216.76 92.9925 216.76C91.8725 216.76 90.9458 217.087 90.2125 217.74C89.4925 218.38 88.9992 219.353 88.7325 220.66L87.6725 226H86.2525Z" fill="#AEB0B6"/>
<path d="M604.1 218.26H611.5L611.26 219.52H603.86L604.1 218.26ZM602.96 224.72H611.38L611.12 226H601.24L604.04 212H613.64L613.38 213.28H605.24L602.96 224.72ZM612.386 226L618.046 220.2L617.886 220.9L614.766 215.5H616.266L618.866 220.04L618.226 220.02L622.586 215.5H624.226L618.846 221.04L618.966 220.24L622.306 226H620.786L618.046 221.2H618.686L614.066 226H612.386ZM630.55 226.1C629.643 226.1 628.863 225.94 628.21 225.62C627.57 225.287 627.076 224.813 626.73 224.2C626.396 223.573 626.223 222.82 626.21 221.94C626.21 220.647 626.443 219.513 626.91 218.54C627.376 217.553 628.036 216.787 628.89 216.24C629.743 215.68 630.75 215.4 631.91 215.4C632.816 215.4 633.61 215.58 634.29 215.94C634.983 216.287 635.523 216.793 635.91 217.46C636.31 218.127 636.51 218.92 636.51 219.84C636.51 220.747 636.363 221.58 636.07 222.34C635.776 223.1 635.356 223.76 634.81 224.32C634.276 224.88 633.65 225.32 632.93 225.64C632.21 225.947 631.416 226.1 630.55 226.1ZM623.93 229.88L626.79 215.5H628.15L627.55 218.52L626.97 220.62L626.75 222.82L625.35 229.88H623.93ZM630.53 224.84C631.41 224.84 632.19 224.633 632.87 224.22C633.55 223.793 634.083 223.207 634.47 222.46C634.87 221.713 635.07 220.867 635.07 219.92C635.07 218.88 634.77 218.073 634.17 217.5C633.57 216.927 632.716 216.64 631.61 216.64C630.743 216.64 629.963 216.853 629.27 217.28C628.59 217.707 628.05 218.293 627.65 219.04C627.263 219.773 627.07 220.62 627.07 221.58C627.07 222.607 627.37 223.407 627.97 223.98C628.57 224.553 629.423 224.84 630.53 224.84ZM643.064 226.1C642.064 226.1 641.191 225.92 640.444 225.56C639.711 225.187 639.144 224.667 638.744 224C638.358 223.333 638.164 222.54 638.164 221.62C638.164 220.42 638.418 219.353 638.924 218.42C639.431 217.487 640.124 216.753 641.004 216.22C641.884 215.673 642.878 215.4 643.984 215.4C644.918 215.4 645.724 215.58 646.404 215.94C647.084 216.287 647.611 216.793 647.984 217.46C648.371 218.127 648.564 218.927 648.564 219.86C648.564 220.073 648.551 220.293 648.524 220.52C648.498 220.733 648.464 220.94 648.424 221.14H639.204L639.384 220.08H647.764L647.184 220.48C647.318 219.64 647.258 218.933 647.004 218.36C646.751 217.787 646.358 217.353 645.824 217.06C645.304 216.753 644.678 216.6 643.944 216.6C643.091 216.6 642.331 216.813 641.664 217.24C640.998 217.653 640.478 218.233 640.104 218.98C639.731 219.713 639.544 220.573 639.544 221.56C639.544 222.613 639.844 223.427 640.444 224C641.058 224.56 641.971 224.84 643.184 224.84C643.891 224.84 644.544 224.727 645.144 224.5C645.744 224.26 646.238 223.933 646.624 223.52L647.264 224.54C646.771 225.033 646.151 225.42 645.404 225.7C644.671 225.967 643.891 226.1 643.064 226.1ZM650.335 226L652.415 215.5H653.775L653.175 218.6L653.015 218.06C653.481 217.14 654.095 216.467 654.855 216.04C655.628 215.613 656.588 215.4 657.735 215.4L657.475 216.78C657.408 216.78 657.341 216.78 657.275 216.78C657.221 216.767 657.155 216.76 657.075 216.76C655.955 216.76 655.028 217.087 654.295 217.74C653.575 218.38 653.081 219.353 652.815 220.66L651.755 226H650.335ZM661.995 226.1C661.395 226.1 660.882 225.973 660.455 225.72C660.028 225.453 659.728 225.08 659.555 224.6C659.395 224.12 659.382 223.547 659.515 222.88L661.435 213.18H662.855L660.935 222.82C660.802 223.473 660.848 223.98 661.075 224.34C661.315 224.7 661.748 224.88 662.375 224.88C662.668 224.88 662.955 224.84 663.235 224.76C663.515 224.667 663.768 224.527 663.995 224.34L664.335 225.42C664.002 225.673 663.628 225.853 663.215 225.96C662.802 226.053 662.395 226.1 661.995 226.1ZM658.875 216.68L659.095 215.5H665.595L665.355 216.68H658.875Z" fill="#AEB0B6"/>
<path d="M293.82 19.12C292.433 19.12 291.253 18.88 290.28 18.4C289.307 17.9067 288.56 17.2267 288.04 16.36C287.533 15.48 287.28 14.46 287.28 13.3C287.28 12.1533 287.473 11.0733 287.86 10.06C288.26 9.04667 288.827 8.15333 289.56 7.38C290.307 6.59333 291.2 5.98 292.24 5.54C293.293 5.1 294.48 4.88 295.8 4.88C296.92 4.88 297.913 5.05333 298.78 5.4C299.647 5.74667 300.313 6.25333 300.78 6.92L299.74 7.84C299.3 7.29333 298.747 6.88667 298.08 6.62C297.413 6.34 296.613 6.2 295.68 6.2C294.627 6.2 293.667 6.38667 292.8 6.76C291.947 7.12 291.22 7.62667 290.62 8.28C290.02 8.93333 289.553 9.68667 289.22 10.54C288.9 11.38 288.74 12.28 288.74 13.24C288.74 14.1333 288.933 14.9267 289.32 15.62C289.72 16.3 290.307 16.8333 291.08 17.22C291.853 17.6067 292.8 17.8 293.92 17.8C294.84 17.8 295.673 17.66 296.42 17.38C297.167 17.1 297.82 16.6867 298.38 16.14L299.24 17.12C298.627 17.7733 297.847 18.2733 296.9 18.62C295.953 18.9533 294.927 19.12 293.82 19.12ZM305.526 19.1C304.553 19.1 303.706 18.92 302.986 18.56C302.28 18.1867 301.726 17.6667 301.326 17C300.94 16.3333 300.746 15.5467 300.746 14.64C300.746 13.44 301.006 12.3733 301.526 11.44C302.046 10.4933 302.766 9.75333 303.686 9.22C304.606 8.67333 305.653 8.4 306.826 8.4C307.8 8.4 308.64 8.58 309.346 8.94C310.066 9.3 310.62 9.81333 311.006 10.48C311.406 11.1467 311.606 11.9333 311.606 12.84C311.606 14.04 311.346 15.1133 310.826 16.06C310.306 16.9933 309.586 17.7333 308.666 18.28C307.76 18.8267 306.713 19.1 305.526 19.1ZM305.626 17.84C306.506 17.84 307.286 17.6333 307.966 17.22C308.66 16.7933 309.2 16.2067 309.586 15.46C309.986 14.7133 310.186 13.8667 310.186 12.92C310.186 11.88 309.88 11.0733 309.266 10.5C308.666 9.92667 307.82 9.64 306.726 9.64C305.86 9.64 305.08 9.85333 304.386 10.28C303.693 10.7067 303.146 11.2933 302.746 12.04C302.36 12.7733 302.166 13.62 302.166 14.58C302.166 15.6067 302.466 16.4067 303.066 16.98C303.68 17.5533 304.533 17.84 305.626 17.84ZM328.345 8.4C329.292 8.4 330.059 8.58667 330.645 8.96C331.245 9.32 331.659 9.84667 331.885 10.54C332.112 11.2333 332.125 12.06 331.925 13.02L330.725 19H329.305L330.505 13C330.719 11.96 330.619 11.1467 330.205 10.56C329.805 9.97333 329.072 9.68 328.005 9.68C326.952 9.68 326.065 9.97333 325.345 10.56C324.639 11.1467 324.165 12.0267 323.925 13.2L322.765 19H321.345L322.545 13C322.759 11.96 322.659 11.1467 322.245 10.56C321.832 9.97333 321.099 9.68 320.045 9.68C318.965 9.68 318.072 9.98667 317.365 10.6C316.659 11.2133 316.179 12.1333 315.925 13.36L314.805 19H313.385L315.465 8.5H316.825L316.225 11.52L315.925 11C316.432 10.0933 317.072 9.43333 317.845 9.02C318.619 8.60667 319.492 8.4 320.465 8.4C321.199 8.4 321.825 8.52667 322.345 8.78C322.879 9.02 323.292 9.38 323.585 9.86C323.892 10.3267 324.059 10.8867 324.085 11.54L323.345 11.38C323.865 10.38 324.552 9.63333 325.405 9.14C326.272 8.64667 327.252 8.4 328.345 8.4ZM340.436 19.1C339.53 19.1 338.75 18.94 338.096 18.62C337.456 18.2867 336.963 17.8133 336.616 17.2C336.283 16.5733 336.11 15.82 336.096 14.94C336.096 13.6467 336.33 12.5133 336.796 11.54C337.263 10.5533 337.923 9.78667 338.776 9.24C339.63 8.68 340.636 8.4 341.796 8.4C342.703 8.4 343.496 8.58 344.176 8.94C344.87 9.28667 345.41 9.79333 345.796 10.46C346.196 11.1267 346.396 11.92 346.396 12.84C346.396 13.7467 346.25 14.58 345.956 15.34C345.663 16.1 345.243 16.76 344.696 17.32C344.163 17.88 343.536 18.32 342.816 18.64C342.096 18.9467 341.303 19.1 340.436 19.1ZM333.816 22.88L336.676 8.5H338.036L337.436 11.52L336.856 13.62L336.636 15.82L335.236 22.88H333.816ZM340.416 17.84C341.296 17.84 342.076 17.6333 342.756 17.22C343.436 16.7933 343.97 16.2067 344.356 15.46C344.756 14.7133 344.956 13.8667 344.956 12.92C344.956 11.88 344.656 11.0733 344.056 10.5C343.456 9.92667 342.603 9.64 341.496 9.64C340.63 9.64 339.85 9.85333 339.156 10.28C338.476 10.7067 337.936 11.2933 337.536 12.04C337.15 12.7733 336.956 13.62 336.956 14.58C336.956 15.6067 337.256 16.4067 337.856 16.98C338.456 17.5533 339.31 17.84 340.416 17.84ZM352.951 19.1C351.951 19.1 351.078 18.92 350.331 18.56C349.598 18.1867 349.031 17.6667 348.631 17C348.244 16.3333 348.051 15.54 348.051 14.62C348.051 13.42 348.304 12.3533 348.811 11.42C349.318 10.4867 350.011 9.75333 350.891 9.22C351.771 8.67333 352.764 8.4 353.871 8.4C354.804 8.4 355.611 8.58 356.291 8.94C356.971 9.28667 357.498 9.79333 357.871 10.46C358.258 11.1267 358.451 11.9267 358.451 12.86C358.451 13.0733 358.438 13.2933 358.411 13.52C358.384 13.7333 358.351 13.94 358.311 14.14H349.091L349.271 13.08H357.651L357.071 13.48C357.204 12.64 357.144 11.9333 356.891 11.36C356.638 10.7867 356.244 10.3533 355.711 10.06C355.191 9.75333 354.564 9.6 353.831 9.6C352.978 9.6 352.218 9.81333 351.551 10.24C350.884 10.6533 350.364 11.2333 349.991 11.98C349.618 12.7133 349.431 13.5733 349.431 14.56C349.431 15.6133 349.731 16.4267 350.331 17C350.944 17.56 351.858 17.84 353.071 17.84C353.778 17.84 354.431 17.7267 355.031 17.5C355.631 17.26 356.124 16.9333 356.511 16.52L357.151 17.54C356.658 18.0333 356.038 18.42 355.291 18.7C354.558 18.9667 353.778 19.1 352.951 19.1ZM363.561 19.1C362.961 19.1 362.448 18.9733 362.021 18.72C361.595 18.4533 361.295 18.08 361.121 17.6C360.961 17.12 360.948 16.5467 361.081 15.88L363.001 6.18H364.421L362.501 15.82C362.368 16.4733 362.415 16.98 362.641 17.34C362.881 17.7 363.315 17.88 363.941 17.88C364.235 17.88 364.521 17.84 364.801 17.76C365.081 17.6667 365.335 17.5267 365.561 17.34L365.901 18.42C365.568 18.6733 365.195 18.8533 364.781 18.96C364.368 19.0533 363.961 19.1 363.561 19.1ZM360.441 9.68L360.661 8.5H367.161L366.921 9.68H360.441ZM372.775 19.1C371.775 19.1 370.902 18.92 370.155 18.56C369.422 18.1867 368.855 17.6667 368.455 17C368.068 16.3333 367.875 15.54 367.875 14.62C367.875 13.42 368.128 12.3533 368.635 11.42C369.142 10.4867 369.835 9.75333 370.715 9.22C371.595 8.67333 372.588 8.4 373.695 8.4C374.628 8.4 375.435 8.58 376.115 8.94C376.795 9.28667 377.322 9.79333 377.695 10.46C378.082 11.1267 378.275 11.9267 378.275 12.86C378.275 13.0733 378.262 13.2933 378.235 13.52C378.208 13.7333 378.175 13.94 378.135 14.14H368.915L369.095 13.08H377.475L376.895 13.48C377.028 12.64 376.968 11.9333 376.715 11.36C376.462 10.7867 376.068 10.3533 375.535 10.06C375.015 9.75333 374.388 9.6 373.655 9.6C372.802 9.6 372.042 9.81333 371.375 10.24C370.708 10.6533 370.188 11.2333 369.815 11.98C369.442 12.7133 369.255 13.5733 369.255 14.56C369.255 15.6133 369.555 16.4267 370.155 17C370.768 17.56 371.682 17.84 372.895 17.84C373.602 17.84 374.255 17.7267 374.855 17.5C375.455 17.26 375.948 16.9333 376.335 16.52L376.975 17.54C376.482 18.0333 375.862 18.42 375.115 18.7C374.382 18.9667 373.602 19.1 372.775 19.1ZM387.265 8.4C388.212 8.4 388.985 8.58667 389.585 8.96C390.199 9.32 390.619 9.84667 390.845 10.54C391.085 11.2333 391.105 12.06 390.905 13.02L389.705 19H388.285L389.485 13C389.699 11.96 389.585 11.1467 389.145 10.56C388.719 9.97333 387.959 9.68 386.865 9.68C385.745 9.68 384.812 9.98667 384.065 10.6C383.332 11.2133 382.839 12.1333 382.585 13.36L381.465 19H380.045L382.125 8.5H383.485L382.885 11.52L382.585 11C383.092 10.0933 383.745 9.43333 384.545 9.02C385.359 8.60667 386.265 8.4 387.265 8.4ZM396.901 19.1C396.301 19.1 395.788 18.9733 395.361 18.72C394.934 18.4533 394.634 18.08 394.461 17.6C394.301 17.12 394.288 16.5467 394.421 15.88L396.341 6.18H397.761L395.841 15.82C395.708 16.4733 395.754 16.98 395.981 17.34C396.221 17.7 396.654 17.88 397.281 17.88C397.574 17.88 397.861 17.84 398.141 17.76C398.421 17.6667 398.674 17.5267 398.901 17.34L399.241 18.42C398.908 18.6733 398.534 18.8533 398.121 18.96C397.708 19.0533 397.301 19.1 396.901 19.1ZM393.781 9.68L394.001 8.5H400.501L400.261 9.68H393.781Z" fill="#AEB0B6"/>
<path d="M513.58 85L516.38 71H522.04C523.787 71 525.133 71.3867 526.08 72.16C527.04 72.92 527.52 73.9867 527.52 75.36C527.52 76.5333 527.247 77.56 526.7 78.44C526.153 79.3067 525.367 79.9733 524.34 80.44C523.327 80.9067 522.12 81.14 520.72 81.14H516.18L517.9 79.66L516.84 85H513.58ZM517.82 80.04L516.68 78.5H520.86C521.927 78.5 522.753 78.26 523.34 77.78C523.94 77.2867 524.24 76.5733 524.24 75.64C524.24 74.96 524.013 74.46 523.56 74.14C523.107 73.8067 522.467 73.64 521.64 73.64H517.7L519.42 72.06L517.82 80.04ZM527.814 85L529.954 74.24H532.914L532.294 77.3L532.014 76.42C532.494 75.5533 533.12 74.9467 533.894 74.6C534.667 74.2533 535.594 74.08 536.674 74.08L536.114 76.96C535.98 76.9467 535.854 76.94 535.734 76.94C535.627 76.9267 535.514 76.92 535.394 76.92C534.474 76.92 533.72 77.1467 533.134 77.6C532.56 78.0533 532.174 78.7867 531.974 79.8L530.934 85H527.814ZM541.891 85.16C540.797 85.16 539.844 84.96 539.031 84.56C538.217 84.16 537.584 83.6 537.131 82.88C536.691 82.16 536.471 81.3133 536.471 80.34C536.471 79.14 536.751 78.0733 537.311 77.14C537.871 76.1933 538.637 75.4467 539.611 74.9C540.597 74.3533 541.717 74.08 542.971 74.08C544.077 74.08 545.031 74.28 545.831 74.68C546.644 75.08 547.271 75.64 547.711 76.36C548.164 77.0667 548.391 77.9133 548.391 78.9C548.391 80.0867 548.111 81.1533 547.551 82.1C546.991 83.0467 546.224 83.7933 545.251 84.34C544.277 84.8867 543.157 85.16 541.891 85.16ZM542.091 82.6C542.704 82.6 543.244 82.4533 543.711 82.16C544.191 81.8533 544.564 81.4333 544.831 80.9C545.097 80.3667 545.231 79.7467 545.231 79.04C545.231 78.32 545.017 77.74 544.591 77.3C544.164 76.86 543.564 76.64 542.791 76.64C542.177 76.64 541.631 76.7933 541.151 77.1C540.684 77.3933 540.311 77.8067 540.031 78.34C539.764 78.8733 539.631 79.4933 539.631 80.2C539.631 80.9333 539.844 81.52 540.271 81.96C540.697 82.3867 541.304 82.6 542.091 82.6ZM549.717 85L551.957 73.86C552.197 72.6867 552.703 71.7533 553.477 71.06C554.263 70.3533 555.317 70 556.637 70C557.13 70 557.59 70.0533 558.017 70.16C558.443 70.2533 558.81 70.4 559.117 70.6L557.897 72.84C557.537 72.5867 557.123 72.46 556.657 72.46C556.177 72.46 555.803 72.5933 555.537 72.86C555.27 73.1133 555.077 73.52 554.957 74.08L554.737 75.08L554.577 76.34L552.857 85H549.717ZM549.677 76.88L550.157 74.48H557.617L557.137 76.88H549.677ZM557.257 85L559.397 74.24H562.497L560.357 85H557.257ZM561.477 72.74C560.93 72.74 560.49 72.5867 560.157 72.28C559.823 71.96 559.657 71.5733 559.657 71.12C559.657 70.5867 559.843 70.1467 560.217 69.8C560.603 69.44 561.103 69.26 561.717 69.26C562.263 69.26 562.703 69.4133 563.037 69.72C563.383 70.0133 563.557 70.38 563.557 70.82C563.557 71.3933 563.363 71.86 562.977 72.22C562.603 72.5667 562.103 72.74 561.477 72.74ZM568.943 85.16C567.836 85.16 566.869 84.96 566.043 84.56C565.229 84.16 564.596 83.6 564.143 82.88C563.689 82.16 563.463 81.3133 563.463 80.34C563.463 79.14 563.743 78.0733 564.303 77.14C564.863 76.1933 565.636 75.4467 566.623 74.9C567.609 74.3533 568.743 74.08 570.023 74.08C571.169 74.08 572.163 74.32 573.003 74.8C573.843 75.2667 574.463 75.9333 574.863 76.8L572.223 78.12C571.996 77.6133 571.676 77.2467 571.263 77.02C570.863 76.78 570.383 76.66 569.823 76.66C569.209 76.66 568.663 76.8133 568.183 77.12C567.703 77.4133 567.323 77.8267 567.043 78.36C566.763 78.88 566.623 79.4867 566.623 80.18C566.623 80.9133 566.836 81.5 567.263 81.94C567.703 82.3667 568.323 82.58 569.123 82.58C569.669 82.58 570.169 82.4667 570.623 82.24C571.076 82 571.456 81.6333 571.763 81.14L574.063 82.58C573.556 83.3933 572.849 84.0267 571.943 84.48C571.049 84.9333 570.049 85.16 568.943 85.16ZM575.021 85L577.161 74.24H580.261L578.121 85H575.021ZM579.241 72.74C578.694 72.74 578.254 72.5867 577.921 72.28C577.587 71.96 577.421 71.5733 577.421 71.12C577.421 70.5867 577.607 70.1467 577.981 69.8C578.367 69.44 578.867 69.26 579.481 69.26C580.027 69.26 580.467 69.4133 580.801 69.72C581.147 70.0133 581.321 70.38 581.321 70.82C581.321 71.3933 581.127 71.86 580.741 72.22C580.367 72.5667 579.867 72.74 579.241 72.74ZM586.737 85.16C585.617 85.16 584.643 84.96 583.817 84.56C583.003 84.16 582.37 83.6 581.917 82.88C581.463 82.16 581.237 81.3133 581.237 80.34C581.237 79.14 581.503 78.0733 582.037 77.14C582.583 76.1933 583.33 75.4467 584.277 74.9C585.237 74.3533 586.337 74.08 587.577 74.08C588.63 74.08 589.537 74.28 590.297 74.68C591.057 75.0667 591.643 75.6133 592.057 76.32C592.483 77.0133 592.697 77.8467 592.697 78.82C592.697 79.1 592.677 79.38 592.637 79.66C592.61 79.94 592.57 80.2067 592.517 80.46H583.617L583.937 78.64H591.057L589.777 79.2C589.883 78.6 589.85 78.1 589.677 77.7C589.503 77.2867 589.223 76.9733 588.837 76.76C588.45 76.5333 587.983 76.42 587.437 76.42C586.757 76.42 586.177 76.5867 585.697 76.92C585.23 77.24 584.877 77.6867 584.637 78.26C584.397 78.8333 584.277 79.48 584.277 80.2C584.277 81.0267 584.503 81.6467 584.957 82.06C585.423 82.46 586.123 82.66 587.057 82.66C587.603 82.66 588.13 82.5733 588.637 82.4C589.143 82.2267 589.577 81.98 589.937 81.66L591.237 83.72C590.61 84.2133 589.903 84.58 589.117 84.82C588.343 85.0467 587.55 85.16 586.737 85.16ZM601.975 74.08C602.895 74.08 603.675 74.2733 604.315 74.66C604.955 75.0333 605.409 75.5867 605.675 76.32C605.942 77.0533 605.969 77.96 605.755 79.04L604.555 85H601.435L602.595 79.24C602.755 78.4533 602.689 77.8467 602.395 77.42C602.115 76.9933 601.595 76.78 600.835 76.78C600.049 76.78 599.389 77.0067 598.855 77.46C598.335 77.9133 597.975 78.6067 597.775 79.54L596.695 85H593.575L595.715 74.24H598.675L598.055 77.28L597.615 76.36C598.135 75.5733 598.775 75 599.535 74.64C600.309 74.2667 601.122 74.08 601.975 74.08ZM611.783 85.16C611.01 85.16 610.35 85.0067 609.803 84.7C609.257 84.38 608.863 83.9267 608.623 83.34C608.397 82.74 608.363 82.0333 608.523 81.22L610.383 71.86H613.503L611.643 81.2C611.563 81.6533 611.61 82.0133 611.783 82.28C611.957 82.5467 612.277 82.68 612.743 82.68C612.957 82.68 613.17 82.6467 613.383 82.58C613.61 82.5133 613.817 82.42 614.003 82.3L614.463 84.52C614.077 84.76 613.65 84.9267 613.183 85.02C612.717 85.1133 612.25 85.16 611.783 85.16ZM607.723 76.88L608.203 74.48H615.663L615.183 76.88H607.723Z" fill="black"/>
<path d="M75 85L84.2 71H85.66L89.26 85H87.78L84.5 71.82H85.1L76.6 85H75ZM78.26 81.26L78.94 80.06H87.08L87.3 81.26H78.26ZM95.6583 85.1C94.7649 85.1 93.9716 84.92 93.2783 84.56C92.5849 84.2 92.0449 83.6867 91.6583 83.02C91.2716 82.3533 91.0783 81.56 91.0783 80.64C91.0783 79.7467 91.2249 78.92 91.5183 78.16C91.8116 77.4 92.2249 76.74 92.7583 76.18C93.2916 75.6067 93.9183 75.1667 94.6383 74.86C95.3716 74.5533 96.1649 74.4 97.0183 74.4C97.9383 74.4 98.7183 74.5667 99.3583 74.9C99.9983 75.22 100.492 75.6933 100.838 76.32C101.185 76.9333 101.358 77.68 101.358 78.56C101.358 79.5067 101.225 80.38 100.958 81.18C100.705 81.98 100.325 82.6733 99.8183 83.26C99.3116 83.8467 98.7049 84.3 97.9983 84.62C97.3049 84.94 96.5249 85.1 95.6583 85.1ZM95.9583 83.84C96.8383 83.84 97.6183 83.6333 98.2983 83.22C98.9916 82.7933 99.5316 82.2067 99.9183 81.46C100.318 80.7133 100.518 79.8667 100.518 78.92C100.518 77.88 100.212 77.0733 99.5983 76.5C98.9983 75.9267 98.1516 75.64 97.0583 75.64C96.1916 75.64 95.4116 75.8533 94.7183 76.28C94.0249 76.7067 93.4783 77.2933 93.0783 78.04C92.6916 78.7733 92.4983 79.62 92.4983 80.58C92.4983 81.6067 92.7983 82.4067 93.3983 82.98C94.0116 83.5533 94.8649 83.84 95.9583 83.84ZM99.4183 85L100.018 81.98L100.618 79.86L100.818 77.66L102.318 70.16H103.738L100.778 85H99.4183ZM107.453 85L104.853 74.5H106.273L108.633 84.24H107.953L114.193 74.5H115.673L108.893 85H107.453ZM119.76 85.1C118.867 85.1 118.073 84.92 117.38 84.56C116.687 84.2 116.147 83.6867 115.76 83.02C115.373 82.3533 115.18 81.56 115.18 80.64C115.18 79.7467 115.327 78.92 115.62 78.16C115.913 77.4 116.327 76.74 116.86 76.18C117.393 75.6067 118.02 75.1667 118.74 74.86C119.473 74.5533 120.267 74.4 121.12 74.4C122.04 74.4 122.82 74.5667 123.46 74.9C124.1 75.22 124.593 75.6933 124.94 76.32C125.287 76.9333 125.46 77.68 125.46 78.56C125.46 79.8267 125.227 80.9533 124.76 81.94C124.293 82.9267 123.633 83.7 122.78 84.26C121.927 84.82 120.92 85.1 119.76 85.1ZM120.06 83.84C120.94 83.84 121.72 83.6333 122.4 83.22C123.093 82.7933 123.633 82.2067 124.02 81.46C124.42 80.7133 124.62 79.8667 124.62 78.92C124.62 77.88 124.313 77.0733 123.7 76.5C123.1 75.9267 122.253 75.64 121.16 75.64C120.293 75.64 119.513 75.8533 118.82 76.28C118.127 76.7067 117.58 77.2933 117.18 78.04C116.793 78.7733 116.6 79.62 116.6 80.58C116.6 81.6067 116.9 82.4067 117.5 82.98C118.113 83.5533 118.967 83.84 120.06 83.84ZM123.52 85L124.12 81.98L124.72 79.86L124.92 77.66L125.56 74.5H126.98L124.88 85H123.52ZM136.055 74.4C137.001 74.4 137.775 74.5867 138.375 74.96C138.988 75.32 139.408 75.8467 139.635 76.54C139.875 77.2333 139.895 78.06 139.695 79.02L138.495 85H137.075L138.275 79C138.488 77.96 138.375 77.1467 137.935 76.56C137.508 75.9733 136.748 75.68 135.655 75.68C134.535 75.68 133.601 75.9867 132.855 76.6C132.121 77.2133 131.628 78.1333 131.375 79.36L130.255 85H128.835L130.915 74.5H132.275L131.675 77.52L131.375 77C131.881 76.0933 132.535 75.4333 133.335 75.02C134.148 74.6067 135.055 74.4 136.055 74.4ZM147.11 85.1C146.11 85.1 145.243 84.92 144.51 84.56C143.79 84.1867 143.23 83.6667 142.83 83C142.443 82.3333 142.25 81.5467 142.25 80.64C142.25 79.44 142.51 78.3733 143.03 77.44C143.55 76.4933 144.27 75.7533 145.19 75.22C146.123 74.6733 147.183 74.4 148.37 74.4C149.343 74.4 150.177 74.58 150.87 74.94C151.577 75.2867 152.123 75.8067 152.51 76.5L151.31 77.2C151.017 76.6667 150.61 76.2733 150.09 76.02C149.583 75.7667 148.97 75.64 148.25 75.64C147.37 75.64 146.583 75.8533 145.89 76.28C145.197 76.7067 144.65 77.2933 144.25 78.04C143.863 78.7733 143.67 79.62 143.67 80.58C143.67 81.6067 143.97 82.4067 144.57 82.98C145.183 83.5533 146.05 83.84 147.17 83.84C147.85 83.84 148.477 83.7133 149.05 83.46C149.637 83.1933 150.117 82.8133 150.49 82.32L151.51 83.1C151.057 83.7267 150.437 84.22 149.65 84.58C148.863 84.9267 148.017 85.1 147.11 85.1ZM158.244 85.1C157.244 85.1 156.371 84.92 155.624 84.56C154.891 84.1867 154.324 83.6667 153.924 83C153.537 82.3333 153.344 81.54 153.344 80.62C153.344 79.42 153.597 78.3533 154.104 77.42C154.611 76.4867 155.304 75.7533 156.184 75.22C157.064 74.6733 158.057 74.4 159.164 74.4C160.097 74.4 160.904 74.58 161.584 74.94C162.264 75.2867 162.791 75.7933 163.164 76.46C163.551 77.1267 163.744 77.9267 163.744 78.86C163.744 79.0733 163.731 79.2933 163.704 79.52C163.677 79.7333 163.644 79.94 163.604 80.14H154.384L154.564 79.08H162.944L162.364 79.48C162.497 78.64 162.437 77.9333 162.184 77.36C161.931 76.7867 161.537 76.3533 161.004 76.06C160.484 75.7533 159.857 75.6 159.124 75.6C158.271 75.6 157.511 75.8133 156.844 76.24C156.177 76.6533 155.657 77.2333 155.284 77.98C154.911 78.7133 154.724 79.5733 154.724 80.56C154.724 81.6133 155.024 82.4267 155.624 83C156.237 83.56 157.151 83.84 158.364 83.84C159.071 83.84 159.724 83.7267 160.324 83.5C160.924 83.26 161.417 82.9333 161.804 82.52L162.444 83.54C161.951 84.0333 161.331 84.42 160.584 84.7C159.851 84.9667 159.071 85.1 158.244 85.1ZM169.994 85.1C169.101 85.1 168.308 84.92 167.614 84.56C166.921 84.2 166.381 83.6867 165.994 83.02C165.608 82.3533 165.414 81.56 165.414 80.64C165.414 79.7467 165.561 78.92 165.854 78.16C166.148 77.4 166.561 76.74 167.094 76.18C167.628 75.6067 168.254 75.1667 168.974 74.86C169.708 74.5533 170.501 74.4 171.354 74.4C172.274 74.4 173.054 74.5667 173.694 74.9C174.334 75.22 174.828 75.6933 175.174 76.32C175.521 76.9333 175.694 77.68 175.694 78.56C175.694 79.5067 175.561 80.38 175.294 81.18C175.041 81.98 174.661 82.6733 174.154 83.26C173.648 83.8467 173.041 84.3 172.334 84.62C171.641 84.94 170.861 85.1 169.994 85.1ZM170.294 83.84C171.174 83.84 171.954 83.6333 172.634 83.22C173.328 82.7933 173.868 82.2067 174.254 81.46C174.654 80.7133 174.854 79.8667 174.854 78.92C174.854 77.88 174.548 77.0733 173.934 76.5C173.334 75.9267 172.488 75.64 171.394 75.64C170.528 75.64 169.748 75.8533 169.054 76.28C168.361 76.7067 167.814 77.2933 167.414 78.04C167.028 78.7733 166.834 79.62 166.834 80.58C166.834 81.6067 167.134 82.4067 167.734 82.98C168.348 83.5533 169.201 83.84 170.294 83.84ZM173.754 85L174.354 81.98L174.954 79.86L175.154 77.66L176.654 70.16H178.074L175.114 85H173.754Z" fill="#AEB0B6"/>
<path d="M585 284.451C587.761 284.451 590.005 282.212 589.949 279.451C588.929 229.164 572.543 180.347 542.932 139.591L447.286 209.082C445.052 210.705 444.566 213.826 446.097 216.124C458.637 234.944 465.756 256.856 466.673 279.452C466.785 282.211 469.013 284.451 471.775 284.451H585Z" fill="#7214AE"/>
<path d="M542.963 139.633C512.38 97.5208 469.251 66.1716 419.756 50.0782L390.819 139.072C389.966 141.698 391.406 144.511 394.002 145.454C421.715 155.512 445.829 173.643 463.197 197.56L542.963 139.633Z" fill="#7214AE" fill-opacity="0.8"/>
<path d="M267.479 50.0338C217.975 66.0982 174.827 97.4222 144.22 139.516L180.042 165.563C182.276 167.187 185.398 166.688 187.078 164.496C211.347 132.839 244.677 109.254 282.693 96.9172L267.479 50.0338Z" fill="#7214AE" fill-opacity="0.4"/>
<path d="M144.248 139.479C114.614 180.218 98.2 229.026 97.1519 279.313C97.0943 282.074 99.3369 284.314 102.098 284.315L116.743 284.324C119.505 284.325 121.739 282.087 121.803 279.326C122.844 234.245 137.606 190.506 164.178 153.976L144.248 139.479Z" fill="#7214AE" fill-opacity="0.2"/>
<path d="M419.81 50.0958C370.319 33.991 317 33.9675 267.495 50.0287L288.768 115.599C289.62 118.226 292.439 119.657 295.089 118.881C328.378 109.138 363.875 109.645 396.932 120.402L419.81 50.0958Z" fill="#7214AE" fill-opacity="0.6"/>
<path class="needle" d="M417.292 195.434C418.743 194.92 420.206 196.17 419.926 197.683L414.366 227.69C414.278 228.165 414.021 228.592 413.643 228.892L351.234 278.473C349.514 279.84 347.168 277.836 348.248 275.924L387.451 206.523C387.688 206.103 388.07 205.783 388.525 205.622L417.292 195.434Z" fill="#5CC9EE"  style={{ '--final-rotation': finalRotation }}/>
</svg>


  
    </div>
  )
}

export default SkillsLevelGraph