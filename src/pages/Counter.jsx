import React,{ useState, useCallback } from 'react';

function Counter(props){
    const [counter, setCounter] = useState(0)
    const [historique, setHistorique] = useState([])

    const histoCounter = useCallback((value) => {
        historique.push(counter)
        setHistorique(historique)
        setCounter(value)
    },[historique,counter])

    return(
        <div>
            {counter} : le compteur est {counter % 2 ? 'impair' : 'pair'} <br/>
            <button onClick={() => histoCounter (counter - 1)} className="btn btn-primary me-1">-</button>
            <button onClick={() => histoCounter (counter + 1)} className="btn btn-primary">+</button>
            <br />
            {historique.map((histo,i) => <div key={i}>valeur {i} : {histo}</div>)}
        </div>
    );
}
export default Counter;