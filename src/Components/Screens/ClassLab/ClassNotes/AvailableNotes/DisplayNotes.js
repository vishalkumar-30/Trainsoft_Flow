import React, { useState } from 'react';
import parse from 'html-react-parser';
import DropdownItem from '../../../../Common/DropdownItem/DropdownItem';
import "./style.css"
const DisplayNotes = (props) => {
    console.log(props)

    return (
        <><div class="page-title"><div class="title-lg mb-0">{props.location.state[1]}</div></div>
            <div>


                <div >
                    {props.location.state[0].map((res) => {

                        return (
                            <>
                                {
                                    res.contentType === "NOTES" ?

                                        <DropdownItem title={res.contentName} theme="dark">
                                            {
                                                <div className="noteList row">
                                                    <div className="labList-info flx5">
                                                        <div>

                                                            <div className="cat-title-sm px-2">
                                                                Section: {res.sectionName}
                                                                {parse(res.notesContent)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </DropdownItem>
                                        :
                                        res.contentType === "DOCUMENTS" || res.contentType === "EXTERNAL_LINK" ?
                                            <DropdownItem title={res.contentName} theme="dark">
                                                {
                                                    <div className="noteList row">
                                                        <div className='col' style={{ textAlign: "justify", fontSize: "15px", fontFamily: "math" }}>
                                                            {
                                                                res.screenshotContent !== null && res.screenshotContent.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <div>

                                                                                {parse(item)}
                                                                            </div>
                                                                            <hr />
                                                                        </>
                                                                    )

                                                                })
                                                            }
                                                        </div>

                                                        <div className='col'>
                                                            {res.notesFileName.length > 0 && res.notesFileName.map((item) => {
                                                                return (
                                                                    <>
                                                                        <div>

                                                                            <img src={item} alt="notes" className='img-fluid' />
                                                                        </div>
                                                                        <hr />
                                                                    </>
                                                                )

                                                            })}
                                                        </div>
                                                    </div>
                                                }
                                            </DropdownItem>
                                            :
                                            'No notes Available'

                                }
                            </>

                        )
                    }
                    )}

                </div>
            </div></>)
}

export default DisplayNotes