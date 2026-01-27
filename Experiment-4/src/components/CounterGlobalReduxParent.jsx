import { useDispatch, useSelector } from "react-redux"; //npm install redux react-redux

export default function CounterReduxParent(props) {
    // useSelector : to read state from the Redux store
    const count = useSelector(state => state.count);

    // useDispatch : to dispatch actions to the Redux store
    const dispatch = useDispatch();

    return (
        <div className="card redux-card">
            <h3>{props.cno} : Gloabl State (Redux) Count: {count}</h3>

            <div className="button-group">
                <button onClick={() => dispatch({ type: "INCREMENT" })}>
                    Increase
                </button>

                <button onClick={() => dispatch({ type: "DECREMENT" })}>
                    Decrease
                </button>
            </div>
        </div>
    );
}
