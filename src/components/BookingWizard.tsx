import { useState } from 'react';
import { Star, Refresh, Page, Home, VideoCamera, Calendar, Clock } from 'iconoir-react';
import './BookingWizard.css';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface BookingData {
  providerId: string;
  providerName: string;
  consultationReason: 'first_time' | 'follow_up' | 'assessment' | '';
  format: 'in_person' | 'video' | '';
  selectedDate: Date | null;
  selectedTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rgpdConsent: boolean;
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    providerId: '',
    providerName: '',
    consultationReason: '',
    format: '',
    selectedDate: null,
    selectedTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rgpdConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProviderSelect = (id: string, name: string) => {
    setBookingData(prev => ({ ...prev, providerId: id, providerName: name }));
    setCurrentStep(2);
  };

  const handleReasonSelect = (reason: 'first_time' | 'follow_up' | 'assessment') => {
    setBookingData(prev => ({ ...prev, consultationReason: reason }));
    setCurrentStep(3);
  };

  const handleFormatSelect = (format: 'in_person' | 'video') => {
    setBookingData(prev => ({ ...prev, format }));
    setCurrentStep(4);
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setBookingData(prev => ({ ...prev, selectedDate: date, selectedTime: time }));
    setCurrentStep(5);
  };

  const handleContactSubmit = (data: { firstName: string; lastName: string; email: string; phone: string; rgpdConsent: boolean }) => {
    setBookingData(prev => ({ ...prev, ...data }));
    setCurrentStep(6);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Call API to create appointment
      console.log('Booking data:', bookingData);
      // Show success message
      alert('Rendez-vous confirmé ! Vous allez recevoir un email de confirmation.');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-wizard">
      <div className="booking-wizard-container">
        {/* Sidebar Progress */}
        <div className="booking-sidebar">
          <div className="booking-sidebar-header">
            <h1 className="booking-sidebar-title">Prendre RDV</h1>
            <p className="booking-sidebar-subtitle">Réservez votre consultation</p>
          </div>

          <div className="booking-progress-vertical">
            {[
              { num: 1, label: 'Praticien', desc: 'Choisissez votre psychologue' },
              { num: 2, label: 'Motif', desc: 'Type de consultation' },
              { num: 3, label: 'Format', desc: 'Présentiel ou visio' },
              { num: 4, label: 'Date & Heure', desc: 'Sélectionnez un créneau' },
              { num: 5, label: 'Coordonnées', desc: 'Vos informations' },
              { num: 6, label: 'Confirmation', desc: 'Validez votre RDV' },
            ].map((step) => (
              <div
                key={step.num}
                className={`booking-progress-item ${currentStep >= step.num ? 'active' : ''} ${currentStep === step.num ? 'current' : ''}`}
              >
                <div className="booking-progress-number">{step.num}</div>
                <div className="booking-progress-info">
                  <div className="booking-progress-label">{step.label}</div>
                  <div className="booking-progress-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="booking-main-content">
          <div className="booking-content">
            {currentStep === 1 && (
              <Step1ProviderSelection onSelect={handleProviderSelect} />
            )}
            {currentStep === 2 && (
              <Step2ConsultationReason onSelect={handleReasonSelect} onBack={() => setCurrentStep(1)} />
            )}
            {currentStep === 3 && (
              <Step3Format onSelect={handleFormatSelect} onBack={() => setCurrentStep(2)} />
            )}
            {currentStep === 4 && (
              <Step4Calendar onSelect={handleDateTimeSelect} onBack={() => setCurrentStep(3)} providerId={bookingData.providerId} />
            )}
            {currentStep === 5 && (
              <Step5Contact onSubmit={handleContactSubmit} onBack={() => setCurrentStep(4)} />
            )}
            {currentStep === 6 && (
              <Step6Confirmation bookingData={bookingData} onConfirm={handleFinalSubmit} onBack={() => setCurrentStep(5)} isSubmitting={isSubmitting} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Provider Selection
function Step1ProviderSelection({ onSelect }: { onSelect: (id: string, name: string) => void }) {
  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Choisissez votre praticien</h2>
      <p className="booking-step-subtitle">Sélectionnez le psychologue avec qui vous souhaitez prendre rendez-vous</p>
      
      <div className="provider-cards">
        <button className="provider-card" onClick={() => onSelect('theo-id', 'Théo Gichtenaere')}>
          <div className="provider-card-image">
            <img src="/dist/providers/theo-avatar.jpg" alt="Théo Gichtenaere" />
          </div>
          <h3 className="provider-card-name">Théo Gichtenaere</h3>
          <p className="provider-card-title">Psychologue clinicien</p>
          <p className="provider-card-specialties">
            Thérapies cognitivo-comportementales • Adultes & Adolescents
          </p>
        </button>

        <button className="provider-card" onClick={() => onSelect('cloe-id', 'Cloé Gichtenaere')}>
          <div className="provider-card-image">
            <img src="/dist/providers/cloe-avatar.jpg" alt="Cloé Gichtenaere" />
          </div>
          <h3 className="provider-card-name">Cloé Gichtenaere</h3>
          <p className="provider-card-title">Neuropsychologue</p>
          <p className="provider-card-specialties">
            Bilans neuropsychologiques • Neurosciences • Accompagnement cognitif
          </p>
        </button>
      </div>
    </div>
  );
}

// Step 2: Consultation Reason
function Step2ConsultationReason({ onSelect, onBack }: { onSelect: (reason: 'first_time' | 'follow_up' | 'assessment') => void; onBack: () => void }) {
  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Motif de consultation</h2>
      <p className="booking-step-subtitle">Quel est l'objet de votre rendez-vous ?</p>
      
      <div className="reason-options">
        <button className="reason-option" onClick={() => onSelect('first_time')}>
          <div className="reason-icon-wrapper">
            <Star className="reason-icon-svg" strokeWidth={2} />
          </div>
          <h3 className="reason-title">Première consultation</h3>
          <p className="reason-desc">Vous consultez pour la première fois</p>
        </button>

        <button className="reason-option" onClick={() => onSelect('follow_up')}>
          <div className="reason-icon-wrapper">
            <Refresh className="reason-icon-svg" strokeWidth={2} />
          </div>
          <h3 className="reason-title">Suivi</h3>
          <p className="reason-desc">Vous êtes déjà suivi(e) par ce praticien</p>
        </button>

        <button className="reason-option" onClick={() => onSelect('assessment')}>
          <div className="reason-icon-wrapper">
            <Page className="reason-icon-svg" strokeWidth={2} />
          </div>
          <h3 className="reason-title">Bilan</h3>
          <p className="reason-desc">Bilan psychologique ou neuropsychologique</p>
        </button>
      </div>

      <button className="booking-back-btn" onClick={onBack}>← Retour</button>
    </div>
  );
}

// Step 3: Format
function Step3Format({ onSelect, onBack }: { onSelect: (format: 'in_person' | 'video') => void; onBack: () => void }) {
  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Format de consultation</h2>
      <p className="booking-step-subtitle">Comment souhaitez-vous consulter ?</p>
      
      <div className="format-options">
        <button className="format-option" onClick={() => onSelect('in_person')}>
          <div className="format-icon-wrapper">
            <Home className="format-icon-svg" strokeWidth={2} />
          </div>
          <h3 className="format-title">Présentiel</h3>
          <p className="format-desc">Au cabinet, 123 rue Example, Paris</p>
          <div className="format-badge">Recommandé</div>
        </button>

        <button className="format-option" onClick={() => onSelect('video')}>
          <div className="format-icon-wrapper">
            <VideoCamera className="format-icon-svg" strokeWidth={2} />
          </div>
          <h3 className="format-title">Visioconférence</h3>
          <p className="format-desc">En ligne, via un lien sécurisé</p>
          <div className="format-badge secondary">Flexible</div>
        </button>
      </div>

      <button className="booking-back-btn" onClick={onBack}>← Retour</button>
    </div>
  );
}

// Step 4: Custom Calendar
function Step4Calendar({ onSelect, onBack, providerId }: { onSelect: (date: Date, time: string) => void; onBack: () => void; providerId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate time slots from 9:00 to 18:00 (every 30 minutes)
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const totalMinutes = i * 30;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isPast = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const past = isPast(day);
    const today = isToday(day);
    const selected = isSelected(day);
    
    calendarDays.push(
      <button
        key={day}
        className={`calendar-day ${past ? 'past' : ''} ${today ? 'today' : ''} ${selected ? 'selected' : ''}`}
        onClick={() => handleDateClick(day)}
        disabled={past}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Choisissez une date et heure</h2>
      <p className="booking-step-subtitle">Sélectionnez un créneau disponible</p>
      
      <div className="calendar-container-custom">
        <div className="calendar-grid-wrapper">
          {/* Calendar Header */}
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={previousMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3 className="calendar-month-year">{monthNames[month]} {year}</h3>
            <button className="calendar-nav-btn" onClick={nextMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Day Names */}
          <div className="calendar-weekdays">
            {dayNames.map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {calendarDays}
          </div>
        </div>

        {/* Time Slots */}
        <div className="time-slots-wrapper">
          <div className="time-slots-header-wrapper">
            <Clock className="time-slots-icon" strokeWidth={2} />
            <h3 className="time-slots-header">Créneaux disponibles</h3>
          </div>
          {selectedDate ? (
            <div className="time-slots-grid">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="time-slots-placeholder">
              <p>Sélectionnez d'abord une date</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="booking-selection-summary">
          <Calendar className="summary-icon" strokeWidth={2} />
          <span>
            Rendez-vous le <strong>{selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> à <strong>{selectedTime}</strong>
          </span>
        </div>
      )}

      <div className="booking-step-actions">
        <button className="booking-back-btn" onClick={onBack}>← Retour</button>
        <button 
          className="booking-continue-btn" 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}

// Step 5: Contact Information
function Step5Contact({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rgpdConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Vos coordonnées</h2>
      <p className="booking-step-subtitle">Pour confirmer votre rendez-vous</p>
      
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-form-row">
          <div className="booking-form-group">
            <label htmlFor="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
              placeholder="Votre prénom"
            />
          </div>

          <div className="booking-form-group">
            <label htmlFor="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div className="booking-form-row">
          <div className="booking-form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="votre.email@exemple.fr"
            />
          </div>

          <div className="booking-form-group">
            <label htmlFor="phone">Téléphone *</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        <div className="booking-form-group">
          <label className="booking-checkbox">
            <input
              type="checkbox"
              checked={formData.rgpdConsent}
              onChange={(e) => setFormData(prev => ({ ...prev, rgpdConsent: e.target.checked }))}
              required
            />
            <span>
              J'accepte que mes données personnelles soient traitées conformément à la{' '}
              <a href="/politique-confidentialite" target="_blank">politique de confidentialité</a>
            </span>
          </label>
        </div>

        <div className="booking-step-actions">
          <button type="button" className="booking-back-btn" onClick={onBack}>← Retour</button>
          <button type="submit" className="booking-continue-btn" disabled={!formData.rgpdConsent}>
            Continuer →
          </button>
        </div>
      </form>
    </div>
  );
}

// Step 6: Confirmation
function Step6Confirmation({ bookingData, onConfirm, onBack, isSubmitting }: { bookingData: BookingData; onConfirm: () => void; onBack: () => void; isSubmitting: boolean }) {
  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Confirmation</h2>
      <p className="booking-step-subtitle">Vérifiez les informations de votre rendez-vous</p>
      
      <div className="booking-summary">
        <div className="booking-summary-item">
          <strong>Praticien :</strong> {bookingData.providerName}
        </div>
        <div className="booking-summary-item">
          <strong>Motif :</strong>{' '}
          {bookingData.consultationReason === 'first_time' && 'Première consultation'}
          {bookingData.consultationReason === 'follow_up' && 'Suivi'}
          {bookingData.consultationReason === 'assessment' && 'Bilan'}
        </div>
        <div className="booking-summary-item">
          <strong>Format :</strong>{' '}
          {bookingData.format === 'in_person' ? 'Présentiel' : 'Visioconférence'}
        </div>
        <div className="booking-summary-item">
          <strong>Date et heure :</strong>{' '}
          {bookingData.selectedDate?.toLocaleDateString('fr-FR')} à {bookingData.selectedTime}
        </div>
        <div className="booking-summary-item">
          <strong>Patient :</strong> {bookingData.firstName} {bookingData.lastName}
        </div>
        <div className="booking-summary-item">
          <strong>Email :</strong> {bookingData.email}
        </div>
        <div className="booking-summary-item">
          <strong>Téléphone :</strong> {bookingData.phone}
        </div>
      </div>

      <div className="booking-step-actions">
        <button className="booking-back-btn" onClick={onBack} disabled={isSubmitting}>
          ← Retour
        </button>
        <button className="booking-confirm-btn" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? 'Confirmation...' : 'Confirmer le rendez-vous'}
        </button>
      </div>
    </div>
  );
}
