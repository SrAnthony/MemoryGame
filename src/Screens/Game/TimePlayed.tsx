import React, { memo, useEffect, useState } from 'react'
import { Text } from 'MemoryGame'

const TimePlayed: React.FC<{ paused?: boolean }> = ({ paused }) => {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    if (paused) return
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [paused])
  
  const divisor_for_minutes = seconds % (60 * 60)
  const minutes_passed = Math.floor(divisor_for_minutes / 60)
  
  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds_passed = Math.ceil(divisor_for_seconds)
  
  return (
    <Text size="medium">
      {minutes_passed < 10 && '0'}{minutes_passed}:{seconds_passed < 10 && '0'}{seconds_passed}
    </Text>
  )
}

export default memo(TimePlayed)
