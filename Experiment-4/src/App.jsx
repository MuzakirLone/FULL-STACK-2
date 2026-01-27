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
        <CounterLocal cno="2" />
        {/* <CounterLocal cno="2" /> Remove second if only one shown in image, but user said 6 sections. 
            User image shows: 
            2: Local State
            1: Global (Context)
            2: Global (Context)
            1: Global (Redux)
            2: Global (Redux) 
            Total 5 visible in image? Request says "Make 6 sections... 2 Local...". I'll do 2 for local too. 
        */}
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
