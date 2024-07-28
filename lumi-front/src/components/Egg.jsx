import React from 'react'
import eggback from "../assets/eggback.png"
import dv1 from "../assets/dv1.png"
import dv2 from "../assets/dv2.png"
import dv3 from "../assets/dv3.png"

const Egg = () => {
  return (
    <div className='flex justify-center'
      style={{
        backgroundImage: `url(${eggback})`,
        backgroundSize: "contain", 
        backgroundRepeat: "no-repeat", 
        backgroundAttachment: "fixed", 
        backgroundPosition: "center", 
        height: "100vh", 
        width: "100vw", 
      }}>
        <div className='bg-white w-[30%] h-full overflow-auto'>
            <img src={dv1} className="w-full" />
            <img src={dv2} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv3} className="w-full object-contain" style={{ height: 'auto' }} />
        </div>
    </div>
  )
}

export default Egg
