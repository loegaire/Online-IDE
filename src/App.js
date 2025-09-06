import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Editor from './components/Editor';
import RunButton from './components/RunButton';
import Output from './components/Output'; 
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import React, { useState } from 'react';

function App() {
  const [result, setResult] = useState(''); // store output as a string
  const [openedEditor, setOpenedEditor] = useState('css');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  // const [srcDoc, setSrcDoc] = useState(` `); // not used

  const currentType = openedEditor; // 'html' | 'css' | 'js'
  const currentCode =
    openedEditor === 'html' ? html :
    openedEditor === 'css' ? css : js;

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  return (
    <div className="App">
      <p>Thinh's online IDE </p>
      <div className="tab-button-container">
        <Button title="HTML" onClick={() => onTabClick('html')} />
        <Button title="CSS" onClick={() => onTabClick('css')} />
        <Button title="JavaScript" onClick={() => onTabClick('js')} />
      </div>
      <div>
        <RunButton 
          type={currentType}
          code={currentCode}
          onResult={(outputText) => {
            setResult(outputText); // save only the output body
          }}
        />
      </div>
      <div className="editor-container">
        {openedEditor === 'html' ? (
          <Editor language="xml" value={html} setEditorState={setHtml} />
        ) : openedEditor === 'css' ? (
          <Editor language="css" value={css} setEditorState={setCss} />
        ) : (
          <Editor language="javascript" value={js} setEditorState={setJs} />
        )}
      </div>
      <div className="output-container">
        <Output result={result} />
      </div>
    </div>
  );
}
export default App;
