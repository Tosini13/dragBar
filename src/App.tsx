import React, { useState, useEffect } from 'react';
import './css/style.css';

function App() {

  const minLeftWidth = 300;
  const minLeftX = 20;

  useEffect(() => {
    document.addEventListener('mouseup', () => { document.removeEventListener('mousemove', handleDrag) });
  })

  const [leftWidth, setLeftWidth] = useState(300);
  const [width, setWidth] = useState(window.innerWidth);
  const [tranformX, setTranformX] = useState(0);

  const handleDrag = (e: MouseEvent) => {
    const bar = document.querySelector('.border') as HTMLInputElement;
    const doc = document as any;
    const win = window as any;
    doc.selection ? doc.selection.empty() : win.getSelection().removeAllRanges();
    setLeftWidth(e.pageX - bar.offsetWidth / 2);
    if (e.pageX < minLeftWidth) {
      if (e.pageX > minLeftX) {
        setTranformX(e.pageX - minLeftWidth);
        setWidth(window.innerWidth + (minLeftWidth - e.pageX));
      }
    }
  }

  return (
    <div className='container'>
      <header>Move edges</header>
      <main style={{
        width: width + 'px',
        transform: `translateX(${tranformX}px)`
      }}>
        <section className='leftWidth' style={{
          width: leftWidth + 'px'
        }}>
          <div className='btn btnClose' onClick={() => {
            setTranformX(-minLeftWidth + minLeftX);
            setWidth(window.innerWidth + minLeftWidth - minLeftX);
            setLeftWidth(300);
            console.log('close')
          }}>
            <p>X</p>
          </div>
          <p>
            Left side
          </p>
        </section>
        <div className='border'
          onMouseDown={() => { document.addEventListener('mousemove', handleDrag); }}>
          <div>M</div>
        </div>
        <section className='rightSide'>
          <p>
            Right side
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
