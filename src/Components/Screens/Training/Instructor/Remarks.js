import React,{useState} from 'react'
import ReactPlayer from 'react-player/youtube';

const Remarks = () => {

    const [score, setScore] = useState('');
    const [showValidationMessage, setShowValidationMessage] = useState(false);

    const handleChangescore = (event) => {
      const inputValue = event.target.value;
      // Only allow numbers

      if (/^\d*$/.test(inputValue)) {
        setValue(inputValue);
      }
    
    //   setShowValidationMessage(!/^\d*$/.test(inputValue));
    };



    const [value, setValue] = useState('');
  const [wordCount, setWordCount] = useState(200);
  const MAX_WORDS = 200;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // const words = inputValue.split(' ');
    // Limit the textarea to the maximum number of words
    if (inputValue.length <= MAX_WORDS) {
      setValue(inputValue);
      setWordCount(inputValue.length);
    }
  };


    return (
        <div className='border m-2 p-2 '>
            <div class="card " >
                <div class="card-header title-md" style={{ background: "#F7F7F7", marginBottom: "0px" }}>
                    Training Objective
                </div>
            </div>
            <div className='row '>
                <div className='col-6 mt-2'>
                    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                </div>
                <div className='col-5 mx-5 mt-2'>

              
                       <form>
                       <label className="label form-label">Score</label>
                       {/* {showValidationMessage && <p style={{ color: 'red' }}>Only numbers are allowed.</p>} */}

<div class="input-wrapper"><div class="input-field ">
    <input class="form-control form-control-sm" type="text" value={score} onChange={handleChangescore} required />

</div></div>



<label className="label form-label">Remarks</label>

<div class="input-wrapper"><div class="input-field ">
    <textarea class="form-control form-control-sm"  value={value} onChange={handleChange} required />
</div>
<p>Maximum {wordCount} Characters</p>
</div>


<div className='mt-4' style={{float:"right"}}>
<button className='btn btn-primary'>Submit</button>
</div>

                       </form>
                   





                </div>
            </div>

            {/* <div class="card border" >

<div class="card-body ">
<h5 class="card-title title-md">Training Description</h5>
<p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p>

<a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div> */}



        </div>
    )
}

export default Remarks