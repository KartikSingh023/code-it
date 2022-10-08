import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-language_tools'

const languages = ['python', 'c_cpp', 'javascript']
const modes = { javascript: 'js', c_cpp: 'cpp', python: 'py' }
const defaultCode = {
  javascript: "console.log('hello rce')",
  c_cpp:
    '#include <iostream>\n\nint main() {\n\tstd::cout << "hello rce";\n\treturn 0;\n}',
  python: "print('hello rce')",
}

const Homepage = () => {
  const [mode, setMode] = useState('python')
  const [userCode, setUserCode] = useState('')
  const [code, setCode] = useState(defaultCode[mode])
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const modeHandle = (e) => {
    setCode(defaultCode[e.target.value])
    setMode(e.target.value)
  }

  useEffect(() => {
    axios.get('/code').then(({ data }) => setUserCode(data))
  }, [])

  const handlerun = () => {
    axios
      .post('/code', {
        key: userCode,
        language: modes[mode],
        input: input,
        code: code,
      })
      .then(({ data }) => {
        console.log(data)
        setOutput(data.toString())
      })
  }

  return (
    <div
      className="container-fluid m-0 p-0"
      style={{ background: 'rgb(1, 30, 58)' }}
    >
      <div
        className="container-fluid p-2"
        style={{ width: '100%', height: '7vh', background: 'white' }}
      >
        <h1>code/online</h1>
      </div>
      <div className="row m-0 p-0">
        <div
          className="m-0 col-7 pr-1 p-0 d-flex flex-column"
          style={{ height: '100vh' }}
        >
          <div
            className="d-flex justify-content-left"
            style={{ background: 'rgb(1, 30, 58)', color: 'white' }}
          >
            <h2 className="">code</h2>
            <h2 style={{ fontWeight: 'lighter' }}>|</h2>
            <select
              onChange={modeHandle}
              style={{
                background: 'rgb(1, 30, 58)',
                color: 'white',
                borderColor: 'transparent',
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
            <h2 style={{ fontWeight: 'lighter' }}>|</h2>
            <button
              onClick={handlerun}
              style={{
                background: 'rgb(1, 30, 58)',
                color: 'white',
                borderColor: 'transparent',
                textDecorationLine: 'underline',
              }}
            >
              RUN
            </button>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <AceEditor
              mode={mode}
              theme="cobalt"
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
            <div style={{ background: 'rgb(1, 30, 58)', color: 'white' }}>
              <h2>input</h2>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <AceEditor
                mode="text"
                theme="cobalt"
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
              style={{ background: 'rgb(1, 30, 58)', color: 'white' }}
            >
              <h2>output</h2>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <AceEditor
                mode="text"
                theme="cobalt"
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
