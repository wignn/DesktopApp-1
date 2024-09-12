import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Versions from './components/Versions'
import WeatherWidget from './components/cuaca'
import Icon from './components/SosIcon'
import Time from './components/Time'

function App(): JSX.Element {
  return (
    <div>
      <Time />
      <Icon />
      <WeatherWidget />
      <Versions />
    </div>
  )
}

export default App
