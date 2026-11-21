import { useState } from 'react'
import Button from '../Button/Button'
import PremiereCarousel from '../PremiereCarousel/PremiereCarousel'
import { SkeletonCard } from '../Skeleton/Skeleton'
import { usePremieres } from '../../hooks/usePremieres'
import { useWindowSize } from '../../hooks/useWindowSize'
import { columnsForWidth } from '../../utils/columnsForWidth'
import './PremieresSection.css'

// "Próximos estrenos". It owns the request (through usePremieres) and draws
// one of its three states: skeletons while loading, an explained error with a
// retry button, or the carousel with the data.
function PremieresSection() {
  // Only this section needs to know whether to simulate a failure.
  const [simulateError, setSimulateError] = useState(false)
  const { status, data, error, retry } = usePremieres({ fail: simulateError })
  const { width } = useWindowSize()
  const visible = columnsForWidth(width) + 1

  return (
    <section className="premieres container section" id="premieres" aria-labelledby="premieres-title" aria-busy={status === 'loading'}>
      <div className="cluster mb-4">
        <div>
          <span className="eyebrow">Muy pronto</span>
          <h2 id="premieres-title" className="section-title">Próximos estrenos</h2>
        </div>
        <label className="premieres__toggle">
          <input type="checkbox" checked={simulateError} onChange={(event) => setSimulateError(event.target.checked)} />
          Simular error del servidor
        </label>
      </div>

      {status === 'loading' && (
        <>
          <p className="visually-hidden" role="status">Cargando estrenos…</p>
          <div className="premieres__skeletons" style={{ '--visible': visible }}>
            {Array.from({ length: visible }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </>
      )}

      {status === 'error' && (
        <div className="premieres__error surface" role="alert">
          <p className="premieres__error-title">No pudimos cargar los estrenos</p>
          <p className="text-muted text-small">{error.message}</p>
          <Button variant="secondary" size="sm" className="mt-2" onClick={retry}>
            Reintentar
          </Button>
        </div>
      )}

      {status === 'success' && <PremiereCarousel premieres={data} visible={visible} />}
    </section>
  )
}

export default PremieresSection
