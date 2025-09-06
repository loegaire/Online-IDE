import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Editor from './components/Editor';
import RunButton from './components/RunButton';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import React, { useState,  useEffect } from 'react';

function App() {
  const [openedEditor, setOpenedEditor] = useState('css');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState(` `);
  const currentType = openedEditor; // 'html' | 'css' | 'js'
  const currentCode =
    openedEditor === 'html' ? html :
    openedEditor === 'css' ? css : js;
  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
    }, 250);
    return () => clearTimeout(timeOut)
  }, [html, css, js])

    return (
    <div className="App">
      <p>Thinh's online IDE </p>
      <div className="tab-button-container">
        <Button title="HTML" onClick={() => {
          onTabClick('html')
        }} />
        <Button title="CSS" onClick={() => {
          onTabClick('css')
        }} />
        <Button title="JavaScript" onClick={() => {
          onTabClick('js')
        }} />
      </div>
      <div>
        <RunButton 
          type={currentType} code={currentCode}
          onResult={(data) => {
            if (data?.ok) {
              console.log('Server response:', data);
            } else {
              console.error('Run failed:', data);
            }
          }}
        />
      </div>
      <div className="editor-container">
        {
          openedEditor === 'html' ? (
            <Editor
              language="xml"
              value={html}
              setEditorState={setHtml}
            />
          ) : openedEditor === 'css' ? (
            <Editor
              language="css"
              value={css}
              setEditorState={setCss}
            />
          ) : (
            <Editor
              language="javascript"
              value={js}
              setEditorState={setJs}
            />
          )
        }
      </div>
      <div>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
export default App;
