/**
 * Maps service names to their translation keys
 * This allows us to translate service names that come from query parameters
 */

const SERVICE_NAME_TO_KEY_MAP: Record<string, string> = {
  // French names
  "Mon Entretien": "mon_entretien",
  "Liquide de frein": "liquide_frein",
  "Liquide de refroidissement": "liquide_refroidissement",
  "AdBlue": "adblue",
  "Freinage": "freinage",
  "Éclairage / ampoules": "eclairage_ampoules",
  "Démarrage / batterie": "demarrage_batterie",
  "Échappement": "echappement",
  "Amortisseur / suspension": "amortisseur_suspension",
  "Transmission / embrayage": "transmission_embrayage",
  "Diagnostic Éco-Contrôle": "diagnostic_eco_controle",
  "Check Up contrôle technique": "check_up_controle_technique",
  "Mon Entretien + Éco-Contrôle": "mon_entretien_eco_controle",
  "Diagnostic freinage": "diagnostic_freinage",
  "Diagnostic démarrage et charge": "diagnostic_demarrage_charge",
  "Diagnostic train roulant": "diagnostic_train_roulant",
  "Diagnostics électroniques": "diagnostics_electroniques",
  "Check Up prêt à partir": "check_up_pret_partir",
  "Check Up hiver": "check_up_hiver",
  "Check Up printemps / été": "check_up_printemps_ete",
  "Vitrage": "vitrage",
  "Entretien et réparation 2 roues": "entretien_reparation_2_roues",

  // Dutch names
  "Mijn Onderhoud": "mon_entretien",
  "Remvloeistof": "liquide_frein",
  "Koelvloeistof": "liquide_refroidissement",
  "Remmen": "freinage",
  "Verlichting / lampen": "eclairage_ampoules",
  "Starten / accu": "demarrage_batterie",
  "Uitlaat": "echappement",
  "Schokdemper / ophanging": "amortisseur_suspension",
  "Transmissie / koppeling": "transmission_embrayage",
  "Diagnose Milieucontrole": "diagnostic_eco_controle",
  "Check Up technische keuring": "check_up_controle_technique",
  "Mijn Onderhoud + Milieucontrole": "mon_entretien_eco_controle",
  "Diagnose remmen": "diagnostic_freinage",
  "Diagnose starten en laden": "diagnostic_demarrage_charge",
  "Diagnose onderstel": "diagnostic_train_roulant",
  "Elektronische diagnose": "diagnostics_electroniques",
  "Check Up rijklaar": "check_up_pret_partir",
  "Check Up winter": "check_up_hiver",
  "Check Up lente / zomer": "check_up_printemps_ete",
  "Beglazing": "vitrage",
  "Onderhoud en reparatie 2 wielers": "entretien_reparation_2_roues",
};

/**
 * Gets the translation key for a service name
 * @param serviceName - The service name in any language
 * @returns The translation key (e.g., "controle_technique") or the original name if not found
 */
export function getServiceKey(serviceName: string): string {
  return SERVICE_NAME_TO_KEY_MAP[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '_');
}

/**
 * Checks if a service name is a known service
 * @param serviceName - The service name to check
 * @returns true if the service is recognized
 */
export function isKnownService(serviceName: string): boolean {
  return serviceName in SERVICE_NAME_TO_KEY_MAP;
}
