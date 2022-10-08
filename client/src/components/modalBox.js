import React from 'react'

function ModalBox(props) {
  const { userCode } = props
  return (
    <div className="modal-box">
      <button
        onClick={() => {
          document.getElementsByClassName('modal-bg')[0].id = 'hidden'
        }}
      >
        CLOSE
      </button>
      <h2 className="modal-title">YOUR SESSION:</h2>
      <div className="modal-current-session">
        <h3>Current session id is {userCode}</h3>
        <button className="nav-btn">
          <h3>(COPY)</h3>
        </button>
      </div>
      <h2 className="modal-new-session">JOIN A SESSION?</h2>
      <div className="modal-current-session">
        <input
          id="modal-session-input"
          placeholder="Enter a session id"
        ></input>
        <button className="nav-btn">
          <h3>(JOIN)</h3>
        </button>
      </div>
    </div>
  )
}

export default ModalBox
