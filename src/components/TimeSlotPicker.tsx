import { useState, useMemo } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { TimeSlot } from "@/data/booking";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const TimeSlotPicker = ({
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotPickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Group slots by date
  const slotsByDate = useMemo(() => {
    return slots.reduce((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    }, {} as Record<string, TimeSlot[]>);
  }, [slots]);

  const dates = useMemo(() => Object.keys(slotsByDate).sort(), [slotsByDate]);
  const currentDateSlots = selectedDate ? slotsByDate[selectedDate] || [] : [];

  // Get dates for current month view
  const currentMonthDates = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return dates.filter((dateStr) => {
      const date = new Date(dateStr);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }, [dates, currentMonth]);

  // Check if a date has available slots
  const hasAvailableSlots = (dateStr: string) => {
    return slotsByDate[dateStr]?.some((slot) => slot.available) || false;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // Check if we can go to previous/next month
  const canGoPrevious = useMemo(() => {
    const firstAvailableDate = dates[0];
    if (!firstAvailableDate) return false;
    const firstDate = new Date(firstAvailableDate);
    return (
      currentMonth.getMonth() > firstDate.getMonth() ||
      currentMonth.getFullYear() > firstDate.getFullYear()
    );
  }, [dates, currentMonth]);

  const canGoNext = useMemo(() => {
    const lastAvailableDate = dates[dates.length - 1];
    if (!lastAvailableDate) return false;
    const lastDate = new Date(lastAvailableDate);
    return (
      currentMonth.getMonth() < lastDate.getMonth() ||
      currentMonth.getFullYear() < lastDate.getFullYear()
    );
  }, [dates, currentMonth]);

  // HTML5 date input for quick navigation
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    if (inputDate && dates.includes(inputDate)) {
      setSelectedDate(inputDate);
      const date = new Date(inputDate);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const minDate = dates[0] || "";
  const maxDate = dates[dates.length - 1] || "";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar size={20} className="text-purple-600" />
            Select Date
          </h3>

          {/* HTML5 Date Picker */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={selectedDate}
              onChange={handleDateInputChange}
              className="px-3 py-2 border-2 border-purple-300 rounded-lg text-sm font-medium text-gray-700 focus:border-purple-600 focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4 bg-purple-50 rounded-lg p-3">
          <button
            onClick={goToPreviousMonth}
            disabled={!canGoPrevious}
            className="p-2 rounded-lg hover:bg-purple-100 active:bg-purple-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} className="text-purple-700" />
          </button>
          <span className="font-semibold text-gray-900">
            {formatMonthYear(currentMonth)}
          </span>
          <button
            onClick={goToNextMonth}
            disabled={!canGoNext}
            className="p-2 rounded-lg hover:bg-purple-100 active:bg-purple-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next month"
          >
            <ChevronRight size={20} className="text-purple-700" />
          </button>
        </div>

        {/* Date Grid */}
        {currentMonthDates.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentMonthDates.map((date) => {
              const hasSlots = hasAvailableSlots(date);
              return (
                <button
                  key={date}
                  onClick={() => hasSlots && setSelectedDate(date)}
                  disabled={!hasSlots}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-medium min-h-[44px] relative ${
                    selectedDate === date
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : hasSlots
                      ? "border-gray-200 hover:border-purple-300 active:border-purple-400"
                      : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {formatDate(date)}
                  {hasSlots && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No available dates in {formatMonthYear(currentMonth)}
          </div>
        )}
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-purple-600" />
            Select Time for {formatDate(selectedDate)}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentDateSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelectSlot(slot)}
                disabled={!slot.available}
                className={`py-3 px-4 rounded-lg border-2 transition-all font-medium min-h-[44px] ${
                  selectedSlot?.id === slot.id
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : slot.available
                    ? "border-gray-200 hover:border-purple-300 active:border-purple-400"
                    : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {currentDateSlots.every((s) => !s.available) && (
            <p className="text-center text-gray-500 mt-4">
              No available time slots for this date
            </p>
          )}
        </div>
      )}
    </div>
  );
};
