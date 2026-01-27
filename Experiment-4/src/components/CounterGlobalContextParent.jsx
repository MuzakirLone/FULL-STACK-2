import React, { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';

export default function CounterGlobalContextParent(props) {
    const { count, increment, decrement } = useContext(CounterContext);

    return (
        <div className="card context-card">
            <h3>{props.cno} : Gloabl State (ContextAPI) Count: {count}</h3>
            <div className="button-group">
                <button onClick={increment}>INCREASE</button>
                <button onClick={decrement}>DECREASE</button>
            </div>
        </div>
    );
}
