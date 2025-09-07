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
  const [python, setPython] = useState('');
  const [cpp, setCpp] = useState('');
  // const [srcDoc, setSrcDoc] = useState(` `); // not used

  const currentType = openedEditor; 
  const codeMap = {
    html,
    css,
    js,
    python,
    cpp,
  };

  const currentCode = codeMap[openedEditor];

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  return (
    <div className="App">
      <h1 className="app-title">Thinh's online IDE</h1>
      <div className="tab-button-container">
        <Button title="HTML" onClick={() => onTabClick('html')} isActive={openedEditor === 'html'} />
        <Button title="CSS" onClick={() => onTabClick('css')} isActive={openedEditor === 'css'} />
        <Button title="JavaScript" onClick={() => onTabClick('js')} isActive={openedEditor === 'js'} />
        <Button title="Python" onClick={() => onTabClick('python')} isActive={openedEditor === 'python'} />
        <Button title="C++" onClick={() => onTabClick('cpp')} isActive={openedEditor === 'cpp'} />
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
        ) : openedEditor === 'js' ? (
          <Editor language="javascript" value={js} setEditorState={setJs} />
        ) : openedEditor === 'python' ? (
          <Editor language="python" value={python} setEditorState={setPython} />
        ) : (
          <Editor language="cpp" value={cpp} setEditorState={setCpp} />
        )}
      </div>
      <div className="output-container">
        <Output result={result} />
      </div>
    </div>
  );
}
export default App;
