import { useState } from "react";
import {
  practitioners,
  type Practitioner,
  type Booking,
  type RecurrenceRule,
  generateRecurringDates,
  //   saveRecurringBookings,
  type TimeSlot,
} from "../data/booking";
import { PractitionerCard } from "../components/PractitionerCard";
import { TimeSlotPicker } from "../components/TimeSlotPicker";
import { BookingForm } from "../components/BookingForm";
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  AlertCircle,
  HomeIcon,
} from "lucide-react";
import { RecurrenceControls } from "@/components/RecurrenceControl";
import { Link } from "react-router-dom";

type BookingStep = "practitioners" | "timeslot" | "form" | "success";

export const BookingPage = () => {
  const [step, setStep] = useState<BookingStep>("practitioners");
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(
    null
  );
  const [recurrenceRule, setRecurrenceRule] = useState<RecurrenceRule>({
    type: "none",
    interval: 1,
    endType: "occurrences",
    occurrences: 4,
  });
  const [recurringOccurrences, setRecurringOccurrences] = useState<
    { date: string; time: string; available: boolean }[]
  >([]);

  const handleSelectPractitioner = (practitioner: Practitioner) => {
    setSelectedPractitioner(practitioner);
    setStep("timeslot");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);

    // Generate recurring occurrences if recurrence is enabled
    if (recurrenceRule.type !== "none" && selectedPractitioner) {
      const occurrences = generateRecurringDates(
        slot.date,
        slot.time,
        recurrenceRule,
        selectedPractitioner
      );
      setRecurringOccurrences(occurrences);
    } else {
      setRecurringOccurrences([]);
    }
  };

  const handleRecurrenceChange = (rule: RecurrenceRule) => {
    setRecurrenceRule(rule);

    // Regenerate occurrences if slot is already selected
    if (selectedSlot && selectedPractitioner && rule.type !== "none") {
      const occurrences = generateRecurringDates(
        selectedSlot.date,
        selectedSlot.time,
        rule,
        selectedPractitioner
      );
      setRecurringOccurrences(occurrences);
    } else {
      setRecurringOccurrences([]);
    }
  };

  const handleContinueToForm = () => {
    if (selectedSlot) {
      setStep("form");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBookingSuccess = (booking: Booking) => {
    setConfirmedBooking(booking);
    setStep("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === "timeslot") {
      setStep("practitioners");
      setSelectedPractitioner(null);
      setSelectedSlot(null);
    } else if (step === "form") {
      setStep("timeslot");
      setSelectedSlot(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewBooking = () => {
    setStep("practitioners");
    setSelectedPractitioner(null);
    setSelectedSlot(null);
    setConfirmedBooking(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {(step === "timeslot" || step === "form") && (
                <button
                  onClick={handleBack}
                  className="p-2 rounded-lg active:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <h1 className="md:text-2xl text-lg font-bold text-purple-700 flex items-center gap-2">
                <Calendar className="text-purple-600" size={22} />
                Book a Session
              </h1>
            </div>
            <Link
              to="/"
              className="text-purple-600 flex items-center gap-2 hover:text-purple-700 font-medium"
            >
              <HomeIcon size={18} />
              <span className="hidden sm:flex">Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {step !== "success" && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div
                className={`flex items-center gap-2 ${
                  step === "practitioners" ? "text-purple-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step === "practitioners"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  Choose Practitioner
                </span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-gray-200"></div>
              <div
                className={`flex items-center gap-2 ${
                  step === "timeslot" || step === "form"
                    ? "text-purple-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step === "timeslot" || step === "form"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  Select Time
                </span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-gray-200"></div>
              <div
                className={`flex items-center gap-2 ${
                  step === "form" ? "text-purple-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step === "form" ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  Confirm Details
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Step 1: Select Practitioner */}
        {step === "practitioners" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Practitioner
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select from our experienced team of licensed therapists and
                counselors
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
              {practitioners.map((practitioner) => (
                <PractitionerCard
                  key={practitioner.id}
                  practitioner={practitioner}
                  onSelect={() => handleSelectPractitioner(practitioner)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Time Slot */}
        {step === "timeslot" && selectedPractitioner && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={selectedPractitioner.image}
                  alt={selectedPractitioner.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedPractitioner.name}
                  </h2>
                  <p className="text-purple-600 font-medium">
                    {selectedPractitioner.title}
                  </p>
                </div>
              </div>

              <TimeSlotPicker
                slots={selectedPractitioner.availability}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSelectSlot}
              />
            </div>

            {/* Recurrence Controls */}
            <div className="mb-8">
              <RecurrenceControls
                recurrenceRule={recurrenceRule}
                onRecurrenceChange={handleRecurrenceChange}
              />
            </div>

            {/* Recurring Occurrences Preview */}
            {recurrenceRule.type !== "none" &&
              recurringOccurrences.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Scheduled Appointments ({recurringOccurrences.length}{" "}
                    sessions)
                  </h3>

                  {recurringOccurrences.filter((o) => !o.available).length >
                    0 && (
                    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">
                          Some dates unavailable
                        </p>
                        <p className="text-sm text-amber-800">
                          {
                            recurringOccurrences.filter((o) => !o.available)
                              .length
                          }{" "}
                          appointment(s) fall on dates when the practitioner is
                          not available. These will be skipped.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {recurringOccurrences.map((occurrence, index) => (
                      <div
                        key={`${occurrence.date}-${index}`}
                        className={`p-3 rounded-lg border-2 flex items-center justify-between ${
                          occurrence.available
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                              occurrence.available
                                ? "bg-green-600 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {new Date(occurrence.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-sm text-gray-600">
                              {occurrence.time}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            occurrence.available
                              ? "bg-green-600 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {occurrence.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-900">
                      {recurringOccurrences.filter((o) => o.available).length}{" "}
                      of {recurringOccurrences.length} appointments will be
                      scheduled
                    </p>
                  </div>
                </div>
              )}

            <div className="mt-8 w-full flex justify-center items-center">
              <button
                onClick={handleContinueToForm}
                className={`w-full bg-purple-600 text-white py-3 px-6 rounded-full ${
                  selectedSlot
                    ? "active:bg-purple-800 active:scale-95 transition-all shadow-md hover:shadow-lg min-h-[44px]"
                    : "cursor-not-allowed bg-purple-300!  font-semibold"
                }`}
              >
                {" "}
                {selectedSlot
                  ? "Continue to Booking Form"
                  : "Select a slot to complete booking"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Booking Form */}
        {step === "form" && selectedPractitioner && selectedSlot && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Complete Your Booking
              </h2>
              <BookingForm
                practitioner={selectedPractitioner}
                selectedSlot={selectedSlot}
                onSuccess={handleBookingSuccess}
                onCancel={handleBack}
                recurrenceRule={recurrenceRule}
                recurringOccurrences={recurringOccurrences.filter(
                  (o) => o.available
                )}
              />
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && confirmedBooking && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h2>

              <p className="text-lg text-gray-600 mb-8">
                Your therapy session has been successfully scheduled. A
                confirmation email has been sent to{" "}
                <strong>{confirmedBooking.clientEmail}</strong>
              </p>

              <div className="bg-purple-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">
                  Appointment Details
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Practitioner:</span>
                    <span className="font-medium">
                      {confirmedBooking.practitionerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(confirmedBooking.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium capitalize">
                      {confirmedBooking.serviceType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium font-mono text-sm">
                      {confirmedBooking.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleNewBooking}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-full active:bg-purple-800 active:scale-95 transition-all font-semibold shadow-md hover:shadow-lg min-h-[44px]"
                >
                  Book Another Session
                </button>
                <Link
                  to="/"
                  className="block w-full bg-white text-purple-700 py-3 px-6 rounded-full active:bg-purple-50 active:scale-95 transition-all font-semibold border-2 border-purple-600 min-h-[44px]"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
