import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'

const infoJobsToken = import.meta.env.VITE_INFOJOBS_TOKEN
const openaiToken = import.meta.env.VITE_OPENAI_TOKEN

const configuration = new Configuration({ apiKey: openaiToken })
delete configuration.baseOptions.headers['User-Agent']
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Te pasare el nombre de un puesto de trabajo y su descripción, una vez te lo pase, dame una lista de los temas que debería de saber un usuario para poder aplicar al puesto y porque debería de estudiarlo. La lista debería de estar en orden de prioridad.

    El formato de solicitud JSON será el siguiente:
    {
      "puesto": [puesto],
      "descripcion": [descripcion]
    }

    El formato de respuesta JSON será el siguiente:
    [
        {
          "tema 1": [tema],
          "mensaje": [mensaje]
        },
        {
          "tema 2": [tema],
          "mensaje": [mensaje]
        }
    ]

    Tienes que cambiar lo que hay entre corchetes por el valor. Por ejemplo:
    [
        {
          "tema 1": "html"
          "mensaje": "Debes sabes html porque es el lenguaje básico para desarrollar paginas web"
        },
        {
          "tema 2": "css",
          "mensaje": "Debes saber css porque es una forma importante de controlar el aspecto de las páginas web"
        }
    ]`
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
