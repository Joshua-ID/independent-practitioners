import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getAllUserBookings,
  cancelBooking,
  restoreBooking,
  rescheduleBooking,
  type Booking,
  practitioners,
  type TimeSlot,
} from "../data/booking";
import { TimeSlotPicker } from "../components/TimeSlotPicker";
import { Link } from "react-router-dom";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "undo";
    message: string;
  } | null>(null);
  const [cancelledBooking, setCancelledBooking] = useState<Booking | null>(
    null
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getAllUserBookings();
    // Sort by date and time (newest first)
    const sorted = allBookings.sort((a, b) => {
      const dateCompare =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return b.time.localeCompare(a.time);
    });
    setBookings(sorted);
  };

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    if (!selectedBooking) return;

    cancelBooking(selectedBooking.id);
    setCancelledBooking(selectedBooking);
    setShowCancelDialog(false);
    setSelectedBooking(null);
    loadBookings();

    setToast({ type: "undo", message: "Booking cancelled successfully" });

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setToast(null);
      setCancelledBooking(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!cancelledBooking) return;

    restoreBooking(cancelledBooking.id);
    loadBookings();
    setCancelledBooking(null);
    setToast({ type: "success", message: "Booking restored" });

    setTimeout(() => setToast(null), 3000);
  };

  const handleRescheduleClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (date: string, time: string) => {
    if (!selectedBooking) return;

    rescheduleBooking(selectedBooking.id, date, time);
    setShowRescheduleModal(false);
    setSelectedBooking(null);
    loadBookings();

    setToast({ type: "success", message: "Booking rescheduled successfully" });
    setTimeout(() => setToast(null), 3000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
            >
              TherapySpace
            </a>
            <a
              href="/"
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage your upcoming and past appointments
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your wellness journey by booking your first session
            </p>
            <Link
              to="/book"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Book a Session
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelClick}
                onReschedule={handleRescheduleClick}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cancel Dialog */}
      {showCancelDialog && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Cancel Booking
              </h3>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your appointment with{" "}
                <span className="font-semibold">
                  {selectedBooking.practitionerName}
                </span>
                ?
              </p>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  {formatDate(selectedBooking.date)}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  {selectedBooking.time}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedBooking(null);
          }}
          onSubmit={handleRescheduleSubmit}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div
            className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-emerald-600"
                : toast.type === "error"
                ? "bg-red-600"
                : "bg-gray-800"
            } text-white`}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
            {toast.type === "undo" && cancelledBooking && (
              <button
                onClick={handleUndo}
                className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-colors"
              >
                Undo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
  onCancel: (booking: Booking) => void;
  onReschedule: (booking: Booking) => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
}

function BookingCard({
  booking,
  onCancel,
  onReschedule,
  formatDate,
  getStatusColor,
}: BookingCardProps) {
  const practitioner = practitioners.find(
    (p) => p.id === booking.practitionerId
  );
  const isPast = new Date(booking.date) < new Date();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            {practitioner && (
              <img
                src={practitioner.image}
                alt={practitioner.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {booking.practitionerName}
              </h3>
              {practitioner && (
                <p className="text-sm text-gray-600">{practitioner.title}</p>
              )}
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              booking.status
            )}`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm">{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm">{booking.time}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <User className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm">{booking.clientName}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm">{booking.clientPhone}</span>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-start text-gray-700">
              <MessageSquare className="w-4 h-4 mr-2 text-purple-600 mt-0.5" />
              <p className="text-sm">{booking.notes}</p>
            </div>
          </div>
        )}

        {!isPast && booking.status === "confirmed" && (
          <div className="flex gap-3">
            <button
              onClick={() => onReschedule(booking)}
              className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-full font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Reschedule
            </button>
            <button
              onClick={() => onCancel(booking)}
              className="flex-1 px-4 py-2 border-2 border-red-300 rounded-full font-semibold text-red-700 hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface RescheduleModalProps {
  booking: Booking;
  onClose: () => void;
  onSubmit: (date: string, time: string) => void;
}

function RescheduleModal({ booking, onClose, onSubmit }: RescheduleModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const practitioner = practitioners.find(
    (p) => p.id === booking.practitionerId
  );
  const availableSlots = practitioner?.availability || [];

  const handleSubmit = () => {
    if (!selectedSlot) {
      return;
    }
    onSubmit(selectedSlot.date, selectedSlot.time);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Reschedule Appointment
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              Current Appointment
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <strong>Practitioner:</strong> {booking.practitionerName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">
            Select New Date & Time
          </h4>
          <TimeSlotPicker
            slots={availableSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
          />
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedSlot}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}
