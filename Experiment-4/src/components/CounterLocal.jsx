import React, { useState } from 'react';

export default function CounterLocal(props) {
    const [count, setCount] = useState(0);

    return (
        <div className="card local-card">
            <h3>{props.cno} : Local State Count: {count}</h3>
            <div className="button-group">
                <button onClick={() => setCount(count + 1)}>INCREASE</button>
                <button onClick={() => setCount(count - 1)}>DECREASE</button>
            </div>
        </div>
    );
}
