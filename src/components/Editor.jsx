import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike'; // for C++
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import { Controlled as ControlledEditorComponent } from 'react-codemirror2';


const Editor = ({ language, value, setEditorState }) => {
  const [theme, setTheme] = useState("material")
  const handleChange = (editor, data, value) => {
    setEditorState(value);
  }
  const themeArray = ['dracula', 'material', 'mdn-like', 'the-matrix', 'night']
  return (
    <div className="editor-container">
      <div style={{marginBottom: "10px"}}>
        <label style={{color: "#b6f1c5ff", backgroundColor: "#070807ef"}} htmlFor="themes">Choose a theme: </label>
        <select id="themes" name="theme" value={theme} onChange={(el) => {
          setTheme(el.target.value)
        }}>
          {themeArray.map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </div>
      <ControlledEditorComponent
        onBeforeChange={handleChange}
        value= {value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: theme,
          autoCloseTags: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          dragDrop: true,
          tabSize: 2,
          indentUnit: 2,
          indentWithTabs: true,
          smartIndent: true,
          styleActiveLine: { nonEmpty: true}
        }}
      />
    </div>
  )
}
export default Editor
