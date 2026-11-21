// Movies as the cinema API sends them. The components never read this
// shape directly: everything goes through adaptMovie (src/utils/adaptMovie.js).
import { adaptMovies } from '../utils/adaptMovie'

export const rawMovies = [
  {
    id: 1,
    original_title: 'Órbita Final',
    poster_path: '/posters/orbita-final.svg',
    overview:
      'Una tripulación varada en la estación espacial debe decidir quien regresa a la Tierra cuando solo queda una cápsula de escape.',
    certification: 'PG-13',
    vote_average: '8.7',
    genres: [{ id: 1, name: 'Ciencia ficción' }],
    runtime: '128 min',
    show_times: ['14:00', '17:30', '21:00'],
  },
  {
    id: 2,
    original_title: 'La Casa del Puerto',
    poster_path: '/posters/la-casa-del-puerto.svg',
    overview:
      'Una familia hereda una casona en el Callao y descubre que sus antiguos dueños nunca se fueron del todo.',
    certification: '14',
    vote_average: '7.4',
    genres: [{ id: 2, name: 'Terror' }],
    runtime: '102 min',
    show_times: ['16:15', '19:45', '22:30'],
  },
  {
    id: 3,
    original_title: 'Corazón de Barro',
    poster_path: '/posters/corazon-de-barro.svg',
    overview:
      'Un alfarero de Chulucanas intenta salvar el taller de su abuelo mientras se enamora de la arquitecta que viene a demolerlo.',
    certification: 'APT',
    vote_average: '7.9',
    genres: [{ id: 3, name: 'Romance' }],
    runtime: '110 min',
    show_times: ['13:30', '16:00', '18:30'],
  },
  {
    id: 4,
    original_title: 'Código Rojo',
    poster_path: '/posters/codigo-rojo.svg',
    overview:
      'Una analista de ciberseguridad tiene doce horas para detener un ataque que dejará a oscuras a toda la ciudad.',
    certification: '14',
    vote_average: '8.1',
    genres: [{ id: 4, name: 'Acción' }],
    runtime: '118 min',
    show_times: ['15:00', '18:15', '21:45'],
  },
  {
    id: 5,
    original_title: 'El Gran Viaje de Pipo',
    poster_path: '/posters/el-gran-viaje-de-pipo.svg',
    overview:
      'Un pequeño colibrí que no sabe volar recorre los Andes para reencontrarse con su bandada antes del invierno.',
    certification: 'APT',
    vote_average: '8.4',
    genres: [{ id: 5, name: 'Animación' }],
    runtime: '95 min',
    show_times: ['11:00', '13:15', '15:30'],
  },
  {
    id: 6,
    original_title: 'Última Ronda',
    poster_path: '/posters/ultima-ronda.svg',
    overview:
      'Un boxeador retirado acepta entrenar a la hija de su antiguo rival para la pelea que él nunca pudo ganar.',
    certification: 'PG-13',
    vote_average: '7.6',
    genres: [{ id: 6, name: 'Drama' }],
    runtime: '124 min',
    show_times: ['17:00', '20:00'],
  },
  {
    id: 7,
    original_title: 'Risas en Cuarentena',
    poster_path: '/posters/risas-en-cuarentena.svg',
    overview:
      'Cinco compañeros de departamento quedan encerrados una semana y convierten la convivencia en un caos absoluto.',
    certification: 'APT',
    vote_average: '6.9',
    genres: [{ id: 7, name: 'Comedia' }],
    runtime: '98 min',
    show_times: ['12:45', '15:15', '19:00', '21:30'],
  },
  {
    id: 8,
    original_title: 'Sombras de Lima',
    poster_path: '/posters/sombras-de-lima.svg',
    overview:
      'Un detective veterano y una periodista novata siguen la pista de un asesino que deja acertijos en el Centro Histórico.',
    certification: '18',
    vote_average: '8.3',
    genres: [{ id: 8, name: 'Suspenso' }],
    runtime: '131 min',
    show_times: ['18:00', '21:15', '23:40'],
  },
]

// The model the app uses, produced by the adapter.
export const movies = adaptMovies(rawMovies)

// The featured movie shown in the Hero banner.
export const featuredMovie = movies[0]
