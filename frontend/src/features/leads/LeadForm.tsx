import { Form, Formik } from 'formik'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { submitLead } from '@/features/leads/lead.api'
import { leadSchema } from '@/features/leads/lead.schema'
import type { LeadSource, ServiceId } from '@/types'

interface LeadFormProps {
  serviceId: ServiceId
  source: LeadSource
  onClose: () => void
}

const fieldClass =
  'input input-bordered w-full bg-over-charcoal text-white placeholder:text-white/40'

export function LeadForm({ serviceId, source, onClose }: LeadFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const locked = serviceId !== 'general'

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <p className="font-display text-2xl font-bold text-over-yellow">Demande reçue.</p>
        <p className="text-sm text-white/70">
          Merci. L’équipe OverKom revient vers vous sous 24 heures.
        </p>
        <a href={site.whatsapp} className="over-btn w-full" target="_blank" rel="noopener noreferrer">
          Continuer sur WhatsApp
        </a>
        <button type="button" className="over-btn-ghost w-full" onClick={onClose}>
          Fermer
        </button>
      </div>
    )
  }

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceId,
        message: '',
        source,
        website: '',
      }}
      validationSchema={leadSchema}
      onSubmit={async (values, helpers) => {
        setServerError(null)
        const result = await submitLead({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          company: values.company || undefined,
          serviceId: values.serviceId as ServiceId,
          message: values.message,
          source: values.source as LeadSource,
          website: values.website,
        })
        if (result.ok) {
          setSuccess(true)
          helpers.resetForm()
          return
        }
        if (result.errors) {
          helpers.setErrors(result.errors)
        }
        setServerError(result.message)
        helpers.setSubmitting(false)
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form className="space-y-3">
          <label className="form-control w-full">
            <span className="label-text text-white/70">Nom complet</span>
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass}
              autoComplete="name"
            />
            {touched.fullName && errors.fullName ? (
              <span className="label-text-alt text-error">{errors.fullName}</span>
            ) : null}
          </label>

          <label className="form-control w-full">
            <span className="label-text text-white/70">E-mail</span>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass}
              autoComplete="email"
            />
            {touched.email && errors.email ? (
              <span className="label-text-alt text-error">{errors.email}</span>
            ) : null}
          </label>

          <label className="form-control w-full">
            <span className="label-text text-white/70">Téléphone</span>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass}
              autoComplete="tel"
              placeholder="+224 …"
            />
            {touched.phone && errors.phone ? (
              <span className="label-text-alt text-error">{errors.phone}</span>
            ) : null}
          </label>

          <label className="form-control w-full">
            <span className="label-text text-white/70">Entreprise (optionnel)</span>
            <input
              name="company"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text text-white/70">Service</span>
            <select
              name="serviceId"
              value={values.serviceId}
              onChange={handleChange}
              onBlur={handleBlur}
              className="select select-bordered w-full bg-over-charcoal text-white"
              disabled={locked}
            >
              <option value="general">Devis général</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full">
            <span className="label-text text-white/70">Votre besoin</span>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className="textarea textarea-bordered min-h-28 w-full bg-over-charcoal text-white"
            />
            {touched.message && errors.message ? (
              <span className="label-text-alt text-error">{errors.message}</span>
            ) : null}
          </label>

          <input
            name="website"
            value={values.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          {serverError ? <p className="text-sm text-error">{serverError}</p> : null}

          <button type="submit" className="over-btn w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? 'Envoi…' : 'Envoyer la demande'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
