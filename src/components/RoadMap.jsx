/* eslint-disable react/prop-types */
import RoadMapItem from './RoadMapItem'
import '../styles/RoadMap.css'

const RoadMap = ({ name, roadmap }) => {
  return (
    <div className='p-3 mt-1'>
      <div className='flex justify-center'>
        <h2 className='text-3xl leading-6 text-gray-900 font-semibold'>
          {name}
        </h2>
      </div>
      <div className='h-[400px] overflow-y-auto mt-5'>
        <div className='roadmap-container'>
          {roadmap.map((data, idx) => (
            <RoadMapItem key={idx} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoadMap
