import { useState } from "react";

interface IconDef {
  id: string;
  name: string;
  category: string;
  render: (size: number, color: string) => React.ReactNode;
}

const ICONS: IconDef[] = [
  // === LEAD GENERATION ===
  { id: "accountability-coach", name: "Accountability Coach", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8l2 2 4-4" /><line x1="9" y1="14" x2="15" y2="14" /><line x1="9" y1="17" x2="13" y2="17" /><circle cx="17" cy="5" r="1.5" fill={c} opacity="0.4" /></svg> },
  { id: "social-media-engine", name: "Social Media Engine", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><line x1="10" y1="10" x2="6.5" y2="7.5" /><line x1="14" y1="10" x2="17.5" y2="7.5" /><line x1="10" y1="14" x2="6.5" y2="16.5" /><line x1="14" y1="14" x2="17.5" y2="16.5" /><circle cx="12" cy="12" r="6" opacity="0.15" /></svg> },
  { id: "video-marketing", name: "Video Marketing", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><polygon points="10,8 16,12 10,16" fill={c} opacity="0.2" stroke={c} /><path d="M17 3l2-1" opacity="0.4" /><circle cx="20" cy="2" r="1" fill={c} opacity="0.3" /></svg> },
  { id: "expired-fsbo-finder", name: "Expired/FSBO Finder", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="6" /><line x1="14.5" y1="14.5" x2="20" y2="20" strokeWidth="2" /><path d="M8 10l2-3 2 3" opacity="0.5" /><line x1="7" y1="12" x2="13" y2="12" opacity="0.3" /><circle cx="10" cy="10" r="3" opacity="0.15" strokeDasharray="2 2" /></svg> },
  { id: "campaign-manager", name: "Campaign Manager", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15l4-3V8l8-4v4" /><path d="M8 12l12-6" opacity="0.3" /><circle cx="20" cy="6" r="2" fill={c} opacity="0.3" /><path d="M16 6l2-3" opacity="0.4" /><path d="M4 15v4h4l-4-4z" fill={c} opacity="0.15" /></svg> },
  { id: "quick-send", name: "Quick Send", category: "Lead Generation",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l18-8-8 18-2-8z" /><line x1="11" y1="14" x2="21" y2="4" opacity="0.3" /><line x1="2" y1="8" x2="6" y2="9" opacity="0.3" /><line x1="2" y1="11" x2="5" y2="11" opacity="0.2" /></svg> },

  // === LEAD CAPTURE ===
  { id: "landing-pages", name: "Landing Pages", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="8" x2="21" y2="8" /><circle cx="6" cy="5.5" r="1" fill={c} opacity="0.3" /><circle cx="9" cy="5.5" r="1" fill={c} opacity="0.3" /><rect x="6" y="11" width="12" height="3" rx="1" fill={c} opacity="0.1" /><path d="M16 16l2-1" opacity="0.4" /><circle cx="19" cy="14.5" r="1" fill={c} opacity="0.4" /></svg> },
  { id: "open-house-copilot", name: "Open House Copilot", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7" /><rect x="5" y="10" width="14" height="11" /><rect x="10" y="14" width="4" height="7" fill={c} opacity="0.1" /><path d="M5 14 Q1 16 5 18" opacity="0.25" /><path d="M5 15 Q2 16 5 17" opacity="0.15" /></svg> },
  { id: "cma-generator", name: "CMA Generator", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="14" width="4" height="6" rx="0.5" fill={c} opacity="0.15" /><rect x="11" y="10" width="4" height="10" rx="0.5" fill={c} opacity="0.2" /><rect x="16" y="6" width="4" height="14" rx="0.5" fill={c} opacity="0.25" /><path d="M3 8l5-4 5 3 5-4" opacity="0.4" /><line x1="3" y1="20" x2="21" y2="20" opacity="0.3" /></svg> },
  { id: "homeready-icon", name: "HomeReady", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 A8 8 0 0 1 20 20" /><path d="M12 12V6" strokeWidth="2" /><path d="M12 6l3 3" /><circle cx="12" cy="20" r="2" fill={c} opacity="0.2" /><line x1="6" y1="18" x2="4" y2="20" opacity="0.3" /><line x1="18" y1="18" x2="20" y2="20" opacity="0.3" /><line x1="8" y1="14" x2="6" y2="16" opacity="0.3" /></svg> },
  { id: "newsletter-studio", name: "Newsletter Studio", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9 6 9-6" /><rect x="3" y="8" width="18" height="13" rx="2" /><rect x="7" y="4" width="10" height="5" rx="1" opacity="0.3" /><line x1="9" y1="6" x2="15" y2="6" opacity="0.2" /><line x1="9" y1="8" x2="13" y2="8" opacity="0.2" /></svg> },
  { id: "social-capture", name: "Social Capture", category: "Lead Capture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8C8 3 16 3 16 8" strokeWidth="2" /><line x1="8" y1="8" x2="8" y2="16" strokeWidth="2" /><line x1="16" y1="8" x2="16" y2="16" strokeWidth="2" /><path d="M8 16C8 21 16 21 16 16" strokeWidth="2" /><circle cx="4" cy="10" r="2" opacity="0.3" /><circle cx="20" cy="10" r="2" opacity="0.3" /><path d="M6 10Q7 12 8 12" opacity="0.3" /><path d="M18 10Q17 12 16 12" opacity="0.3" /></svg> },

  // === LEAD NURTURE ===
  { id: "journey-engine", name: "Journey Engine", category: "Lead Nurture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20 Q8 14 10 16 Q12 18 14 12 Q16 6 21 4" strokeWidth="2" /><circle cx="7" cy="17" r="2" fill={c} opacity="0.15" stroke={c} /><circle cx="12" cy="14" r="2" fill={c} opacity="0.2" stroke={c} /><circle cx="17" cy="8" r="2" fill={c} opacity="0.25" stroke={c} /><circle cx="21" cy="4" r="1.5" fill={c} opacity="0.4" /></svg> },
  { id: "neighborhood-intel", name: "Neighborhood Intel", category: "Lead Nurture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5.5 5 10c0 5 7 12 7 12s7-7 7-12c0-4.5-3-8-7-8z" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="10" r="7" opacity="0.1" strokeDasharray="2 3" /><path d="M8 7l-1-2" opacity="0.3" /><path d="M16 7l1-2" opacity="0.3" /></svg> },
  { id: "price-alerts", name: "Price Alerts", category: "Lead Nurture",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /><text x="10.5" y="13" fontSize="7" fill={c} fontWeight="600" opacity="0.6">$</text><circle cx="18" cy="4" r="3" fill={c} opacity="0.2" /><circle cx="18" cy="4" r="1.5" fill={c} opacity="0.4" /></svg> },

  // === LISTING HELP ===
  { id: "pre-listing-prep", name: "Pre-Listing Prep", category: "Listing Help",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8l2 2 4-4" /><path d="M8 13l2 2 4-4" /><line x1="8" y1="18" x2="16" y2="18" opacity="0.3" /><path d="M17 2l2-1" opacity="0.4" /><circle cx="20" cy="1" r="1" fill={c} opacity="0.4" /></svg> },
  { id: "launch-system", name: "Launch System", category: "Listing Help",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-6 6-6 16l6 4 6-4c0-10-6-16-6-16z" /><path d="M10 12l2-2 2 2" opacity="0.4" /><line x1="12" y1="10" x2="12" y2="14" opacity="0.4" /><circle cx="12" cy="16" r="1" fill={c} opacity="0.2" /><path d="M6 18l-3 2 3-1" opacity="0.3" /><path d="M18 18l3 2-3-1" opacity="0.3" /></svg> },
  { id: "showing-feedback", name: "Showing Feedback", category: "Listing Help",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12c0-3 3-6 7-6h1c4 0 7 3 7 6v1c0 3-3 4-5 4H9c-2 0-5-1-5-4v-1z" /><path d="M8 18v3l3-2" /><path d="M11 10l1-1 1 1" opacity="0.5" /><circle cx="9" cy="11" r="0.5" fill={c} /><circle cx="15" cy="11" r="0.5" fill={c} /></svg> },

  // === CLIENT RETENTION ===
  { id: "homeowner-portal", name: "Homeowner Portal", category: "Client Retention",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7" /><rect x="5" y="10" width="14" height="11" /><path d="M12 14c-1.5 0-3 1-3 2.5S10.5 19 12 19s3-1 3-2.5S13.5 14 12 14z" fill={c} opacity="0.15" /><path d="M12 14v-1.5" opacity="0.4" /></svg> },
  { id: "anniversary-tracker", name: "Anniversary Tracker", category: "Client Retention",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="16" height="14" rx="2" /><line x1="8" y1="3" x2="8" y2="8" /><line x1="16" y1="3" x2="16" y2="8" /><rect x="9" y="11" width="6" height="6" rx="1" fill={c} opacity="0.15" /><path d="M12 11v-1" opacity="0.4" /><path d="M10 11l2-2 2 2" opacity="0.3" /><circle cx="18" cy="5" r="1" fill={c} opacity="0.4" /></svg> },
  { id: "referral-engine", name: "Referral Engine", category: "Client Retention",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><circle cx="12" cy="18" r="3" /><path d="M10 10l1 6" opacity="0.3" /><path d="M14 10l-1 6" opacity="0.3" /><line x1="11" y1="8" x2="13" y2="8" opacity="0.3" /><path d="M9 10l-2 3" opacity="0.2" /><path d="M15 10l2 3" opacity="0.2" /></svg> },
  { id: "review-generator", name: "Review Generator", category: "Client Retention",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9" fill={c} opacity="0.1" /><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9" /><path d="M4 4 Q7 6 6 3" opacity="0.3" /><path d="M20 4 Q17 6 18 3" opacity="0.3" /></svg> },

  // === BROKER MANAGEMENT ===
  { id: "team-performance", name: "Team Performance", category: "Broker Management",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="14" width="5" height="7" rx="0.5" fill={c} opacity="0.15" /><rect x="9.5" y="8" width="5" height="13" rx="0.5" fill={c} opacity="0.2" /><rect x="16" y="11" width="5" height="10" rx="0.5" fill={c} opacity="0.15" /><circle cx="5.5" cy="11" r="2.5" opacity="0.4" /><circle cx="12" cy="5" r="2.5" opacity="0.5" /><circle cx="18.5" cy="8" r="2.5" opacity="0.4" /><path d="M11 3l1-2 1 2" opacity="0.4" /></svg> },
  { id: "mlo-partner", name: "MLO Partner Manager", category: "Broker Management",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12 Q12 6 16 12" strokeWidth="2" /><rect x="3" y="12" width="6" height="8" rx="1" opacity="0.3" /><rect x="15" y="12" width="6" height="8" rx="1" opacity="0.3" /><circle cx="12" cy="9" r="2" fill={c} opacity="0.2" /><circle cx="10" cy="16" r="1" fill={c} opacity="0.15" /><circle cx="14" cy="16" r="1" fill={c} opacity="0.15" /></svg> },

  // === ENGINES & CORE ===
  { id: "milo-assistant", name: "Milo Smart Assistant", category: "Engines & Core",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="7" /><path d="M9 14v4l3-2 3 2v-4" /><circle cx="10" cy="9" r="1" fill={c} /><circle cx="14" cy="9" r="1" fill={c} /><path d="M10 12 Q12 14 14 12" /><circle cx="12" cy="10" r="4" opacity="0.1" /></svg> },
  { id: "content-engine", name: "Content Engine", category: "Engines & Core",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3l4 4-10 10H5v-4L15 3z" /><line x1="12" y1="6" x2="16" y2="10" opacity="0.3" /><rect x="14" y="16" width="7" height="2" rx="0.5" fill={c} opacity="0.15" /><rect x="14" y="19" width="5" height="2" rx="0.5" fill={c} opacity="0.15" /><circle cx="20" cy="4" r="1" fill={c} opacity="0.3" /></svg> },
  { id: "market-intel", name: "Market Intel", category: "Engines & Core",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20l5-8 4 4 5-10 4 6" strokeWidth="2" /><line x1="3" y1="20" x2="21" y2="20" opacity="0.3" /><circle cx="21" cy="12" r="2" opacity="0.3" /><path d="M18 6l2-3" opacity="0.4" /><circle cx="20" cy="3" r="1.5" fill={c} opacity="0.3" /></svg> },
  { id: "property-engine", name: "Property Engine", category: "Engines & Core",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 7v11H3V10z" /><rect x="8" y="12" width="8" height="9" rx="1" opacity="0.3" /><rect x="6" y="16" width="12" height="2" rx="0.5" fill={c} opacity="0.06" /><rect x="6" y="18" width="12" height="2" rx="0.5" fill={c} opacity="0.1" /><circle cx="12" cy="8" r="1.5" fill={c} opacity="0.3" /></svg> },

  // === DASHBOARD SECTIONS ===
  { id: "todays-schedule", name: "Today's Schedule", category: "Dashboard",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><line x1="12" y1="6" x2="12" y2="12" strokeWidth="2" /><line x1="12" y1="12" x2="16" y2="14" strokeWidth="2" /><rect x="2" y="2" width="6" height="6" rx="1" opacity="0.2" /><line x1="4" y1="1" x2="4" y2="3" opacity="0.3" /><line x1="6" y1="1" x2="6" y2="3" opacity="0.3" /></svg> },
  { id: "hot-leads-alert", name: "Hot Leads Alert", category: "Dashboard",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-1 0-2-.5-2-2h4c0 1.5-1 2-2 2z" /><path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M12 3c-1 0-2 1-2 3 0 2 1 4 2 5s2-3 2-5c0-2-1-3-2-3z" fill={c} opacity="0.2" /><circle cx="17" cy="4" r="2" fill={c} opacity="0.3" /></svg> },
  { id: "agent-partners", name: "Agent Partners", category: "Dashboard",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="7" r="3" /><circle cx="16" cy="7" r="3" /><path d="M2 20c0-4 3-7 6-7" /><path d="M22 20c0-4-3-7-6-7" /><line x1="11" y1="13" x2="13" y2="13" opacity="0.3" /><rect x="9" y="16" width="6" height="4" rx="1" opacity="0.15" /></svg> },

  // === SYSTEM / UNIVERSAL ===
  { id: "close", name: "Close (X)", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> },
  { id: "chevron-down", name: "Chevron Down", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg> },
  { id: "chevron-right", name: "Chevron Right", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg> },
  { id: "chevron-left", name: "Chevron Left", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg> },
  { id: "search", name: "Search", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg> },
  { id: "plus", name: "Plus / Add", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> },
  { id: "check", name: "Check", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg> },
  { id: "more-dots", name: "More (Dots)", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="6" r="1.5" fill={c} /><circle cx="12" cy="12" r="1.5" fill={c} /><circle cx="12" cy="18" r="1.5" fill={c} /></svg> },
  { id: "arrow-right", name: "Arrow Right", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><path d="M14 7l5 5-5 5" /></svg> },
  { id: "edit-pencil", name: "Edit / Pencil", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3l4 4-10 10H5v-4L15 3z" /><line x1="12" y1="6" x2="16" y2="10" opacity="0.3" /></svg> },
  { id: "trash", name: "Delete / Trash", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16" /><path d="M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7" /><path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" /><line x1="10" y1="11" x2="10" y2="17" opacity="0.4" /><line x1="14" y1="11" x2="14" y2="17" opacity="0.4" /></svg> },
  { id: "mail", name: "Mail / Email", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg> },
  { id: "phone", name: "Phone / Call", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5A11 11 0 0013.5 15L15 12.5l5 2v4a2 2 0 01-2 2A16 16 0 013 4.5 2 2 0 015 4z" /></svg> },
  { id: "settings-gear", name: "Settings / Gear", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
  { id: "filter", name: "Filter", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8.5V18l-4 2V12.5z" /></svg> },
  { id: "sort", name: "Sort", category: "System",
    render: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="16" y2="6" /><line x1="4" y1="12" x2="12" y2="12" /><line x1="4" y1="18" x2="8" y2="18" /><path d="M18 14l2 4-2 4" opacity="0.4" /></svg> },
];

const CATEGORIES = ["System", "Lead Generation", "Lead Capture", "Lead Nurture", "Listing Help", "Client Retention", "Broker Management", "Engines & Core", "Dashboard"];

export function IconCatalogDemo() {
  const [size, setSize] = useState(24);
  const [color, setColor] = useState("var(--neutral-700)");

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-[var(--neutral-700)]">Custom Icon Library — {ICONS.length} Icons</span>
          <p className="text-[10px] text-[var(--neutral-400)]">Replaces Iconoir for platform-specific icons</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[var(--neutral-500)]">Size:</span>
            {[16, 20, 24, 32].map(s => (
              <button key={s} onClick={() => setSize(s)} className={`px-1.5 py-0.5 text-[10px] rounded ${size === s ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--neutral-100)] text-[var(--neutral-600)]"}`}>{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[var(--neutral-500)]">Color:</span>
            {[
              { c: "var(--neutral-700)", l: "Default" },
              { c: "var(--brand-primary)", l: "Primary" },
              { c: "var(--brand-accent)", l: "Accent" },
              { c: "var(--neutral-400)", l: "Muted" },
            ].map(({ c, l }) => (
              <button key={l} onClick={() => setColor(c)} className={`px-1.5 py-0.5 text-[10px] rounded ${color === c ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--neutral-100)] text-[var(--neutral-600)]"}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-5">
        {CATEGORIES.map(cat => {
          const catIcons = ICONS.filter(i => i.category === cat);
          if (catIcons.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">{cat}</p>
              <div className="grid grid-cols-6 gap-2">
                {catIcons.map(icon => (
                  <div key={icon.id} className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 flex flex-col items-center gap-2 hover:shadow-xs transition-shadow">
                    <div className="flex items-center justify-center" style={{ width: 40, height: 40 }}>
                      {icon.render(size, color)}
                    </div>
                    <span className="text-[9px] text-[var(--neutral-500)] text-center leading-tight">{icon.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
