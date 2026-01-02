export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  image: string;
  bio: string;
  experience: string;
  availability: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface RecurrenceRule {
  type: "none" | "daily" | "weekly" | "monthly";
  interval: number; // Every N days/weeks/months
  endType: "occurrences" | "date";
  occurrences?: number; // Number of occurrences
  endDate?: string; // End by date
}

export interface Booking {
  id: string;
  practitionerId: string;
  practitionerName: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  notes?: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
  recurrenceRule?: RecurrenceRule;
  recurrenceGroupId?: string; // Group recurring bookings together
  isRecurring?: boolean;
}

export const practitioners: Practitioner[] = [
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma Recovery"],
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    bio: "Dr. Chen specializes in evidence-based therapy with 15 years of experience helping clients overcome anxiety and trauma.",
    experience: "15 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
  {
    id: "dr-michael-rodriguez",
    name: "Dr. Michael Rodriguez",
    title: "Marriage & Family Therapist",
    specialties: [
      "Couples Counseling",
      "Family Therapy",
      "Relationship Issues",
    ],
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    bio: "Dr. Rodriguez helps couples and families build stronger relationships through compassionate, solution-focused therapy.",
    experience: "12 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
  {
    id: "dr-emily-watson",
    name: "Dr. Emily Watson",
    title: "Certified Life Coach & Therapist",
    specialties: ["Life Coaching", "Career Transitions", "Personal Growth"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Dr. Watson combines therapy with life coaching to help clients achieve their full potential and navigate major life changes.",
    experience: "10 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
  {
    id: "dr-james-thompson",
    name: "Dr. James Thompson",
    title: "Child & Adolescent Specialist",
    specialties: ["Child Therapy", "Adolescent Counseling", "ADHD"],
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    bio: "Dr. Thompson works with children and teens, helping them develop healthy coping strategies and emotional resilience.",
    experience: "18 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
  {
    id: "dr-maria-garcia",
    name: "Dr. Maria Garcia",
    title: "Mindfulness & Wellness Expert",
    specialties: ["Mindfulness", "Stress Management", "Burnout Prevention"],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    bio: "Dr. Garcia integrates mindfulness practices with traditional therapy to help clients find balance and inner peace.",
    experience: "8 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
  {
    id: "dr-david-kim",
    name: "Dr. David Kim",
    title: "Trauma & PTSD Specialist",
    specialties: ["PTSD", "Trauma Recovery", "EMDR Therapy"],
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    bio: "Dr. Kim uses evidence-based approaches like EMDR to help clients heal from traumatic experiences and reclaim their lives.",
    experience: "14 years",
    availability: generateTimeSlots("2025-12-26", 60),
  },
];

function generateTimeSlots(startDate: string, daysAhead: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const start = new Date(startDate);

  for (let day = 0; day < daysAhead; day++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + day);

    // Skip weekends
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      continue;
    }

    const dateStr = currentDate.toISOString().split("T")[0];

    timeSlots.forEach((time, index) => {
      slots.push({
        id: `${dateStr}-${index}`,
        date: dateStr,
        time: time,
        available: Math.random() > 0.3, // 70% available
      });
    });
  }

  return slots;
}

export const serviceTypes = [
  { value: "individual", label: "Individual Therapy (50 min) - $150" },
  { value: "couples", label: "Couples Counseling (75 min) - $200" },
  { value: "family", label: "Family Therapy (90 min) - $250" },
  { value: "group", label: "Group Therapy (60 min) - $75" },
  { value: "consultation", label: "Initial Consultation (30 min) - Free" },
];

// LocalStorage helpers
export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem("therapyBookings");
  return stored ? JSON.parse(stored) : [];
};

export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem("therapyBookings", JSON.stringify(bookings));
};

export const updateBooking = (
  bookingId: string,
  updates: Partial<Booking>
): void => {
  const bookings = getBookings();
  const updated = bookings.map((b) =>
    b.id === bookingId ? { ...b, ...updates } : b
  );
  localStorage.setItem("therapyBookings", JSON.stringify(updated));
};

export const deleteBooking = (bookingId: string): void => {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== bookingId);
  localStorage.setItem("therapyBookings", JSON.stringify(filtered));
};

export const cancelBooking = (bookingId: string): void => {
  updateBooking(bookingId, { status: "cancelled" });
};

export const restoreBooking = (bookingId: string): void => {
  updateBooking(bookingId, { status: "confirmed" });
};

export const rescheduleBooking = (
  bookingId: string,
  newDate: string,
  newTime: string
): void => {
  updateBooking(bookingId, { date: newDate, time: newTime });
};

export const getUserBookings = (email: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(
    (b) => b.clientEmail === email && b.status !== "cancelled"
  );
};

export const getAllUserBookings = (): Booking[] => {
  return getBookings().filter((b) => b.status !== "cancelled");
};

// Generate recurring booking dates based on recurrence rule
export const generateRecurringDates = (
  startDate: string,
  startTime: string,
  rule: RecurrenceRule,
  practitioner: Practitioner
): { date: string; time: string; available: boolean }[] => {
  const dates: { date: string; time: string; available: boolean }[] = [];
  const start = new Date(startDate);
  const currentDate = new Date(start);

  const maxOccurrences =
    rule.endType === "occurrences" ? rule.occurrences! : 100;
  const endDate = rule.endType === "date" ? new Date(rule.endDate!) : null;

  for (let i = 0; i < maxOccurrences; i++) {
    const dateStr = currentDate.toISOString().split("T")[0];

    // Check if we've passed the end date
    if (endDate && currentDate > endDate) {
      break;
    }

    // Skip weekends for professional services
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Check if this date/time is available in practitioner's schedule
      const slot = practitioner.availability.find(
        (s) => s.date === dateStr && s.time === startTime
      );

      dates.push({
        date: dateStr,
        time: startTime,
        available: slot?.available || false,
      });
    }

    // Calculate next occurrence date based on recurrence type
    switch (rule.type) {
      case "daily":
        currentDate.setDate(currentDate.getDate() + rule.interval);
        break;
      case "weekly":
        currentDate.setDate(currentDate.getDate() + 7 * rule.interval);
        break;
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() + rule.interval);
        break;
    }
  }

  return dates;
};

// Save multiple recurring bookings
export const saveRecurringBookings = (
  baseBooking: Omit<Booking, "id" | "date" | "createdAt">,
  occurrences: { date: string; time: string }[],
  recurrenceRule: RecurrenceRule
): string => {
  const groupId = `recurring-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const bookings = getBookings();

  occurrences.forEach((occurrence, index) => {
    const booking: Booking = {
      ...baseBooking,
      id: `${groupId}-${index}`,
      date: occurrence.date,
      time: occurrence.time,
      createdAt: new Date().toISOString(),
      recurrenceGroupId: groupId,
      isRecurring: true,
      recurrenceRule: index === 0 ? recurrenceRule : undefined, // Only store rule on first booking
    };
    bookings.push(booking);
  });

  localStorage.setItem("therapyBookings", JSON.stringify(bookings));
  return groupId;
};
