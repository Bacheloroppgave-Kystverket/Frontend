import React, { useEffect, useState } from 'react'

/**
 * Makes a icon that rotates 90 degrees based on a boolean state.
 * @param {icon} icon the icon to rotate 90 degrees. 
 * @param {boolean} updateState the current state.
 * @param {int} degrees the amount of degrees to rotate the icon.
 * @returns the icon itself.
 */
export default function RotateIcon({icon, updateState, degrees}) {
    const [styles, SetStyles] = useState({display:"flex"});
    useEffect(() => {
        SetStyles(updateState ? {display:"flex", transform: "rotate(" + degrees +"deg)"} : {display:"flex"})
    }, [updateState])

    
    

  return (
    <div style={styles}>
        {icon}
    </div>
  )
}
