import React, { useState } from 'react'
import Editor from './Editor'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const languages = ['javascript', 'c++', 'python']
const Homepage = () => {
  const [mode, setMode] = useState('javascript')
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0 ">
        <div
          className="m-0 col-7 pr-1 p-0 d-flex flex-column"
          style={{ height: '100vh' }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ background: 'black', color: 'white' }}
          >
            <h1 className="">Code</h1>
            <select onChange={(e) => setMode(e.target.value)}>
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
              mode={mode}
              theme="monokai"
              height="100%"
              width="100%"
              value={code}
              fontSize={18}
              showPrintMargin={false}
              onChange={(val) => setCode(val)}
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
        </div>
        <div className="col-5 p-0">
          <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <div style={{ background: 'black', color: 'white' }}>
              <h1>Input</h1>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <AceEditor
                mode="text"
                theme="monokai"
                height="100%"
                width="100%"
                value={input}
                onChange={(val) => setInput(val)}
                fontSize={18}
                showPrintMargin={false}
              />
            </div>
            <div
              className="pt-1 mt-1"
              style={{ background: 'black', color: 'white' }}
            >
              <h1>Output</h1>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <AceEditor
                mode="text"
                theme="monokai"
                height="100%"
                width="100%"
                fontSize={18}
                showPrintMargin={false}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
