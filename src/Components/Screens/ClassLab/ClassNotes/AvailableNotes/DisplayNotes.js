import React, { useState } from 'react';
import parse from 'html-react-parser';
import DropdownItem from '../../../../Common/DropdownItem/DropdownItem';
import "./style.css"
const DisplayNotes = (props) => {
    return (
        <><div class="page-title"><div class="title-lg mb-0">{ props.location.state[1]}</div></div>
        <div>
        
          
            <div >
                {props.location.state[0].map((res) => {
                    return (
                        <DropdownItem title={res.sessionName} theme="dark">
                        {
                                <div className="noteList row">
                                    <div className="labList-info flx5">
                                        <div>
                                            <div className="cat-title-sm px-2">{parse(res.notesContent)}</div>
                                        </div>
                                    </div>
                                </div>
                        }
                        </DropdownItem>
                    )
                }
                )}

            </div>
        </div></>)
}

export default DisplayNotes