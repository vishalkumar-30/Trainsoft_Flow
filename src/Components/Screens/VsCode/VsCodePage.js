import React, { useEffect } from 'react'

import GLOBELCONSTANT from "../../../Constant/GlobleConstant"
import { Button } from '../../Common/Buttons/Buttons'

const VsCodePage = ()=>{

  

    const onOpen =()=>{
        window.open(' https://do.trainsoft.live/')
    }

    return(<>
    <div className="table-shadow mt-2 py-5 aic">
        <div className="">
            <Button onClick={()=>onOpen()}>Open VS Code Editor</Button>
        </div>
    </div>
        {/* <object type="text/html" data={GLOBELCONSTANT.VSCODE_PATH} style={{ width: "100%", height: "100%" }}>
            <p className="px-4">Loading... VsCode</p>
        </object>  */}
    </>)
}
export default VsCodePage 