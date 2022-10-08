import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const Ace = () => {
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      height="100%"
      width="100%"
      fontSize={18}
      showPrintMargin={false}
      // onChange={onChange}
      // name="UNIQUE_ID_OF_DIV"
      //   editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  )
}

export default Ace
