import React  from 'react';
const RunButton = ({type, code, onResult}) => {
  const handleClick = async () => {
    try {
      const response = await fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, code })
      });
      const data = await response.json();
      if (!response.ok || data?.ok === false) {
        return onResult?.(`Error: ${data?.error || 'Request failed'}`);
      }
      onResult?.(data?.output ?? '');
    } catch (error) {
      onResult?.(`Error: ${error.message}`);
    }
  };
  return (
    <div>
      <button className="runbutton"
              onClick={handleClick}>
        Run {type.toUpperCase()}
      </button>
    </div>
  );
};
export default RunButton;
