import React, { useState } from 'react'

const ModalBox = (props) => {
  const [newSessionId, setNewSessionId] = useState('')
  const { userCode, setJoinedSessionCode } = props
  return (
    <div className="modal-box">
      <button
        className="nav-btn"
        onClick={() => {
          document.getElementsByClassName('modal-bg')[0].id = 'hidden'
        }}
      >
        <h2>CLOSE</h2>
      </button>
      <h2 className="modal-title">YOUR SESSION:</h2>
      <div className="modal-current-session">
        <h3>Current session id is {userCode}</h3>
        <button
          className="nav-btn"
          onClick={() => {
            navigator.clipboard.writeText(userCode)
          }}
        >
          <h3>(COPY)</h3>
        </button>
      </div>
      <h2 className="modal-new-session">JOIN A SESSION?</h2>
      <div className="modal-current-session">
        <input
          id="modal-session-input"
          placeholder="Enter a session id"
          onChange={(event) => {
            setNewSessionId(event.target.value)
          }}
        ></input>
        <button
          className="nav-btn"
          onClick={() => {
            setJoinedSessionCode(newSessionId)
          }}
        >
          <h3>(JOIN)</h3>
        </button>
      </div>
    </div>
  )
}

export default ModalBox
