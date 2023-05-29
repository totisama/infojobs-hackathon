export const CATEGORIES = [
  {
    id: 0,
    value: '(Seleccionar)',
    order: 0,
    key: '-'
  },
  {
    id: 20,
    value: 'Administración Pública',
    order: 1,
    key: 'administracion-publica'
  },
  {
    id: 10,
    value: 'Administración de empresas',
    order: 2,
    key: 'administracion-empresas'
  },
  {
    id: 170,
    value: 'Atención a clientes',
    order: 3,
    key: 'atencion-a-cliente'
  },
  {
    id: 30,
    value: 'Calidad, producción e I+D',
    order: 4,
    key: 'calidad-produccion-id'
  },
  {
    id: 190,
    value: 'Comercial y ventas',
    order: 5,
    key: 'comercial-ventas'
  },
  {
    id: 40,
    value: 'Compras, logística y almacén',
    order: 6,
    key: 'compras-logistica-almacen'
  },
  {
    id: 50,
    value: 'Diseño y artes gráficas',
    order: 7,
    key: 'diseno-artes-graficas'
  },
  {
    id: 60,
    value: 'Educación y formación',
    order: 8,
    key: 'educacion-formacion'
  },
  {
    id: 70,
    value: 'Finanzas y banca',
    order: 9,
    key: 'finanzas-banca'
  },
  {
    id: 150,
    value: 'Informática y telecomunicaciones',
    order: 10,
    key: 'informatica-telecomunicaciones'
  },
  {
    id: 80,
    value: 'Ingenieros y técnicos',
    order: 11,
    key: 'ingenieros-tecnicos'
  },
  {
    id: 90,
    value: 'Inmobiliario y construcción',
    order: 12,
    key: 'inmobiliario-construccion'
  },
  {
    id: 100,
    value: 'Legal',
    order: 13,
    key: 'legal'
  },
  {
    id: 110,
    value: 'Marketing y comunicación',
    order: 14,
    key: 'marketing-comunicacion'
  },
  {
    id: 120,
    value: 'Profesiones, artes y oficios',
    order: 15,
    key: 'profesiones-artes-oficios'
  },
  {
    id: 130,
    value: 'Recursos humanos',
    order: 16,
    key: 'recursos-humanos'
  },
  {
    id: 140,
    value: 'Sanidad y salud',
    order: 17,
    key: 'sanidad-salud'
  },
  {
    id: 210,
    value: 'Sector Farmacéutico',
    order: 18,
    key: 'sector-farmaceutico'
  },
  {
    id: 160,
    value: 'Turismo y restauración',
    order: 19,
    key: 'turismo-restauracion'
  },
  {
    id: 200,
    value: 'Ventas al detalle',
    order: 20,
    key: 'venta-detalle'
  },
  {
    id: 180,
    value: 'Otros',
    order: 21,
    key: 'otros'
  }
]

export const INITIAL_MESSAGE = `Dame un lista de temas que debería de saber una persona para aplicar a un puesto de trabajo.
La información que tendrás que usar para hacer la lista es la siguiente:
-El nombre de un puesto de trabajo
-La descripción del puesto de trabajo
-Una lista de los conocimientos que una persona posee actualmente

Una vez te pase esta información, dame una lista de los temas que debería de saber un usuario para poder aplicar al puesto y por qué debería de estudiarlo,
también dependiendo de sus habilidades actuales, dime si crees que ya sabe sobre el tema o no.

Si alguna habilidad del usuario no tiene relacion con el puesto, no agregues esa habilidad.

El formato de solicitud JSON será el siguiente:
{
  "puesto": [puesto],
  "descripcion": [descripcion],
  "Habilidades": [Habilidad 1, habilidad 2, habilidad 3]
}

El formato de respuesta JSON será el siguiente:
[
    {
      "tema": [tema],
      "aprendido": [aprendido],
      "mensaje": [mensaje],
    },
    {
      "tema": [tema],
      "aprendido": [aprendido],
      "mensaje": [mensaje]
    }
]

Tienes que cambiar lo que hay entre corchetes por el valor.

Este es un ejemplo:

Solicitud
{
  "puesto": "Desarrollador REACTJS REMOTO 100%",
  "Habilidades": ["HTML", "CSS", "Photo Shop"]
  "descripcion": "En Métrica Consulting empresa de reconocido prestigio nacional e internacional, líder en el sector IT, nos encontramos en la búsqueda de perfiles de Desarrollo REACTJS, con al menos 2 años de experiencia y experiencia en Pruebas Unitarias (JEST)

  Se ofrece:

  Contrato indefinido y trabajo en REMOTO desde casa

  Proyecto remoto de muy larga duración

  Flexibilidad Horaria

  Retribución Flexible

  Formación Continua"
}

Tu respuesta
[
  {
    "tema": "HTML",
    "aprendido": "Si",
    "mensaje": "Ya tienes conocimientos en HTML, lo cual es beneficioso para el puesto de Desarrollador REACTJS. HTML es el lenguaje de marcado estándar para crear páginas web, y aunque ReactJS se basa en JavaScript, tener un conocimiento sólido de HTML es útil para construir componentes de interfaz de usuario."
  },
  {
    "tema": "CSS",
    "aprendido": "Si",
    "mensaje": "También tienes conocimientos en CSS, lo cual es beneficioso para el puesto de Desarrollador REACTJS. CSS se utiliza para dar estilo y diseño a las páginas web, y trabajar con ReactJS implica trabajar con estilos y componentes visuales, por lo que tener experiencia en CSS es valiosa."
  }
  {
    "tema": "JavaScript",
    "aprendido": "No",
    "mensaje": "Debes tener conocimientos en JavaScript, ya que es el lenguaje principal utilizado en el desarrollo con ReactJS. JavaScript es un lenguaje de programación ampliamente utilizado en el desarrollo web y es fundamental para trabajar con ReactJS y crear funcionalidades interactivas en las aplicaciones web."
  },
  {
    "tema": "ReactJS",
    "aprendido": "No",
    "mensaje": "Debes saber ReactJS porque es el principal requisito para el puesto de Desarrollador REACTJS. ReactJS es una biblioteca de JavaScript ampliamente utilizada para construir interfaces de usuario interactivas y reutilizables."
  },
  {
    "tema": "Pruebas Unitarias (Jest)",
    "aprendido": "No",
    "mensaje": "Debes tener experiencia en Pruebas Unitarias con Jest, ya que es un requisito específico mencionado en la descripción del puesto. Jest es un marco de pruebas de JavaScript ampliamente utilizado para realizar pruebas unitarias en aplicaciones ReactJS."
  },
]

Recuerda que debes darme la respuesta en el formato JSON solicitado. No agregues nada mas que la respuesta en formato JSON`
