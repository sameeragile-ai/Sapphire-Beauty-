import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { siteConfig, getLiveSalonStatus } from '../data/siteConfig';
import { servicesData } from '../data/services';

export const ContactPage: React.FC = () => {
  const liveStatus = getLiveSalonStatus();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: 'Brow Lamination + Tint + Shape',
    preferredDate: '',
    preferredTime: 'Morning (10am–1pm)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct pre-filled WhatsApp message
    const message = `Hi Sapphire Beauty! I'd like to book an appointment:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nTreatment: ${formData.treatment}\nPreferred Date: ${formData.preferredDate || 'Flexible'}\nPreferred Time Slot: ${formData.preferredTime}\nNotes: ${formData.notes || 'None'}\n\nPlease let me know your available slots. Thank you!`;

    const whatsappUrl = `https://wa.me/447904994275?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kingswood · Bristol Studio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2A5A] tracking-tight">
            Get in Touch &amp; Book
          </h1>
          <p className="text-sm sm:text-base text-[#1E2A5A]/75 font-light leading-relaxed">
            Message us on WhatsApp for the fastest reply, pop into our studio pod outside Boots, or send an enquiry below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Form (Col 1-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#FCE4EC] shadow-md">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A] mb-2">
              Appointment Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2A5A]/70 mb-8">
              Fill in your preferred treatments and times. This will open directly in WhatsApp with your details ready.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FFF8FA] border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                  Enquiry Prepared!
                </h3>
                <p className="text-xs text-[#1E2A5A]/75 max-w-sm mx-auto">
                  Your WhatsApp message has been generated. If WhatsApp didn&apos;t open automatically, click the button below:
                </p>
                <div className="pt-2">
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp (07904 994275)</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gemma Taylor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07904 994275"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. gemma@example.co.uk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                    Select Desired Treatment *
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={`${s.name} (£${s.price})`}>
                        {s.name} (£{s.price}) — {s.duration}
                      </option>
                    ))}
                    <option value="Multiple Treatments / Consultation">
                      Multiple Treatments / Bespoke Consultation
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                    >
                      <option value="Morning (10am–1pm)">Morning (10am – 1pm)</option>
                      <option value="Afternoon (1pm–4:30pm)">Afternoon (1pm – 4:30pm)</option>
                      <option value="Evening (5pm onwards by arrangement)">
                        Evening (From 5pm by special request)
                      </option>
                      <option value="Flexible / First Available">Flexible / First Available</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A5A] mb-1">
                    Special Notes or Skin Sensitivities
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about previous treatments, patch test status, or questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-sapphire-glow text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 animate-shimmer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="p-6 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                Direct Contacts
              </h3>

              <div className="space-y-3 text-xs">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center gap-3 hover:bg-[#FCE4EC]/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#1E2A5A]/60 block font-semibold">
                      WhatsApp Chat (Fastest Response)
                    </span>
                    <span className="font-bold text-sm text-[#1E2A5A]">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phoneInternational}`}
                  className="p-3.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center gap-3 hover:bg-[#FCE4EC]/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-full bg-[#1E2A5A] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#1E2A5A]/60 block font-semibold">
                      Direct Telephone
                    </span>
                    <span className="font-bold text-sm text-[#1E2A5A]">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="p-3.5 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center gap-3 hover:bg-[#FCE4EC]/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-full bg-[#D6336C] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#1E2A5A]/60 block font-semibold">
                      Email Enquiry
                    </span>
                    <span className="font-bold text-xs text-[#1E2A5A] truncate block">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="p-6 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#1E2A5A]">
                  Opening Times
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    liveStatus.isOpen
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {liveStatus.text}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#1E2A5A]/80 divide-y divide-[#FCE4EC]/50">
                <div className="flex justify-between py-1">
                  <span>Mon – Thu:</span>
                  <span className="font-semibold">10:00am – 4:30pm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Friday:</span>
                  <span className="font-semibold">10:00am – 5:00pm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Saturday:</span>
                  <span className="font-semibold">10:00am – 4:30pm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday:</span>
                  <span className="italic text-[#1E2A5A]/50">Closed</span>
                </div>
              </div>

              <p className="text-[11px] text-[#D6336C] font-semibold pt-1">
                ★ Evening appointments available from 5:00pm by arrangement (WhatsApp to book)
              </p>
            </div>

            {/* Location & Map Iframe */}
            <div className="p-6 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#D6336C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#1E2A5A] block text-sm">
                    Kings Chase Shopping Centre
                  </span>
                  <span className="text-[#1E2A5A]/70">
                    Outside Boots, Regent St, Kingswood, Bristol BS15 8LP
                  </span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-[16/9] border border-[#FCE4EC]">
                <iframe
                  title="Studio location map"
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20 border-t border-[#FCE4EC] pt-16">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
              Help &amp; Information
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#1E2A5A]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC]">
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D6336C]" />
                Where should I park?
              </h4>
              <p className="text-xs text-[#1E2A5A]/75 leading-relaxed">
                Kings Chase Shopping Centre features a dedicated multi-storey car park right on site with direct
                lift and stair access to the ground floor shopping concourse outside Boots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC]">
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D6336C]" />
                Do you accept walk-ins?
              </h4>
              <p className="text-xs text-[#1E2A5A]/75 leading-relaxed">
                Yes! We always welcome walk-ins when chair availability permits. For guaranteed times, weekends, or
                lash lift treatments, we recommend sending a quick WhatsApp beforehand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC]">
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D6336C]" />
                How do evening appointments work?
              </h4>
              <p className="text-xs text-[#1E2A5A]/75 leading-relaxed">
                If you work full-time and cannot make daytime hours, we offer private evening slots from 5:00pm onwards.
                Simply WhatsApp 07904 994275 to arrange a time that suits your schedule.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC]">
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D6336C]" />
                What payment methods do you accept?
              </h4>
              <p className="text-xs text-[#1E2A5A]/75 leading-relaxed">
                We accept contactless card payments, Apple Pay, Google Pay, and cash inside our studio pod.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
