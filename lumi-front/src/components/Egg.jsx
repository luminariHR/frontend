import React from 'react'
import eggback from "../assets/eggback.png"
import dv1 from "../assets/dv1.png"
import dv2 from "../assets/dv2.png"
import dv3 from "../assets/dv3.png"
import dv4 from "../assets/dv4.png"
import dv5 from "../assets/dv5.png"
import dv6 from "../assets/dv6.png"
import dv7 from "../assets/dv7.png"
import dv8 from "../assets/dv8.png"
import dv9 from "../assets/dv9.png"

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
            <img src={dv9} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv3} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv4} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv5} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv6} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv7} className="w-full object-contain" style={{ height: 'auto' }} />
            <img src={dv8} className="w-full object-contain" style={{ height: 'auto' }} />
        </div>
    </div>
  )
}

export default Egg
