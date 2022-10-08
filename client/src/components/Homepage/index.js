// imports
// react
import React, { useEffect, useState } from "react";
// libraries
import AceEditor from "react-ace";
import axios from "axios";
import openSocket from "socket.io-client";
// ace
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-cobalt";
// custom
import useLocalStorage from "../../hooks/useLocalStorage";
import ModalBox from "../ModalBox";
// style
import "../../fonts/JetBrainsMono[wght].ttf";
import "./Homepage.css";

// global vars
var languages = ["python", "c_cpp", "javascript"];
const socket = openSocket("http://localhost:9000");
const modes = { javascript: "js", c_cpp: "cpp", python: "py" };
const defaultCode = {
  javascript: "console.log('hello rce')",
  c_cpp:
    '#include <iostream>\n\nint main() {\n\tstd::cout << "hello rce";\n\treturn 0;\n}',
  python: "print('hello rce')",
};

// component
const Homepage = () => {
  // cached state vars
  const [userCode, setUserCode] = useLocalStorage("userCode", "");
  const [mode, setMode] = useLocalStorage("mode", "python");
  const [code, setCode] = useLocalStorage("code", defaultCode[mode]);
  const [input, setInput] = useLocalStorage("input", "");
  const [joinedSessionCode, setJoinedSessionCode] = useLocalStorage(
    "joinedSessionCode",
    ""
  );
  // non cached state vars
  const [output, setOutput] = useState("");

  //code run on press of F5
  useEffect(() => {
    document.onkeydown = (keyDownEvent) => {
      if (keyDownEvent.altKey && keyDownEvent.key === "F5")
        document.getElementById("run-btn").click();
    };
  });

  // on load effect
  useEffect(() => {
    var now = new Date();
    var storeTime = JSON.parse(localStorage.getItem("na-rce-storeTime"));
    if (Math.ceil(Math.abs(now - storeTime) / (1000 * 60 * 60 * 24)) > 1) {
      setUserCode("");
      setJoinedSessionCode("");
      axios
        .get("/code")
        .then(({ data }) => {
          setUserCode(data);

          socket.emit("hostSession", {
            channelID: data,
          });
        })
        .catch((e) => console.log("error", e));
      localStorage.setItem(
        "na-rce-storeTime",
        JSON.stringify(new Date().getTime())
      );
    }
    if (userCode === "") {
      axios
        .get("/code")
        .then(({ data }) => {
          setUserCode(data);

          socket.emit("hostSession", {
            channelID: data,
          });
        })
        .catch((e) => console.log("error", e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on change in [joinedSessionCode] effect
  useEffect(() => {
    socket.emit("joinSession", {
      channelID: joinedSessionCode,
    });
  }, [joinedSessionCode]);

  // on change in [code, output, mode, input, userCode, joinedSessionCode] effect
  useEffect(() => {
    if (!joinedSessionCode) {
      socket.emit("realtime", {
        channelID: userCode,
        mode,
        code,
        input,
        output,
      });

      socket.on("initialLoad", () => {
        socket.emit("realtime", {
          channelID: userCode,
          mode,
          code,
          input,
          output,
        });
      });
    }
  }, [code, output, mode, input, userCode, joinedSessionCode]);

  // on change in [joinedSessionCode] effect
  useEffect(() => {
    if (joinedSessionCode) {
      socket.on("realReceive", (data) => {
        setMode(data.mode);
        setInput(data.input);
        setOutput(data.output);
        setCode(data.code);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinedSessionCode]);

  // language select handler
  const modeHandle = (e) => {
    setCode(defaultCode[e.target.value]);
    setMode(e.target.value);
  };

  // code run button handler
  const handlerun = () => {
    axios
      .post("/code", {
        key: userCode,
        language: modes[mode],
        input: input,
        code: code,
      })
      .then(({ data }) => {
        setOutput(data.toString());
      });
  };

  // component return
  return (
    <>
      <div className="modal-bg" id="hidden">
        <ModalBox
          userCode={userCode}
          setJoinedSessionCode={setJoinedSessionCode}
        />
      </div>
      <div className="nav">
        <h1 id="brand">
          {" "}
          &gt;codeBox{" "}
          {joinedSessionCode !== "" ? "joined: " + joinedSessionCode : ""}
        </h1>
        <div id="navigation">
          {joinedSessionCode !== "" ? (
            <button
              className="nav-btn"
              onClick={() => {
                socket.close();
                setJoinedSessionCode("");
                setInput("");
                setOutput("");
                setCode(defaultCode[mode]);
                window.location.reload();
              }}
            >
              <h2>disconnect</h2>
            </button>
          ) : (
            <></>
          )}
          <button
            className="nav-btn"
            onClick={() => {
              document.getElementsByClassName("modal-bg")[0].id = "";
            }}
          >
            <h2>session</h2>
          </button>
          <button
            className="nav-btn"
            onClick={() =>
              window.open(
                "https://github.com/nafees87n/codebox/blob/main/docs/DOCS.md"
              )
            }
          >
            <h2>docs</h2>
          </button>
          <button
            className="nav-btn"
            onClick={() => window.open("https://github.com/nafees87n/codebox")}
          >
            <h2>github</h2>
          </button>
        </div>
      </div>
      <div className="code-region">
        <div id="code-header">
          <h2 className="region-title">code</h2>
          <h2 className="region-title-divider">|</h2>
          {joinedSessionCode === "" ? (
            <>
              <select
                id="language-select"
                defaultValue={mode}
                value={mode}
                onChange={modeHandle}
              >
                {languages.map((lang) => {
                  return (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              <h2 className="region-title-divider">|</h2>
              <button id="run-btn" onClick={handlerun}>
                RUN (ALT + F5)
              </button>{" "}
            </>
          ) : (
            <>
              <h2 className="region-title">{mode}</h2>
            </>
          )}
        </div>
        <div className="general-editor">
          <AceEditor
            mode={mode}
            theme="cobalt"
            height="100%"
            width="2fr"
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
            highlightActiveLine={joinedSessionCode === "" ? true : false}
            readOnly={joinedSessionCode === "" ? false : true}
          />
        </div>
      </div>
      <div className="input-region">
        <div id="code-header">
          <h2 className="region-title">input</h2>
        </div>
        <div className="general-editor">
          <AceEditor
            mode="text"
            theme="cobalt"
            height="100%"
            width="1fr"
            value={input}
            name="input_editor"
            onChange={(val) => setInput(val)}
            fontSize={18}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={joinedSessionCode === "" ? true : false}
            readOnly={joinedSessionCode === "" ? false : true}
          />
        </div>
      </div>
      <div className="output-region">
        <div id="code-header">
          <h2 className="region-title">output</h2>
        </div>
        <div className="general-editor">
          <AceEditor
            mode="text"
            theme="cobalt"
            height="100%"
            width="1fr"
            value={output}
            name="output_editor"
            fontSize={18}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            readOnly={true}
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
