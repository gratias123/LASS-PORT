import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Facebook,
  MessageCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  const currentEmail = isCustom ? (data.identity.email || '') : PERSONAL_INFO.email;
  const currentPhone = isCustom ? (data.identity.phone || '') : PERSONAL_INFO.phone;
  const currentLocation = isCustom
    ? (data.identity.location || '')
    : (isEn ? 'Porto-Novo, Benin' : PERSONAL_INFO.location);
  const currentName = isCustom ? (data.identity.name || '') : PERSONAL_INFO.name;
  const currentTitle = 'TECHNICIEN INFORMATIQUE · UI/UX DESIGNER · PROMPT ENGINEER';

  const facebookUrl = isCustom
    ? (data.links?.facebook || PERSONAL_INFO.facebookUrl)
    : PERSONAL_INFO.facebookUrl;

  const whatsappUrl = isCustom
    ? (data.links?.whatsapp || PERSONAL_INFO.whatsappUrl)
    : PERSONAL_INFO.whatsappUrl;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    subject?: boolean;
    message?: boolean;
  }>({});

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email format verification
  const isEmailValid = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  };

  const errors = {
    name: !formData.name.trim()
      ? (isEn ? 'Please enter your full name.' : 'Veuillez saisir votre nom complet.')
      : formData.name.trim().length < 2
      ? (isEn ? 'Name must contain at least 2 characters.' : 'Le nom doit comporter au moins 2 caractères.')
      : null,
    email: !formData.email.trim()
      ? (isEn ? 'Please enter your email address.' : 'Veuillez saisir votre adresse e-mail.')
      : !isEmailValid(formData.email)
      ? (isEn ? 'Please enter a valid email address.' : 'Veuillez saisir un e-mail valide.')
      : null,
    message: !formData.message.trim()
      ? (isEn ? 'Please write your message.' : 'Veuillez rédiger votre message.')
      : formData.message.trim().length < 10
      ? (isEn ? 'Message must be at least 10 characters.' : 'Le message doit comporter au moins 10 caractères.')
      : null,
  };

  const isFormValid = !errors.name && !errors.email && !errors.message;

  const handleFieldChange = (field: 'name' | 'email' | 'subject' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (formStatus === 'error') {
      setFormStatus('idle');
      setStatusMessage('');
    }
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) {
      setFormStatus('error');
      setStatusMessage(
        isEn
          ? 'Please correct highlighted errors before sending.'
          : 'Veuillez corriger les champs signalés en rouge avant d’envoyer votre message.'
      );
      return;
    }

    setIsSubmitting(true);
    setFormStatus('idle');

    // Prepare mailto link
    const mailtoSubject = encodeURIComponent(
      formData.subject.trim() || `Contact portfolio - ${formData.name.trim()}`
    );
    const mailtoBody = encodeURIComponent(
      `Nom : ${formData.name.trim()}\nEmail : ${formData.email.trim()}\n\nMessage :\n${formData.message.trim()}\n`
    );
    const targetEmail = currentEmail || 'semakodeogratias2@gmail.com';
    const fallbackMailto = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      setStatusMessage(
        isEn
          ? 'Your client will open with the pre-filled message. You can also contact me directly via phone or WhatsApp.'
          : 'Votre messagerie va s’ouvrir avec le message prérempli. Vous pouvez également me joindre directement par téléphone ou WhatsApp.'
      );
      window.location.href = fallbackMailto;
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#08111F] text-[#F8FAFC] border-b border-[#0F1B2D] relative overflow-hidden">
      
      {/* Background subtil */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header avec titre fort demandé */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/20 text-[#3B82F6] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/40">
              <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{isEn ? 'GET IN TOUCH' : 'CONTACT PROFESSIONNEL'}</span>
            </div>

            {/* Titre fort demandé */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] font-heading tracking-tight leading-tight">
              {isEn ? 'Let’s build something meaningful.' : 'Construisons quelque chose d’utile.'}
            </h2>

            <p className="text-[#CBD5E1] mt-3 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
              {isEn
                ? 'Have an IT hardware intervention, smartphone repair diagnostic, UI/UX design project, or AI workflow need? Reach out directly.'
                : 'Vous avez un besoin d’intervention informatique, un diagnostic smartphone GSM, un projet de design graphique ou une intégration d’IA ? Échangeons dès aujourd’hui.'}
            </p>

            <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================== */}
          {/* COLONNE GAUCHE : COORDONNÉES COMPACTES (5 colonnes)        */}
          {/* ========================================================== */}
          <ScrollReveal animation="fade-left" delay={100} className="lg:col-span-5 space-y-5">
            
            <div className="bg-[#0F1B2D] rounded-2xl p-6 sm:p-7 border border-[#1E293B] shadow-lg">
              <div className="pb-4 border-b border-[#1E293B] mb-5">
                <span className="text-[11px] uppercase font-bold text-[#3B82F6] tracking-wider block font-heading">
                  {isEn ? 'Direct Reach' : 'Coordonnées directes'}
                </span>
                <h3 className="text-xl font-bold font-heading text-[#F8FAFC] mt-0.5">
                  {currentName}
                </h3>
                <p className="text-xs text-[#94A3B8] font-medium mt-0.5 uppercase tracking-wide">
                  {currentTitle}
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-[#08111F] border border-[#1E293B] flex items-center justify-between gap-3 group hover:border-[#2563EB]/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block leading-tight">
                        Email
                      </span>
                      <a
                        href={`mailto:${currentEmail}`}
                        className="text-xs sm:text-sm font-medium text-[#F8FAFC] hover:text-[#3B82F6] truncate block transition-colors mt-0.5"
                        title={currentEmail}
                      >
                        {currentEmail}
                      </a>
                    </div>
                  </div>
                  {currentEmail && (
                    <button
                      type="button"
                      onClick={() => handleCopy(currentEmail, 'email')}
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
                      title="Copier l'adresse"
                    >
                      {copiedItem === 'email' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Téléphone / WhatsApp */}
                <div className="p-3.5 rounded-xl bg-[#08111F] border border-[#1E293B] flex items-center justify-between gap-3 group hover:border-[#2563EB]/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block leading-tight">
                        {isEn ? 'Phone / WhatsApp' : 'Téléphone / WhatsApp'}
                      </span>
                      <a
                        href={`tel:${currentPhone.replace(/\s+/g, '')}`}
                        className="text-xs sm:text-sm font-medium text-[#F8FAFC] hover:text-[#3B82F6] truncate block transition-colors mt-0.5"
                        title={currentPhone}
                      >
                        {currentPhone}
                      </a>
                    </div>
                  </div>
                  {currentPhone && (
                    <button
                      type="button"
                      onClick={() => handleCopy(currentPhone, 'phone')}
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
                      title="Copier le numéro"
                    >
                      {copiedItem === 'phone' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Localisation */}
                <div className="p-3.5 rounded-xl bg-[#08111F] border border-[#1E293B] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block leading-tight">
                      {isEn ? 'Location' : 'Localisation'}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#F8FAFC] block mt-0.5 truncate">
                      {currentLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action rapide WhatsApp & Réseaux */}
              {(whatsappUrl || facebookUrl) && (
                <div className="mt-5 pt-4 border-t border-[#1E293B] flex flex-wrap items-center gap-2">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#08111F] hover:bg-[#1A2E4B] text-emerald-400 border border-[#1E293B] hover:border-emerald-500/50 text-xs font-semibold transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Direct</span>
                      <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#08111F] hover:bg-[#1A2E4B] text-[#3B82F6] border border-[#1E293B] hover:border-[#2563EB]/50 text-xs font-semibold transition-all shadow-xs"
                    >
                      <Facebook className="w-4 h-4 text-[#3B82F6]" />
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                    </a>
                  )}
                </div>
              )}
            </div>

          </ScrollReveal>

          {/* ========================================================== */}
          {/* COLONNE DROITE : FORMULAIRE DE CONTACT PROFESSIONNEL (7c)  */}
          {/* ========================================================== */}
          <ScrollReveal animation="fade-right" delay={150} className="lg:col-span-7">
            <div className="bg-[#0F1B2D] rounded-2xl p-6 sm:p-8 border border-[#1E293B] shadow-lg">
              
              <div className="pb-4 border-b border-[#1E293B] mb-5">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F8FAFC]">
                  {isEn ? 'Send a Message' : 'Envoyer un message'}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {isEn
                    ? 'Fill in the form to start an exchange. All fields are handled with discretion.'
                    : 'Remplissez le formulaire pour initier un échange professionnel.'}
                </p>
              </div>

              {formStatus === 'success' && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{isEn ? 'Message prepared successfully!' : 'Message préparé avec succès !'}</p>
                    <p className="text-xs text-emerald-300">{statusMessage}</p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-5 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{isEn ? 'Validation error' : 'Erreur de saisie'}</p>
                    <p className="text-xs text-rose-300">{statusMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Nom & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isEn ? 'Full Name' : 'Nom complet'} <span className="text-[#3B82F6]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder="Ex: Jean Dupont"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08111F] text-sm text-[#F8FAFC] placeholder-[#64748B] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                        touched.name && errors.name
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-[#1E293B] focus:border-[#2563EB]'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-[11px] text-rose-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isEn ? 'Email Address' : 'Adresse e-mail'} <span className="text-[#3B82F6]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="nom@exemple.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08111F] text-sm text-[#F8FAFC] placeholder-[#64748B] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                        touched.email && errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-[#1E293B] focus:border-[#2563EB]'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    {isEn ? 'Subject / Purpose' : 'Objet / Sujet'}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder="Ex: Projet d'interface UI / Maintenance réseau"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08111F] text-sm text-[#F8FAFC] placeholder-[#64748B] border border-[#1E293B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    {isEn ? 'Your Message' : 'Votre message'} <span className="text-[#3B82F6]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Décrivez votre besoin ou projet en quelques lignes..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08111F] text-sm text-[#F8FAFC] placeholder-[#64748B] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      touched.message && errors.message
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-[#1E293B] focus:border-[#2563EB]'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>
                  )}
                </div>

                {/* Bouton d'envoi principal en bleu électrique #2563EB */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="btn-submit-contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-bold shadow-md shadow-[#2563EB]/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isEn ? 'Processing...' : 'Préparation...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isEn ? 'Send Message' : 'Envoyer le message'}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
