import * as Yup from 'yup'
import { SERVICE_IDS } from '@/types'

export const leadSchema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Nom trop court').max(80).required('Votre nom est requis'),
  email: Yup.string().trim().email('E-mail invalide').required('E-mail requis'),
  phone: Yup.string()
    .trim()
    .min(8, 'Numéro trop court')
    .max(20)
    .matches(/^[+0-9\s.-]+$/, 'Numéro invalide')
    .required('Téléphone requis'),
  company: Yup.string().trim().max(80),
  serviceId: Yup.string().oneOf([...SERVICE_IDS]).required('Choisissez un service'),
  message: Yup.string()
    .trim()
    .min(10, 'Dites-nous-en un peu plus (10 caractères min.)')
    .max(1000)
    .required('Un message est requis'),
  source: Yup.string().oneOf(['service-card', 'hero', 'footer']).required(),
  website: Yup.string(),
})
