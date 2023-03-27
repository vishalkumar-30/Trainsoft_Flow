import React, { useState, useRef, useEffect, useContext } from 'react'
import { Language } from './Language';
import { Dropdown, Spinner } from 'react-bootstrap';
import { CustomToggle } from '../../../../Services/MethodFactory';
import axios from 'axios';
import { ICN_ARROW_DOWN, ICN_DOWNLOAD, ICN_FULL_SCREEN, ICN_PLAY, ICN_STAR_HALF } from '../../../Common/Icon';
import AppContext from '../../../../Store/AppContext';
import Editors from './Editor';
import './codeEditor.css'
import OutputIcon from '@mui/icons-material/Output';
import RestService from '../../../../Services/api.service';

const CodeEditor = (props) => {
    const { spinner } = useContext(AppContext);
    const [inputData, setInputData] = useState('');
    const editorRef = useRef(null);
    const [lang, setLang] = useState(Language[0]);
    const [lightTheams, setLightTheams] = useState(false);
    const [output, setOutput] = useState('');
    const [submitoutput, setSubmitoutput] = useState('');
    const [results, setResults] = useState('');
    const [inputTab, setInputTab] = useState(true);
    const [spinners, setSpinners] = useState(false);
    const [language, setLanguage] = useState();

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    //mark labs as complete
    const markCourseAsCompletedCode = () => {
        try {
            const trainingSid = props.trainingSid;
            const codingQuestionId = props.codingQuestionId;
            const sectionSid = props.sectionSid
            let payload = {
                "completedInDuration": 0,
                "totalDuration": 0
            }
            spinner.show();
            RestService.markCourseAsCompletedCode(codingQuestionId, sectionSid, trainingSid, payload).then(
                response => {
                    if (response.status === 200) {
                        console.log(response.data);
                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on markCourseAsCompletedCode()", err)
        }
    }

    //execute compiler
    const runCode = () => {
        setSpinners(true)
        const payload = {
            "stdin": inputData,
            "script": editorRef.current.getValue(),
            "language": lang.language,
        }
        axios.post(`https://trainsoft.live/insled/v1/jdoodle/execute`, payload)
            .then(({ data }) => {
                setOutput(data.output);
                setResults(data.codeAnalysis);
                setInputTab(false);
                setSpinners(false);
            })
    }

    //submit code for test cases
    const submitCode = async () => {
        const trainingSid = props.trainingSid;
        const codingQuestionId = props.codingQuestionId;
        setSpinners(true)
        const payload = {
            "code": editorRef.current.getValue(),

        }
        await axios.post(`https://trainsoft.live/insled/v1/jdoodle/evaluate?coding_question_id=${codingQuestionId}&training_sid=${trainingSid}`, payload)
            .then(({ data }) => {
                setSubmitoutput(data);
                markCourseAsCompletedCode();
                setSpinners(false);
            })
    }

    useEffect(() => {
        setOutput('');
        setInputTab('');
        setInputTab(true);
        setLanguage(lang.value)
    }, [lang])

    return (<>
        <div className="editor-wrapper">
            <div className="jcb">
                <div className=""></div>
                <div className="editor-tab">
                    <div>
                        <Dropdown className="dropdown-menus">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <div className="editor-tab-w">{lang.label} {ICN_ARROW_DOWN}</div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu as="div" align="right">
                                {Language.map(res => <Dropdown.Item onClick={() => setLang(res)}>{res.label}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="editor-btn">
                        <div onClick={() => runCode()}>
                            {spinners ? <><Spinner animation="border" size="sm" /></> : <div>{ICN_PLAY}</div>}
                        </div>
                        <div>
                            {ICN_DOWNLOAD}
                        </div>
                        <div className={`rotate-45 ${lightTheams ? '' : 'color-blue'}`} onClick={() => setLightTheams(!lightTheams)}>
                            <span >{ICN_STAR_HALF}</span>
                        </div>
                        <div>
                            {ICN_FULL_SCREEN}
                        </div>

                    </div>
                </div>
            </div>
            {/* <Editor
            height="100%"
            width="100%"
            defaultLanguage={lang.language}
            defaultValue={language}
            theme={lightTheams ? "vs-light" : "vs-dark"}
            onMount={handleEditorDidMount}
        /> */}
            <Editors {...{ lang, lightTheams, handleEditorDidMount }} />

            <div className="py-2 column">
                <div className="flx">
                    <div onClick={() => setInputTab(true)} className={`class-mode ${inputTab === true ? 'bg-primary' : ''}`}>Input</div>
                    <div onClick={() => setInputTab(false)} className={`class-mode ${inputTab === false ? 'bg-primary' : ''}`}>Output</div>
                    {/* <div onClick={() => setInputTab(review)} className={`class-mode ${inputTab === review ? 'bg-danger' : ''}`}>CodeReview</div> */}

                </div>
                {inputTab ?
                    <div className="editor-output">
                        <div><textarea rows="3" placeholder="Enter input" className="form-control" onChange={(e) => setInputData(e.target.value)} type="text" /></div>
                    </div >
                    :
                    <div className="editor-output p-3" style={{ height: "100%", background: "#ffffcc" }}>
                        <div>
                            <div ><h6> Your output : </h6></div><div className='text-md'>  {output}</div>

                            <div className='p-2 outputList' >
                                <p style={{ fontSize: "15px", fontWeight: "bold", color: '#00000094' }}>Code Review</p>

                                <p className='py-2' style={{ fontSize: "13px", fontWeight: "bold", color: '#00000094' }} >{results.split('\n')[2]}</p>
                                <p className='px-4' ><OutputIcon /> {results.split('\n')[3]}</p>
                                <hr />
                                <p className='py-2' style={{ fontSize: "13px", fontWeight: "bold", color: '#00000094' }}>{results.split('\n')[5]}</p>
                                <p className='px-4'> <OutputIcon /> {results.split('\n')[6]}</p>
                            </div>

                        </div>

                    </div>
                }
                {
                    props.trainingSid !==undefined ?
                    <div className='d-flex ' style={{ justifyContent: "space-between" }}>   <button className="class-mode bg-primary my-3" style={{ float: 'right' }} onClick={submitCode}>Submit</button>
                    <h4 className='title-md mt-3 ' >Hidden Test Cases :- {submitoutput}</h4></div>:""
                }
              
            </div>
        </div>
    </>)

}

export default CodeEditor