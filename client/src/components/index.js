import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import AceEditor from 'react-ace'
import axios from 'axios'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const languages = ['javascript', 'c_cpp', 'python']
const modes = { javascript: 'js', c_cpp: 'cpp', python: 'py' }
const Homepage = () => {
  const [mode, setMode] = useState('javascript')
  const [userCode, setUserCode] = useState('')
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const modeHandle = (e) => {
    setMode(e.target.value)
  }

  useEffect(() => {
    axios.get('/code').then(({ data }) => setUserCode(data))
  }, [])

  const handlerun = () => {
    console.log('oka')
    axios
      .post('/code', {
        key: userCode,
        language: modes[mode],
        input: input,
        code: code,
      })
      .then(({ data }) => setOutput(data))
  }

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
            <select onChange={modeHandle}>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <button onClick={handlerun}>run</button>
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
              name="code_editor"
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
                name="input_editor"
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
                value={output}
                name="output_editor"
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
