import { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // 👈 new state

  const handleSubmit = async () => {
    if (isLoading) return;  // prevent double clicks

    setIsLoading(true);
    setOutput('');  // clear previous output

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL,  // reads from .env file
        { language: 'cpp', code, input }   // sends to backend
      );
      setOutput(data.output);  // shows result
    } catch (error) {
      if (error.response) {
        setOutput(`Error: ${error.response.data.error}`);  // backend error
      } else {
        setOutput('Error: Could not connect to server.');  // network error
      }
    } finally {
      setIsLoading(false);  // always runs, even if error
    }
  };

  return (
    <div className="min-h-screen p-8 ">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Online Compiler
      </h1>

      <div className="flex gap-8">
        {/* Left Side - Code Editor */}
        <div className="w-1/2 bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Code</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            className="w-full border rounded p-2 font-mono text-sm"
            placeholder="Write your C++ code here..."
          />
          {/* 👇 Run Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`mt-4 w-full py-2 rounded text-white font-semibold ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Right Side - Input & Output */}
        <div className="w-1/2 flex flex-col gap-6">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              className="w-full border rounded p-2 font-mono text-sm"
              placeholder="Enter input for cin..."
            />
          </div>

          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <div className="bg-gray-100 rounded p-2 font-mono text-sm min-h-24">
              {output ? output : 'Output will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;