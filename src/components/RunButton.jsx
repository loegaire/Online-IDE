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
      <button style={{ maxWidth: "140px", minWidth: "80px", height: "30px", marginRight: "5px" }}
              onClick={handleClick}>
        Run
      </button>
    </div>
  );
};
export default RunButton;
