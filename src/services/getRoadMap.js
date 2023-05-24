import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'
import { TEST_MESSAGE_2 } from '../consts'

const infoJobsToken = import.meta.env.VITE_INFOJOBS_TOKEN
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

const getOfferTitleAndDescriptionById = async (id) => {
  const res = await fetch(`api/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const { description, title } = await res.json()

  return { description, title }
}

export const getRoadMap = async (id) => {
  const { description, title } = await getOfferTitleAndDescriptionById(id)
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
