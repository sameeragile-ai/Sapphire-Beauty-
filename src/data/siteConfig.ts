export interface DayHours {
  day: string;
  shortDay: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export const siteConfig = {
  name: "Sapphire Beauty Kingschase",
  shortName: "Sapphire Beauty",
  tagline: "Beauty begins with confidence",
  secondaryTagline: "Your beauty, our passion",
  specialist: "Brows & Lash Expert",
  experienceYears: "15+",
  
  contact: {
    phone: "07904 994275",
    phoneInternational: "+447904994275",
    whatsappUrl: "https://wa.me/447904994275",
    email: "Sapphirebeautykingschase@gmail.com",
    address: {
      line1: "Sapphire Beauty, Kings Chase Shopping Centre",
      line2: "Outside Boots, Regent Street",
      town: "Kingswood",
      city: "Bristol",
      postcode: "BS15 8LP",
      country: "United Kingdom",
      full: "Kings Chase Shopping Centre (outside Boots), Regent St, Kingswood, Bristol BS15 8LP",
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.297746353381!2d-2.510688623380063!3d51.45268397179975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e001f3f619b%3A0x6b3b55bc434f0df4!2sKings%20Chase%20Shopping%20Centre!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Kings+Chase+Shopping+Centre+Bristol+BS15+8LP",
  },

  socials: {
    instagram: "https://www.instagram.com/sapphirebeauty_kingschase",
    instagramHandle: "@sapphirebeauty_kingschase",
    facebook: "https://www.facebook.com/p/Sapphire-Beauty-Kingschase-100072217316197/",
  },

  ratings: {
    googleScore: 4.5,
    googleReviewCount: 34,
    facebookRecommendRate: "100%",
  },

  openingHours: [
    { day: "Monday", shortDay: "Mon", open: "10:00", close: "16:30" },
    { day: "Tuesday", shortDay: "Tue", open: "10:00", close: "16:30" },
    { day: "Wednesday", shortDay: "Wed", open: "10:00", close: "16:30" },
    { day: "Thursday", shortDay: "Thu", open: "10:00", close: "16:30" },
    { day: "Friday", shortDay: "Fri", open: "10:00", close: "17:00" },
    { day: "Saturday", shortDay: "Sat", open: "10:00", close: "16:30" },
    { day: "Sunday", shortDay: "Sun", open: "", close: "", isClosed: true },
  ] as DayHours[],

  eveningNote: "Evening appointments available from 5:00pm by arrangement (WhatsApp to book)",
  freeGiftThreshold: 45, // Spend £45 for a complimentary spoolie & brow care gift
};

/**
 * Checks whether the salon is currently open based on UK local time.
 */
export function getLiveSalonStatus(): { isOpen: boolean; text: string; nextOpening?: string } {
  try {
    const now = new Date();
    // Convert to UK time
    const ukTimeStr = now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour12: false });
    const ukDayIndex = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" })).getDay();
    // getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
    const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday -> index 6 in openingHours
    const todayConfig = siteConfig.openingHours[dayMap[ukDayIndex]];

    if (!todayConfig || todayConfig.isClosed) {
      return { isOpen: false, text: "Closed today · Reopens Mon at 10:00am" };
    }

    const [currentHour, currentMin] = ukTimeStr.split(":").map(Number);
    const [openH, openM] = todayConfig.open.split(":").map(Number);
    const [closeH, closeM] = todayConfig.close.split(":").map(Number);

    const currentTimeInMins = currentHour * 60 + currentMin;
    const openTimeInMins = openH * 60 + openM;
    const closeTimeInMins = closeH * 60 + closeM;

    if (currentTimeInMins >= openTimeInMins && currentTimeInMins < closeTimeInMins) {
      return { isOpen: true, text: `Open now until ${formatDisplayTime(todayConfig.close)}` };
    }

    if (currentTimeInMins < openTimeInMins) {
      return { isOpen: false, text: `Opening today at ${formatDisplayTime(todayConfig.open)}` };
    }

    return { isOpen: false, text: "Closed for today · Evenings from 5pm by WhatsApp" };
  } catch {
    return { isOpen: true, text: "Open today 10:00am – 4:30pm" };
  }
}

function formatDisplayTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const displayH = h > 12 ? h - 12 : h;
  return `${displayH}:${m === 0 ? "00" : m < 10 ? "0" + m : m}${period}`;
}
