import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'
import { TEST_MESSAGE_2 } from '../consts'
import { getOfferById } from './getOfferById'

const openaiToken = import.meta.env.VITE_OPENAI_TOKEN

const configuration = new Configuration({ apiKey: openaiToken })
delete configuration.baseOptions.headers['User-Agent']
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: TEST_MESSAGE_2
  }
]

export const getRoadMap = async (id) => {
  const offer = await getOfferById(id)

  if (offer === '') {
    throw new Error('Hubo un problema obteniendo la información de la oferta')
  }

  const { description, title } = offer
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: JSON.stringify({
          puesto: title,
          descripcion: description
        })
      }
    ]
  })

  const data = completion.data.choices[0].message?.content ?? ''
  let json

  try {
    json = JSON.parse(data)

    return json
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
