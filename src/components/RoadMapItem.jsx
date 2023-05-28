/* eslint-disable react/prop-types */
import '../styles/RoadMapItem.css'

const RoadMapItem = ({ data }) => (
  <div className='timeline-item'>
    <div className='timeline-item-content gap-3'>
      <h3 className='text-lg font-semibold '>{data.tema}</h3>
      <p>{data.mensaje}</p>
      <span className='circle' />
    </div>
  </div>
)

export default RoadMapItem
