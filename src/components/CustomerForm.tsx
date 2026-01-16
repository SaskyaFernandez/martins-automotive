"use client";
import { useState } from "react";
import InfoIcon from "./InfoIcon";
import { useTranslations, useLocale } from "next-intl";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  chassisNumber: string;
  description: string;
}

interface AppointmentSummary {
  service: string;
  date: string;
  time: string;
}

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onSubmit: (customerInfo: CustomerInfo) => void;
  onBack: () => void;
  appointmentSummary: AppointmentSummary;
}

export default function CustomerForm({
  customerInfo,
  onSubmit,
  onBack,
  appointmentSummary
}: CustomerFormProps) {
  const t = useTranslations('appointment');
  const locale = useLocale();
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('customerInfo.errors.firstNameRequired');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('customerInfo.errors.lastNameRequired');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('customerInfo.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('customerInfo.errors.emailInvalid');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('customerInfo.errors.phoneRequired');
    }
    if (!formData.chassisNumber.trim()) {
      newErrors.chassisNumber = t('customerInfo.errors.chassisRequired');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('customerInfo.errors.descriptionRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-black text-sm sm:text-base">
          {t('back')}
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{t('customerInfo.title')}</h2>
        <div className="w-16"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Appointment Summary */}
        <div className="bg-amber-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
          <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('summary')}</h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <div><strong>{t('serviceLabel')}</strong> {appointmentSummary.service}</div>
            <div><strong>{t('dateLabel')}</strong> {formatDate(appointmentSummary.date)}</div>
            <div><strong>{t('timeLabel')}</strong> {appointmentSummary.time}</div>
          </div>
        </div>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">{t('customerInfo.firstName')}</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder={t('firstNamePlaceholder')}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">{t('customerInfo.lastName')}</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder={t('lastNamePlaceholder')}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">{t('customerInfo.email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder={t('emailPlaceholder')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">{t('customerInfo.phone')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder={t('phonePlaceholder')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs sm:text-sm font-medium">{t('customerInfo.chassisNumber')}</label>
              <InfoIcon title={t('customerInfo.chassisNumber')}>
                <div className="text-xs sm:text-sm">
                  {t('chassisTooltip')}
                </div>
              </InfoIcon>
            </div>
            <input
              type="text"
              value={formData.chassisNumber}
              onChange={(e) => handleChange('chassisNumber', e.target.value)}
              className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                errors.chassisNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder={t('chassisPlaceholder')}
            />
            {errors.chassisNumber && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.chassisNumber}</p>
            )}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {t('chassisHelp')}
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">
              {t('descriptionLabel')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-vertical`}
              placeholder={t('customerInfo.descriptionPlaceholder')}
            />
            {errors.description && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-center pt-4 sm:pt-6">
            <button
              type="submit"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              {t('buttons.confirm')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}