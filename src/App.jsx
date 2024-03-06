import { useState } from 'react'
import Customiser from './customiser/Customiser';
import Viewer from './viewer/Viewer';
import defaultData from "./defaultData.json";

function App() {

  const [cvData, setCvData] = useState(defaultData);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Customiser cvData={cvData} setCvData={setCvData} />
        <Viewer cvData={cvData} />
      </div>
    </>
  )
}

export default App
