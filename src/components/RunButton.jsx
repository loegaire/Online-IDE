import React  from 'react';
const RunButton = ({type, code, onResult}) => {
    const handleClick = async () => {
    try {
      const res = await fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, code }),
      });
      const data = await res.json();
      onResult?.(data);
    } catch (e) {
      onResult?.({ ok: false, error: e.message });
    }
  };
  return(
    <div>
      <button
        style={{
          maxWidth: "140px",
          minWidth: "80px",
          height: "30px",
          marginRight: "5px"
        }}
        onClick={handleClick}
      >
        Run
      </button>
    </div>
  )
}
export default RunButton
    