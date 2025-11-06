"use client";
import { useState } from "react";
import InfoIcon from "./InfoIcon";

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
      newErrors.firstName = "Le prénom est requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    }
    if (!formData.chassisNumber.trim()) {
      newErrors.chassisNumber = "Le numéro de châssis est requis";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La description du service est requise";
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
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-black">
          ← Retour
        </button>
        <h2 className="text-2xl font-bold">Vos informations</h2>
        <div></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Appointment Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-4">Récapitulatif de votre rendez-vous</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Service :</strong> {appointmentSummary.service}</div>
            <div><strong>Date :</strong> {formatDate(appointmentSummary.date)}</div>
            <div><strong>Heure :</strong> {appointmentSummary.time}</div>
          </div>
        </div>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Téléphone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="0X XX XX XX XX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium">Numéro de châssis (VIN) *</label>
              <InfoIcon title="Numéro de châssis">
                <div className="text-sm">
                  Sur la carte grise (case E) ou tableau de bord.
                </div>
              </InfoIcon>
            </div>
            <input
              type="text"
              value={formData.chassisNumber}
              onChange={(e) => handleChange('chassisNumber', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                errors.chassisNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Ex: 1HGBH41JXMN109186"
            />
            {errors.chassisNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.chassisNumber}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              17 caractères - Cliquez sur le &quot;i&quot; pour voir où le trouver
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description du service ou réparation nécessaire *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className={`w-full p-3 rounded-lg border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-vertical`}
              placeholder="Décrivez le problème rencontré ou le service souhaité..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="btn-primary text-lg px-8 py-4"
            >
              Confirmer le rendez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}