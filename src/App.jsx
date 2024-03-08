import { useState } from 'react'
import Customiser from './customiser/Customiser';
import Viewer from './viewer/Viewer';
import dataStructure from "./dataStructure.json";

function App() {
  const [cvData, setCvData] = useState(dataStructure);
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  const isMobile = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 768;

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  }

  return (
    <>
      {(isMobile && isDialogVisible) && 
        <div id="mobileDialog">
          <dialog open className="border border-gray-400 bg-white rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10 md:hidden">
            <strong className="text-lg">For Mobile Users</strong>
            <p>Please view generated PDF to get an accurate sense of the text formatting. Alternatively, view using a laptop (or wider) screen.</p>
            <form method="dialog" className="text-lg font-bold mt-5 flex flex-col text-center">
              <button id="dialogBtn" onClick={handleCloseDialog} className="w-full p-2.5 border rounded-2xl text-white bg-blue-600 hover:bg-blue-500 hover:text-gray-200 cursor-pointer">OK</button>
            </form>
          </dialog>
          <div id="overlay" className="fixed top-0 left-0 w-full h-full bg-white/90 z-[1]"></div>
        </div>
      }
      <div className="flex flex-col w-screen md:flex-row p-2">
        <Customiser cvData={cvData} setCvData={setCvData} />
        <Viewer cvData={cvData} />
      </div>
    </>
  )
}

export default App;
