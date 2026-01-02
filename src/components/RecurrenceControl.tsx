import React from "react";
import { Repeat, Calendar } from "lucide-react";
import { type RecurrenceRule } from "../data/booking";

interface RecurrenceControlsProps {
  recurrenceRule: RecurrenceRule;
  onRecurrenceChange: (rule: RecurrenceRule) => void;
}

export const RecurrenceControls: React.FC<RecurrenceControlsProps> = ({
  recurrenceRule,
  onRecurrenceChange,
}) => {
  const handleTypeChange = (type: RecurrenceRule["type"]) => {
    onRecurrenceChange({
      ...recurrenceRule,
      type,
      interval: type === "none" ? 1 : recurrenceRule.interval,
    });
  };

  const handleIntervalChange = (interval: number) => {
    onRecurrenceChange({
      ...recurrenceRule,
      interval: Math.max(1, interval),
    });
  };

  const handleEndTypeChange = (endType: RecurrenceRule["endType"]) => {
    onRecurrenceChange({
      ...recurrenceRule,
      endType,
    });
  };

  const handleOccurrencesChange = (occurrences: number) => {
    onRecurrenceChange({
      ...recurrenceRule,
      occurrences: Math.max(1, Math.min(52, occurrences)), // Max 52 occurrences
    });
  };

  const handleEndDateChange = (endDate: string) => {
    onRecurrenceChange({
      ...recurrenceRule,
      endDate,
    });
  };

  if (recurrenceRule.type === "none") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Repeat className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Recurring Appointment
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repeat Frequency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-medium">
              <button
                onClick={() => handleTypeChange("none")}
                className="py-3 px-4 rounded-lg border-2 border-green-600 bg-green-50 text-green-700  transition-all min-h-[44px]"
              >
                No Repeat
              </button>
              <button
                onClick={() => handleTypeChange("daily")}
                className="py-3 px-4 rounded-lg border-2 border-gray-200 hover:border-green-300 active:border-green-400  transition-all min-h-[44px]"
              >
                Daily
              </button>
              <button
                onClick={() => handleTypeChange("weekly")}
                className="py-3 px-4 rounded-lg border-2 border-gray-200 hover:border-green-300 active:border-green-400  transition-all min-h-[44px]"
              >
                Weekly
              </button>
              <button
                onClick={() => handleTypeChange("monthly")}
                className="py-3 px-4 rounded-lg border-2 border-gray-200 hover:border-green-300 active:border-green-400  transition-all min-h-[44px]"
              >
                Monthly
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            This appointment will not repeat. Select a frequency above to create
            recurring appointments.
          </p>
        </div>
      </div>
    );
  }

  const getIntervalLabel = () => {
    switch (recurrenceRule.type) {
      case "daily":
        return "day(s)";
      case "weekly":
        return "week(s)";
      case "monthly":
        return "month(s)";
      default:
        return "";
    }
  };

  const getMinEndDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Repeat className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Recurring Appointment
        </h3>
      </div>

      <div className="space-y-6">
        {/* Recurrence Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat Frequency
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm font-medium gap-3">
            <button
              onClick={() => handleTypeChange("none")}
              className="py-3 px-4 rounded-lg border-2 border-gray-200 hover:border-green-300 active:border-green-400 font-semibold transition-all min-h-[44px]"
            >
              No Repeat
            </button>
            <button
              onClick={() => handleTypeChange("daily")}
              className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all min-h-[44px] ${
                recurrenceRule.type === "daily"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-green-300 active:border-green-400"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => handleTypeChange("weekly")}
              className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all min-h-[44px] ${
                recurrenceRule.type === "weekly"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-green-300 active:border-green-400"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => handleTypeChange("monthly")}
              className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all min-h-[44px] ${
                recurrenceRule.type === "monthly"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-green-300 active:border-green-400"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="flex gap-5 items-center flex-wrap">
          {/* Interval Selection */}
          <div>
            <label
              htmlFor="interval"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Repeat Every
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                id="interval"
                min="1"
                max="12"
                value={recurrenceRule.interval}
                onChange={(e) =>
                  handleIntervalChange(parseInt(e.target.value) || 1)
                }
                className="pl-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none min-h-[44px]"
              />
              <span className="text-gray-700 font-medium">
                {getIntervalLabel()}
              </span>
            </div>
          </div>

          {/* End Condition Selection */}
          <div className="sm:ml-10 sm:border-l-3 border-green-300 sm:pl-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sessions
            </label>
            <div className="flex gap-x-5 gap-y-3 items-center flex-wrap">
              {/* After N Occurrences */}
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="end-occurrences"
                  name="endType"
                  checked={recurrenceRule.endType === "occurrences"}
                  onChange={() => handleEndTypeChange("occurrences")}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <label
                  htmlFor="end-occurrences"
                  className="flex items-center gap-3 flex-1"
                >
                  <span className="text-gray-700">After</span>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={recurrenceRule.occurrences || 4}
                    onChange={(e) =>
                      handleOccurrencesChange(parseInt(e.target.value) || 1)
                    }
                    disabled={recurrenceRule.endType !== "occurrences"}
                    className="pl-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none min-h-[44px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <span className="text-gray-700">sessions</span>
                </label>
              </div>

              {/* On Specific Date */}
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="end-date"
                  name="endType"
                  checked={recurrenceRule.endType === "date"}
                  onChange={() => handleEndTypeChange("date")}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <label
                  htmlFor="end-date"
                  className="flex items-center gap-3 flex-1"
                >
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">End by</span>
                  <input
                    type="date"
                    min={getMinEndDate()}
                    value={recurrenceRule.endDate || ""}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    disabled={recurrenceRule.endType !== "date"}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none min-h-[44px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm font-medium text-green-900">
            {recurrenceRule.type === "daily" &&
              `Repeats every ${recurrenceRule.interval} day(s)`}
            {recurrenceRule.type === "weekly" &&
              `Repeats every ${recurrenceRule.interval} week(s)`}
            {recurrenceRule.type === "monthly" &&
              `Repeats every ${recurrenceRule.interval} month(s)`}
            {recurrenceRule.endType === "occurrences" &&
              ` for ${recurrenceRule.occurrences} sessions`}
            {recurrenceRule.endType === "date" &&
              recurrenceRule.endDate &&
              ` until ${new Date(recurrenceRule.endDate).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" }
              )}`}
          </p>
        </div>
      </div>
    </div>
  );
};
