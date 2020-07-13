import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  const [hidden, setHidden] = useState(true);
  return (
    <React.Fragment>
      {hidden ? <h1>{counter}</h1> : <h1>Count Hidden</h1>}
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
      <button onClick={() => setHidden(!hidden)}>Hide/Show</button>
    </React.Fragment>
  )
}

// NOT RECOMMENDED - SEPARATE STATE
// function Counter() {

//   const [bundle, setBundle] = useState({"hidden": true, "counter": 0});

//   return (
//     <React.Fragment>
//       {bundle.hidden ? <h1>{bundle.counter}</h1> : <h1>Count Hidden</h1>}

//       <button onClick={() => setBundle({...bundle, "counter": bundle.counter +1})}>Count!</button>
//       <button onClick={() => setBundle({...bundle, "hidden": !bundle.hidden})}>Hide/Show</button>
//     </React.Fragment>
//   );
// }


export default Counter;