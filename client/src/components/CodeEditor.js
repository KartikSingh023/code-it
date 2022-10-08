import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldgutter.css'

const CodeEditor = ({ language }) => {
  return (
    <>
      <CodeMirror
        value={'hi'}
        options={{
          mode: { name: `${language}` },
          lineNumbers: true,
          theme: 'material',
          autoCloseBrackets: true,
          extraKeys: {
            Tab: 'autocomplete',
          },
        }}
        onBeforeChange={(editor, data, value) => {
          //   this.setState({ value })
        }}
        onChange={(editor, data, value) => {}}
      />
    </>
  )
}

export default CodeEditor
