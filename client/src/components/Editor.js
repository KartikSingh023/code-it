import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
const languages = ['javascript', 'c++', 'python']
const Editor = () => {
  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ background: 'black', color: 'white' }}
      >
        <h1 className="">Code</h1>
        <select>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button>run</button>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <AceEditor
          mode="python"
          theme="monokai"
          height="100%"
          width="100%"
          fontSize={18}
          showPrintMargin={false}
          // onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          //   editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
    </>
  )
}

export default Editor
