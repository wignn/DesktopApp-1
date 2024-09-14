import vid from './assets/skadi-playing-harp-arknights-moewalls-com (1).mp4'

export default function Wallpaper (){
    return (
        <div className="">
        <div id="video-container">
          <video autoPlay muted loop className="wallpaper" src={vid} type="video/mp4" />
        </div>
     
      </div>

    )
}