
import './App.css'
import { shallow } from './simple-zustand/shallow'
import { useStore } from './store'


function App() {
  const state = useStore((state) => ({
    count: state.count,
    add: state.increment
  }), shallow)
  console.log(state);
  
  return (
    <div onClick={state.add}>
    {state.count}
    </div>
  )
}

export default App
