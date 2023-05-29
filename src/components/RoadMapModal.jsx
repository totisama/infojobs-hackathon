import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Logo } from './Logo'
import getSkills from '../services/getSkills'
import RoadMap from './RoadMap'
import '../styles/Loader.css'
import { getRoadMap } from '../services/getRoadMap'

// eslint-disable-next-line react/prop-types
const RoadMapModal = ({ open, setOpen, name, id }) => {
  const cancelButtonRef = useRef(null)
  const [skillsList, setSkillsList] = useState([])
  const [foundSkills, setFoundSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [roadmapGenerated, setRoadmapGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState({})

  const obtainSkills = async () => {
    const skills = await getSkills()

    // Some skills that the API result doesnt have
    skills.push({ id: 1, name: 'ReactJS' })
    skills.push({ id: 2, name: 'React Native' })
    skills.push({ id: 3, name: 'Tailwind' })
    skills.push({ id: 4, name: 'Unreal' })

    setSkillsList(skills)
  }

  const searchSkills = (event) => {
    const value = event.target.value

    setSearchValue(value)
    if (value.length < 2) {
      setFoundSkills([])
      return
    }

    const skills = skillsList.filter((skill) => {
      const lowerCaseValue = skill.name.toLowerCase()

      return lowerCaseValue.includes(value.toLowerCase())
    })

    setFoundSkills(skills)
  }

  const selectSkill = (name) => {
    if (selectedSkills.length >= 5 || selectedSkills.includes(name)) {
      return
    }

    setSearchValue('')
    setSelectedSkills(prevState => [
      ...prevState,
      name
    ])
  }

  const removeSkill = (name) => {
    const newSkills = selectedSkills.filter((skill) => skill !== name)

    setSelectedSkills(newSkills)
  }

  const generateRoadMap = async () => {
    setGenerating(true)
    const roadMap = await getRoadMap(id, selectedSkills)

    setRoadmap(roadMap)
    setGenerating(false)
    setRoadmapGenerated(true)
  }

  useEffect(() => {
    obtainSkills()
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='flex flex-col relative transform w-11/12 h-[500px] overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-[1000px]'>
                <div className='h-min flex justify-between items-center mx-2 py-3 sm:mx-5'>
                  <Dialog.Title className='text-2xl sm:text-3xl'>Road Map Generator</Dialog.Title>
                  <Logo />
                </div>
                <div className='flex justify-center'>
                  <div className='h-[1px] flex justify-center w-full bg-gray-300' />
                </div>
                {!roadmapGenerated
                  ? (
                    <>
                      <div className='h-full mx-5'>
                        <div className='mt-3 sm:mt-5'>
                          <h2 className='text-xl leading-6 text-gray-900'>
                            Selecciona tus habilidades técnicas (5 como máximo)
                          </h2>
                        </div>
                        <div className='mt-2'>
                          <div className='h-40'>
                            <input type='text' value={searchValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5 focus:outline-[#167DB7]' onChange={(e) => searchSkills(e)} />
                            {foundSkills.length > 0 && searchValue.length > 2
                              ? (
                                <ul className='bg-[#167DB7] text-white w-3/5 rounded-lg p-2 max-h-52 overflow-y-auto mt-1 relative z-10'>
                                  {foundSkills.map((skill) => (
                                    <li className='cursor-pointer hover:bg-[#8BBEDB]' key={skill.id} onClick={() => { selectSkill(skill.name) }}>{skill.name}</li>
                                  ))}
                                </ul>)
                              : null}
                          </div>
                          {selectedSkills.length > 0
                            ? (
                              <div className=''>
                                <h3>Habilidades seleccionadas:</h3>
                                <ul className='flex gap-2 flex-wrap'>
                                  {selectedSkills.map((skill, index) => (
                                    <li key={index} className='flex px-3 py-0.5 gap-2 rounded-xl bg-[#80d2a8] cursor-pointer hover:bg-[#4DC085]' onClick={() => removeSkill(skill)}>
                                      <h3>{skill}</h3>
                                      <span className='font-bold'>X</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>)
                            : null}
                        </div>
                      </div>
                    </>)
                  : <RoadMap name={name} roadmap={roadmap} />}
                <div className='flex flex-col justify-center'>
                  {generating ? <p className='ml-2'>Este proceso puede llegar a tardar unos minutos</p> : null}
                  <div className='h-[1px] flex justify-center w-full bg-gray-300' />
                </div>
                <div className='h-min flex justify-end items-center gap-2 mx-5 py-3'>
                  <button
                    type='button'
                    className='inline-flex w-2/5 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold border-2 border-[#167db7] text-[#167db7] shadow-sm sm:col-start-1 sm:mt-0 hover:bg-gray-100 md:w-1/5'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cerrar
                  </button>
                  {!roadmapGenerated
                    ? (
                      <button
                        type='button'
                        className='inline-flex w-2/5 justify-center rounded-md bg-[#167db7] px-3 py-2 text-sm font-semibold border-2 border-[#167db7] text-white shadow-sm sm:col-start-2 hover:bg-[#1972A3] md:w-1/5 disabled:bg-white'
                        disabled={generating}
                        onClick={() => generateRoadMap()}
                      >
                        {generating ? <span className='loader' /> : 'Generar'}
                      </button>)
                    : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RoadMapModal
