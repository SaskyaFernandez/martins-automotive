import {
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  AvailabilityResponse,
  CustomerInfo
} from '@/types/appointment';
import {
  getServiceDuration,
  calculateEndTime,
  getServiceCapacityLimits,
  getWeekStart,
  getWeekEnd
} from './serviceDurations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Backend calendar event interface matching your Google Calendar API response
interface CalendarEvent {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startHour: string; // HH:MM
  endHour: string; // HH:MM
}

interface CalendarStatusResponse {
  success: boolean;
  calendar: {
    events: {
      items: CalendarEvent[];
    };
  };
}

/**
 * Create a new appointment in Google Calendar
 * POST endpoint should be implemented in backend: /calendar/appointment
 */
export async function createAppointment(
  appointmentData: CreateAppointmentRequest
): Promise<CreateAppointmentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create appointment:', error);

    // Fallback mock response for development (when backend POST endpoint is not ready)
    return {
      id: `mock-${Date.now()}`,
      appointmentNumber: `RDV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      message: 'Rendez-vous en attente de confirmation. Nous vous contacterons bientôt.',
    };
  }
}

/**
 * Get availability from Google Calendar for a date range
 * Uses the existing /calendar/status endpoint
 */
export async function getAvailability(dateMin: string, dateMax: string): Promise<AvailabilityResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/calendar/status?dateMin=${dateMin}&dateMax=${dateMax}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CalendarStatusResponse = await response.json();

    // Convert calendar events to availability slots
    return convertCalendarToAvailability(data.calendar.events.items, dateMin, dateMax);
  } catch (error) {
    console.error('Failed to get availability:', error);

    // Fallback mock response for development
    const date = dateMin.split('T')[0];
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

/**
 * Convert Google Calendar events to availability slots
 * This creates time slots and marks them as unavailable if there's an event
 */
function convertCalendarToAvailability(
  events: CalendarEvent[],
  dateMin: string,
  dateMax: string
): AvailabilityResponse {
  const slots: { date: string; time: string; available: boolean }[] = [];

  // Business hours: 9:00 AM to 6:00 PM
  const workingHours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  // Get all dates in the range (use local date to avoid timezone issues)
  const startDate = new Date(dateMin);
  const endDate = new Date(dateMax);
  const dates: string[] = [];

  // Convert to local date strings to avoid timezone shifts
  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(formatLocalDate(d));
    }
  }

  // Create slots for each date and check against events
  dates.forEach(date => {
    workingHours.forEach(time => {
      const isBooked = events.some(event => {
        if (event.date !== date) return false;

        // Note: We check availability with a 1-hour slot here
        // The frontend will filter based on actual service duration
        const [slotHour, slotMin] = time.split(':').map(Number);
        const slotEndHour = slotHour + 1;
        const slotEnd = `${String(slotEndHour).padStart(2, '0')}:${String(slotMin).padStart(2, '0')}`;

        // Check if slot overlaps with event
        // Slot is booked if: slot starts before event ends AND slot ends after event starts
        return time < event.endHour && slotEnd > event.startHour;
      });

      slots.push({
        date,
        time,
        available: !isBooked
      });
    });
  });

  return {
    date: dateMin.split('T')[0],
    slots
  };
}

/**
 * Check service capacity for a specific date and service
 * Returns true if the service can still accept appointments
 */
export function checkServiceCapacity(
  targetDate: string,
  service: string,
  events: CalendarEvent[]
): { canBook: boolean; reason?: string; dailyCount?: number; weeklyCount?: number; lastAppointmentDate?: string } {
  const capacityLimits = getServiceCapacityLimits(service);

  // If no limits defined, always allow booking
  if (!capacityLimits.maxPerDay && !capacityLimits.maxPerWeek && !capacityLimits.cooldownDays) {
    return { canBook: true };
  }

  // Check cooldown period if defined (priority over other limits)
  if (capacityLimits.cooldownDays) {
    const targetDateObj = new Date(targetDate + 'T00:00:00');

    // Find all appointments for this service
    const serviceEvents = events.filter(event => event.title.includes(service));

    console.log(`[Cooldown Check] Service: ${service}, Target date: ${targetDate}`);
    console.log(`[Cooldown Check] Found ${serviceEvents.length} service events:`, serviceEvents);

    if (serviceEvents.length > 0) {
      // Sort by date descending to get the most recent appointment
      serviceEvents.sort((a, b) => b.date.localeCompare(a.date));
      const lastAppointment = serviceEvents[0];
      const lastAppointmentDate = new Date(lastAppointment.date + 'T00:00:00');

      // Calculate days difference
      const daysDifference = Math.floor(
        (targetDateObj.getTime() - lastAppointmentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      console.log(`[Cooldown Check] Last appointment: ${lastAppointment.date}, Days difference: ${daysDifference}, Required: ${capacityLimits.cooldownDays}`);

      // Check if enough days have passed
      if (daysDifference < capacityLimits.cooldownDays) {
        console.log(`[Cooldown Check] ❌ BLOCKED - Not enough days have passed`);
        return {
          canBook: false,
          reason: `Dernier rendez-vous ${service} le ${lastAppointment.date}. Prochain disponible après ${capacityLimits.cooldownDays} jours.`,
          lastAppointmentDate: lastAppointment.date
        };
      }
      console.log(`[Cooldown Check] ✅ ALLOWED - Cooldown period has passed`);
    } else {
      console.log(`[Cooldown Check] ✅ ALLOWED - No previous appointments found`);
    }

    // Cooldown period has passed or no previous appointments
    return { canBook: true };
  }

  // Count existing appointments for this service on the target date
  const dailyCount = events.filter(event =>
    event.date === targetDate && event.title.includes(service)
  ).length;

  // Check daily limit
  if (capacityLimits.maxPerDay && dailyCount >= capacityLimits.maxPerDay) {
    return {
      canBook: false,
      reason: `Capacité journalière atteinte pour ${service} (${capacityLimits.maxPerDay} max)`,
      dailyCount
    };
  }

  // Check weekly limit if defined
  if (capacityLimits.maxPerWeek) {
    const targetDateObj = new Date(targetDate);
    const weekStart = getWeekStart(targetDateObj);
    const weekEnd = getWeekEnd(targetDateObj);

    const weeklyCount = events.filter(event => {
      const eventDate = event.date;
      return eventDate >= weekStart &&
             eventDate <= weekEnd &&
             event.title.includes(service);
    }).length;

    if (weeklyCount >= capacityLimits.maxPerWeek) {
      return {
        canBook: false,
        reason: `Capacité hebdomadaire atteinte pour ${service} (${capacityLimits.maxPerWeek} max)`,
        weeklyCount
      };
    }

    return { canBook: true, dailyCount, weeklyCount };
  }

  return { canBook: true, dailyCount };
}

/**
 * Get availability with capacity limits for a specific service
 * This version filters slots based on service capacity limits
 */
export async function getAvailabilityWithCapacity(
  dateMin: string,
  dateMax: string,
  service: string
): Promise<AvailabilityResponse & { capacityInfo?: Record<string, { dailyCount?: number; weeklyCount?: number }> }> {
  try {
    // First, fetch the current date range for availability
    const response = await fetch(
      `${API_BASE_URL}/calendar/status?dateMin=${dateMin}&dateMax=${dateMax}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CalendarStatusResponse = await response.json();
    const baseAvailability = convertCalendarToAvailability(data.calendar.events.items, dateMin, dateMax);

    // For cooldown check, we need to fetch historical events
    const capacityLimits = getServiceCapacityLimits(service);
    let allEvents = data.calendar.events.items;

    // If service has cooldown, fetch more historical data
    if (capacityLimits.cooldownDays) {
      const targetDate = new Date(dateMin);
      const pastDate = new Date(targetDate);
      pastDate.setDate(pastDate.getDate() - 30); // Look back 30 days

      const historicalResponse = await fetch(
        `${API_BASE_URL}/calendar/status?dateMin=${pastDate.toISOString()}&dateMax=${dateMax}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (historicalResponse.ok) {
        const historicalData: CalendarStatusResponse = await historicalResponse.json();
        allEvents = historicalData.calendar.events.items;
      }
    }

    // Apply capacity limits to each slot
    const capacityInfo: Record<string, { dailyCount?: number; weeklyCount?: number }> = {};
    const slotsWithCapacity = baseAvailability.slots.map(slot => {
      // Only check capacity if slot is available
      if (!slot.available) return slot;

      const capacityCheck = checkServiceCapacity(slot.date, service, allEvents);
      capacityInfo[slot.date] = {
        dailyCount: capacityCheck.dailyCount,
        weeklyCount: capacityCheck.weeklyCount
      };

      return {
        ...slot,
        available: slot.available && capacityCheck.canBook
      };
    });

    return {
      ...baseAvailability,
      slots: slotsWithCapacity,
      capacityInfo
    };
  } catch (error) {
    console.error('Failed to get availability with capacity:', error);

    // Fallback mock response
    const date = dateMin.split('T')[0];
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
  customerInfo: CustomerInfo;
  locale?: string;
}): CreateAppointmentRequest & { duration: number; endTime: string; locale?: string } {
  // Combine date and time into ISO datetime string
  const dateTime = new Date(`${appointmentData.date}T${appointmentData.time}:00`).toISOString();

  // Get service duration and calculate end time
  const duration = getServiceDuration(appointmentData.service);
  const endTime = calculateEndTime(appointmentData.time, duration);

  return {
    service: appointmentData.service,
    dateTime,
    duration,
    endTime,
    locale: appointmentData.locale || 'fr', // Default to French if locale not provided
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

