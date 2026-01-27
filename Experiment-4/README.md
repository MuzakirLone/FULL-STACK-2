# Experiment 4: State Management in React

This experiment demonstrates and compares three different approaches to state management in React applications: **Local State**, **Context API**, and **Redux**.

## Learning Outcomes

1.  **Understanding State Scope**: I learned the distinction between **Local State** (confined to a single component) and **Global State** (shared across the entire application or a specific tree of components).

2.  **Local State Implementation**: I practiced using the `useState` hook to manage independent component data, which is ideal for isolated UI elements like form inputs or individual toggles.

3.  **Context API for Prop Drilling**: I learned how to use the React **Context API** (`createContext`, `Provider`, and `useContext`) to pass data through the component tree without manually passing props at every level, suitable for themes or user authentication.

4.  **Redux Architecture**: I understood the core principles of **Redux**: a single source of truth (**Store**), pure functions to handle state changes (**Reducers**), and the unidirectional data flow.

5.  **Interacting with Redux**: I learned how to use `react-redux` hooks to interact with the store: `useSelector` to read data and `useDispatch` to send **Actions** (like `INCREMENT` or `DECREMENT`) that trigger state updates.

6.  **Choosing the Right Strategy**: I realized that while Redux offers powerful debugging and state predictability for large complex apps, Local State and Context API are often sufficient and simpler for smaller applications or specific features.
