
import { useEffect,useState } from "react"

export default function Time (){
    const [time, setTime] = useState<string>('')
    const [date, setDate] = useState<string>('')
  
    useEffect(() => {
      const updateTimeAndDate = () => {
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        const seconds = now.getSeconds().toString().padStart(2, '0')
  
        const day = now.getDate().toString().padStart(2, '0')
        const month = (now.getMonth() + 1).toString().padStart(2, '0')
        const year = now.getFullYear()
  
        setTime(`${hours}:${minutes}:${seconds}`)
        setDate(`${day}/${month}/${year}`)
      }
  
      const intervalId = setInterval(updateTimeAndDate, 1000)
      updateTimeAndDate() // Initial call
  
      return () => clearInterval(intervalId)
    }, [])
    return(
        <div className="info-container">
        <div id="time">{time}</div>
        <div id="date">{date}</div>
        <div id="online-status">
        </div>
      </div>
    )
}