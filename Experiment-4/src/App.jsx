import './App.css'
import CounterLocal from './components/CounterLocal'
import CounterGlobalContextParent from './components/CounterGlobalContextParent'
import CounterGlobalReduxParent from './components/CounterGlobalReduxParent'
import { CounterProvider } from './context/CounterContext'

function App() {
  return (
    <CounterProvider>
      <div className="app-container">
        {/* Local State Section */}
        <CounterLocal cno="1" />
        <CounterLocal cno="2" />

        {/* Global State (ContextAPI) Section */}
        <CounterGlobalContextParent cno="1" />
        <CounterGlobalContextParent cno="2" />

        {/* Global State (Redux) Section */}
        <CounterGlobalReduxParent cno="1" />
        <CounterGlobalReduxParent cno="2" />
      </div>
    </CounterProvider>
  )
}

export default App
