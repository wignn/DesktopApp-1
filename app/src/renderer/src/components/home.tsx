import '../assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Versions from './Versions'
import WeatherWidget from './cuaca'
import Icon from './SosIcon'
import ProfileButton from './profile'

function Home(): JSX.Element {
  return (
    <div>
      <Icon />
      <WeatherWidget />
      <Versions />
    </div>
  )
}

export default Home
