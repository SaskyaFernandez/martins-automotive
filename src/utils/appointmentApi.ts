import { 
  CreateAppointmentRequest, 
  CreateAppointmentResponse,
  AvailabilityResponse 
} from '@/types/appointment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Placeholder functions for backend integration
// These will be replaced with actual API calls when the backend is ready

export async function createAppointment(
  appointmentData: CreateAppointmentRequest
): Promise<CreateAppointmentResponse> {
  try {
    // TODO: Replace with actual API call when backend is ready
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create appointment:', error);
    
    // Mock response for development
    return {
      id: `mock-${Date.now()}`,
      appointmentNumber: `RDV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      message: 'Rendez-vous confirmé! Nous vous contacterons bientôt.',
    };
  }
}

export async function getAvailability(date: string): Promise<AvailabilityResponse> {
  try {
    // TODO: Replace with actual API call when backend is ready
    const response = await fetch(`${API_BASE_URL}/availability?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get availability:', error);
    
    // Mock response for development
    return {
      date,
      slots: [
        { date, time: '09:00', available: true },
        { date, time: '10:00', available: false },
        { date, time: '11:00', available: true },
        { date, time: '14:00', available: true },
        { date, time: '15:00', available: false },
        { date, time: '16:00', available: true },
        { date, time: '17:00', available: true },
      ],
    };
  }
}

// Utility function to convert appointment data to API format
export function convertToApiFormat(appointmentData: {
  service: string;
  date: string;
  time: string;
  customerInfo: any;
}): CreateAppointmentRequest {
  // Combine date and time into ISO datetime string
  const dateTime = new Date(`${appointmentData.date}T${appointmentData.time}:00`).toISOString();

  return {
    service: appointmentData.service,
    dateTime,
    customer: {
      firstName: appointmentData.customerInfo.firstName,
      lastName: appointmentData.customerInfo.lastName,
      email: appointmentData.customerInfo.email,
      phone: appointmentData.customerInfo.phone,
      chassisNumber: appointmentData.customerInfo.chassisNumber,
      description: appointmentData.customerInfo.description,
    },
  };
}

// Mock function to simulate backend validation
export function validateAppointmentData(data: CreateAppointmentRequest): string[] {
  const errors: string[] = [];

  if (!data.service) errors.push('Service is required');
  if (!data.dateTime) errors.push('Date and time are required');
  if (!data.customer.firstName) errors.push('First name is required');
  if (!data.customer.lastName) errors.push('Last name is required');
  if (!data.customer.email) errors.push('Email is required');
  if (!data.customer.phone) errors.push('Phone is required');
  if (!data.customer.chassisNumber) errors.push('Chassis number is required');
  if (!data.customer.description) errors.push('Service description is required');

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.customer.email && !emailRegex.test(data.customer.email)) {
    errors.push('Invalid email format');
  }

  // Validate appointment is not in the past
  const appointmentDate = new Date(data.dateTime);
  if (appointmentDate < new Date()) {
    errors.push('Appointment cannot be in the past');
  }

  return errors;
}