import React, { useState } from 'react'
import './ModalBox.css'

const ModalBox = (props) => {
  const [newSessionId, setNewSessionId] = useState('')
  const { userCode, setJoinedSessionCode } = props
  return (
    <div className="modal-box">
      <div className="modal-btn-bar">
        <h2 className="white">Session Details</h2>
        <button
          className="rotate"
          onClick={() => {
            document.getElementsByClassName('modal-bg')[0].id = 'hidden'
          }}
        >
          +
        </button>
      </div>
      <h2 className="modal-title">YOUR SESSION:</h2>
      <div className="modal-current-session">
        <h3>Current session id is {userCode}</h3>
        <button
          className="nav-btn"
          onClick={() => {
            navigator.clipboard.writeText(userCode)
          }}
        >
          (COPY)
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
          className="black"
          onClick={() => {
            setJoinedSessionCode(newSessionId)
          }}
        >
          JOIN
        </button>
      </div>
    </div>
  )
}

export default ModalBox
