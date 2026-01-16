/**
 * Service duration configuration
 * Maps each service to its duration in hours
 */
export const SERVICE_DURATIONS: Record<string, number> = {
  // French service names
  "Mon Entretien": 2.5,
  "Liquide de frein": 1,
  "Liquide de refroidissement": 0.5,
  "AdBlue": 0.5,
  "Freinage": 2.5,
  "Éclairage / ampoules": 0.5,
  "Démarrage / batterie": 1,
  "Échappement": 2,
  "Amortisseur / suspension": 3,
  "Transmission / embrayage": 6,
  "Diagnostic Éco-Contrôle": 1,
  "Check Up contrôle technique": 2.5,
  "Mon Entretien + Éco-Contrôle": 3.5,
  "Diagnostic freinage": 1,
  "Diagnostic démarrage et charge": 1,
  "Diagnostic train roulant": 1,
  "Diagnostics électroniques": 1.5,
  "Check Up prêt à partir": 1.5,
  "Check Up hiver": 1.5,
  "Check Up printemps / été": 1.5,
  "Vitrage": 2,
  "Entretien et réparation 2 roues": 2,

  // Dutch service names
  "Mijn Onderhoud": 2.5,
  "Remvloeistof": 1,
  "Koelvloeistof": 0.5,
  "Remmen": 2.5,
  "Verlichting / lampen": 0.5,
  "Starten / accu": 1,
  "Uitlaat": 2,
  "Schokdemper / ophanging": 3,
  "Transmissie / koppeling": 6,
  "Diagnose Milieucontrole": 1,
  "Check Up technische keuring": 2.5,
  "Mijn Onderhoud + Milieucontrole": 3.5,
  "Diagnose remmen": 1,
  "Diagnose starten en laden": 1,
  "Diagnose onderstel": 1,
  "Elektronische diagnose": 1.5,
  "Check Up rijklaar": 1.5,
  "Check Up winter": 1.5,
  "Check Up lente / zomer": 1.5,
  "Beglazing": 2,
  "Onderhoud en reparatie 2 wielers": 2,
};

/**
 * Service capacity limits configuration
 * Defines the maximum number of appointments per day and per week for each service
 * These limits apply to ALL clients combined (global capacity)
 */
export interface ServiceCapacity {
  maxPerDay?: number;        // Maximum appointments per day across all clients (undefined = no limit)
  maxPerWeek?: number;       // Maximum appointments per week across all clients (undefined = no limit)
  cooldownDays?: number;     // Days that must pass after an appointment before next one can be booked (undefined = no cooldown)
}

