import React from 'react'
import Ace from './Ace'
import CodeEditor from './CodeEditor'

const Homepage = () => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0 ">
        <div
          className="m-0 col-7 pr-1 p-0 d-flex flex-column"
          style={{ height: '100vh' }}
        >
          <div style={{ background: 'black', color: 'white' }}>
            <h1>Code</h1>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <Ace />
          </div>
        </div>
        <div className="col-5 p-0">
          <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <div style={{ background: 'black', color: 'white' }}>
              <h1>Input</h1>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <Ace />
            </div>
            <div style={{ background: 'black', color: 'white' }}>
              <h1>Output</h1>
            </div>
            <div className="pt-1" style={{ width: '100%', height: '100%' }}>
              <Ace />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
