import { useState } from "react";
import {
  type Booking,
  type TimeSlot,
  type Practitioner,
  saveBooking,
  saveRecurringBookings,
  type RecurrenceRule,
  serviceTypes,
} from "../data/booking";
import { User, Mail, Phone, FileText, CheckCircle } from "lucide-react";

interface BookingFormProps {
  practitioner: Practitioner;
  selectedSlot: TimeSlot;
  onSuccess: (booking: Booking) => void;
  onCancel: () => void;
  recurrenceRule?: RecurrenceRule;
  recurringOccurrences?: { date: string; time: string }[];
}

export const BookingForm = ({
  practitioner,
  selectedSlot,
  onSuccess,
  onCancel,
  recurrenceRule,
  recurringOccurrences,
}: BookingFormProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "individual",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Name is required";
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Email is invalid";
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const isRecurring =
        recurrenceRule &&
        recurrenceRule.type !== "none" &&
        recurringOccurrences &&
        recurringOccurrences.length > 0;

      if (isRecurring) {
        // Save recurring bookings
        const baseBooking = {
          practitionerId: practitioner.id,
          practitionerName: practitioner.name,
          time: selectedSlot.time,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          serviceType: formData.serviceType,
          notes: formData.notes,
          status: "confirmed" as const,
        };

        saveRecurringBookings(
          baseBooking,
          recurringOccurrences,
          recurrenceRule
        );

        // Return first booking for success message
        const firstBooking: Booking = {
          id: `recurring-${Date.now()}`,
          ...baseBooking,
          date: recurringOccurrences[0].date,
          createdAt: new Date().toISOString(),
          recurrenceRule,
          isRecurring: true,
        };

        setIsSubmitting(false);
        onSuccess(firstBooking);
      } else {
        // Save single booking
        const booking: Booking = {
          id: `booking-${Date.now()}`,
          practitionerId: practitioner.id,
          practitionerName: practitioner.name,
          date: selectedSlot.date,
          time: selectedSlot.time,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          serviceType: formData.serviceType,
          notes: formData.notes,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        saveBooking(booking);
        setIsSubmitting(false);
        onSuccess(booking);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Practitioner:</strong> {practitioner.name}
          </p>
          {recurrenceRule &&
          recurrenceRule.type !== "none" &&
          recurringOccurrences &&
          recurringOccurrences.length > 0 ? (
            <>
              <p>
                <strong>First Session:</strong>{" "}
                {new Date(recurringOccurrences[0].date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p>
                <strong>Time:</strong> {recurringOccurrences[0].time}
              </p>
              <p>
                <strong>Total Sessions:</strong> {recurringOccurrences.length}
              </p>
              <p className="text-purple-700 font-semibold">
                {recurrenceRule.type === "daily" &&
                  `Repeats every ${recurrenceRule.interval} day(s)`}
                {recurrenceRule.type === "weekly" &&
                  `Repeats every ${recurrenceRule.interval} week(s)`}
                {recurrenceRule.type === "monthly" &&
                  `Repeats every ${recurrenceRule.interval} month(s)`}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedSlot.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot.time}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="inline mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
            }
            className={`w-full px-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[44px] ${
              errors.clientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Please enter your fullname"
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            value={formData.clientEmail}
            onChange={(e) =>
              setFormData({ ...formData, clientEmail: e.target.value })
            }
            className={`w-full px-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[44px] ${
              errors.clientEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Please enter your email address"
          />
          {errors.clientEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="inline mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.clientPhone}
            onChange={(e) =>
              setFormData({ ...formData, clientPhone: e.target.value })
            }
            className={`w-full px-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[44px] ${
              errors.clientPhone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+234 800 000 0000"
          />
          {errors.clientPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            value={formData.serviceType}
            onChange={(e) =>
              setFormData({ ...formData, serviceType: e.target.value })
            }
            className="w-full px-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[44px]"
          >
            {serviceTypes.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText size={16} className="inline mr-1" />
          Additional Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full px-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
          placeholder="Any specific concerns or preferences..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-full active:bg-purple-800 active:scale-95 transition-all font-semibold shadow-md hover:shadow-lg min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Booking...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Confirm Booking
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none bg-white text-purple-700 py-3 px-6 rounded-full active:bg-purple-50 active:scale-95 transition-all font-semibold border-2 border-purple-600 min-h-[44px] disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
