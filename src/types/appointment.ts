export interface AppointmentData {
  service: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:MM format
  customerInfo: CustomerInfo;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  chassisNumber: string; // VIN number
  description: string; // Service description or repair details
}

export interface AppointmentSummary {
  service: string;
  date: string;
  time: string;
}

// For backend integration
export interface CreateAppointmentRequest {
  service: string;
  dateTime: string; // ISO datetime string
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    chassisNumber: string;
    description: string;
  };
}

export interface CreateAppointmentResponse {
  id: string;
  appointmentNumber: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  message?: string;
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  available: boolean;
}

export interface AvailabilityResponse {
  date: string; // YYYY-MM-DD
  slots: AvailabilitySlot[];
}