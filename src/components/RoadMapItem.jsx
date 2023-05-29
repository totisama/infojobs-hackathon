/* eslint-disable react/prop-types */
import '../styles/RoadMapItem.css'

const RoadMapItem = ({ data }) => (
  <div className='timeline-item'>
    <div className='timeline-item-content'>
      <h2 className='text-lg font-semibold mb-1'>{data.tema}</h2>
      <h3 className='mb-2'>Aprendido:
        <span className='font-semibold'>
          {' '}{data.aprendido}
        </span>
      </h3>
      <p>{data.mensaje}</p>
      <span className='circle' />
    </div>
  </div>
)

export default RoadMapItem
