import React from 'react'
import WrokspaceHeader from '../_components/WrokspaceHeader'

const Workspace = () => {
  return (
    <div>
       <WrokspaceHeader/>

       <div className='grid grid-cols-1
       md:grid-cols-2'>
        <div>Doc</div>
        <div>Can</div>
       </div>

    </div>
  )
}

export default Workspace