export const SERVICE_CAPACITY_LIMITS: Record<string, ServiceCapacity> = {
  // French service names
  "Mon Entretien": { cooldownDays: 3 },
  "Liquide de frein": { maxPerDay: 4, maxPerWeek: 20 },
  "Liquide de refroidissement": { maxPerDay: 4, maxPerWeek: 20 },
  "AdBlue": { maxPerDay: 6, maxPerWeek: 30 },
  "Freinage": { maxPerDay: 2, maxPerWeek: 10 },
  "Éclairage / ampoules": { maxPerDay: 4, maxPerWeek: 20 },
  "Démarrage / batterie": { maxPerDay: 3, maxPerWeek: 15 },
  "Échappement": { maxPerDay: 2, maxPerWeek: 10 },
  "Amortisseur / suspension": { maxPerDay: 2, maxPerWeek: 8 },
  "Transmission / embrayage": { maxPerDay: 1, maxPerWeek: 5 },
  "Diagnostic Éco-Contrôle": { maxPerDay: 4, maxPerWeek: 20 },
  "Check Up contrôle technique": { maxPerWeek: 1 },
  "Mon Entretien + Éco-Contrôle": { maxPerDay: 2, maxPerWeek: 8 },
  "Diagnostic freinage": { maxPerDay: 4, maxPerWeek: 20 },
  "Diagnostic démarrage et charge": { maxPerDay: 4, maxPerWeek: 20 },
  "Diagnostic train roulant": { maxPerDay: 4, maxPerWeek: 20 },
  "Diagnostics électroniques": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up prêt à partir": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up hiver": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up printemps / été": { maxPerDay: 3, maxPerWeek: 15 },
  "Vitrage": { maxPerDay: 2, maxPerWeek: 10 },
  "Entretien et réparation 2 roues": { maxPerDay: 2, maxPerWeek: 10 },

  // Dutch service names (same limits)
  "Mijn Onderhoud": { cooldownDays: 3 },
  "Remvloeistof": { maxPerDay: 4, maxPerWeek: 20 },
  "Koelvloeistof": { maxPerDay: 4, maxPerWeek: 20 },
  "Remmen": { maxPerDay: 2, maxPerWeek: 10 },
  "Verlichting / lampen": { maxPerDay: 4, maxPerWeek: 20 },
  "Starten / accu": { maxPerDay: 3, maxPerWeek: 15 },
  "Uitlaat": { maxPerDay: 2, maxPerWeek: 10 },
  "Schokdemper / ophanging": { maxPerDay: 2, maxPerWeek: 8 },
  "Transmissie / koppeling": { maxPerDay: 1, maxPerWeek: 5 },
  "Diagnose Milieucontrole": { maxPerDay: 4, maxPerWeek: 20 },
  "Check Up technische keuring": { maxPerWeek: 1 },
  "Mijn Onderhoud + Milieucontrole": { maxPerDay: 2, maxPerWeek: 8 },
  "Diagnose remmen": { maxPerDay: 4, maxPerWeek: 20 },
  "Diagnose starten en laden": { maxPerDay: 4, maxPerWeek: 20 },
  "Diagnose onderstel": { maxPerDay: 4, maxPerWeek: 20 },
  "Elektronische diagnose": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up rijklaar": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up winter": { maxPerDay: 3, maxPerWeek: 15 },
  "Check Up lente / zomer": { maxPerDay: 3, maxPerWeek: 15 },
  "Beglazing": { maxPerDay: 2, maxPerWeek: 10 },
  "Onderhoud en reparatie 2 wielers": { maxPerDay: 2, maxPerWeek: 10 },
};

/**
 * Get the duration for a specific service in hours
 */
export function getServiceDuration(service: string): number {
  return SERVICE_DURATIONS[service] || 1; // Default to 1 hour if service not found
}

/**
 * Format duration for display
 * @param hours - Duration in hours
 * @param locale - Current locale ('fr' or 'nl')
 * @returns Formatted duration string
 */
export function formatDuration(hours: number, locale: string = 'fr'): string {
  const translations = {
    fr: { hour: 'heure', hours: 'heures', minutes: 'minutes' },
    nl: { hour: 'uur', hours: 'uur', minutes: 'minuten' }
  };

  const t = translations[locale as keyof typeof translations] || translations.fr;

  if (hours === 1) return `1 ${t.hour}`;
  if (hours < 1) {
    const minutes = hours * 60;
    return `${minutes} ${t.minutes}`;
  }
  if (hours % 1 === 0) return `${hours} ${t.hours}`;

  const wholeHours = Math.floor(hours);
  const minutes = (hours - wholeHours) * 60;
  return `${wholeHours}h${minutes.toString().padStart(2, '0')}`;
}

/**
 * Calculate end time based on start time and duration
 * @param startTime - Time in HH:MM format
 * @param durationHours - Duration in hours
 * @returns End time in HH:MM format
 */
export function calculateEndTime(startTime: string, durationHours: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationHours * 60;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;

  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

/**
 * Check if a time slot can accommodate a service based on its duration
 * @param slotTime - Start time in HH:MM format
 * @param durationHours - Duration in hours
 * @param closingTime - Business closing time in HH:MM format (default: 18:00)
 * @returns true if the service can be completed before closing time
 */
export function canFitInWorkingHours(
  slotTime: string,
  durationHours: number,
  closingTime: string = "18:00"
): boolean {
  const endTime = calculateEndTime(slotTime, durationHours);
  return endTime <= closingTime;
}

/**
 * Get capacity limits for a specific service
 */
export function getServiceCapacityLimits(service: string): ServiceCapacity {
  return SERVICE_CAPACITY_LIMITS[service] || {};
}

/**
 * Get the start of the week (Monday) for a given date
 */
export function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const dayStr = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayStr}`;
}

/**
 * Get the end of the week (Sunday) for a given date
 */
export function getWeekEnd(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 0 : 7); // Adjust when day is Sunday
  d.setDate(diff);
  d.setHours(23, 59, 59, 999);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const dayStr = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayStr}`;
}
