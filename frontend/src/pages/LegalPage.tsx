import { Link } from 'react-router-dom'
import { site } from '@/content/site'

export function LegalPage() {
  return (
    <main className="site-wrap section-pad pt-32">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-over-yellow">Légal</p>
      <h1 className="font-display text-4xl font-bold">Mentions légales</h1>
      <div className="prose prose-invert mt-8 max-w-2xl text-white/75">
        <p>
          <strong className="text-white">{site.name}</strong> — agence de communication et de
          production audiovisuelle.
        </p>
        <p>
          Siège : {site.address}, {site.city}, {site.country}.
        </p>
        <p>
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          Téléphone : <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p>
          Les demandes envoyées via le formulaire sont utilisées uniquement pour recontacter le
          prospect au sujet de son projet.
        </p>
      </div>
      <Link to="/" className="over-btn mt-10 inline-flex">
        Retour à l’accueil
      </Link>
    </main>
  )
}
