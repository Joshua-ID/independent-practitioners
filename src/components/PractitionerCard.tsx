import { type Practitioner } from "../data/booking";
import { Award } from "lucide-react";

interface PractitionerCardProps {
  practitioner: Practitioner;
  onSelect: () => void;
}

export const PractitionerCard = ({
  practitioner,
  onSelect,
}: PractitionerCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-transparent hover:border-purple-600 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={practitioner.image}
          alt={practitioner.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {practitioner.name}
          </h3>
          <p className="text-purple-600 font-medium">{practitioner.title}</p>
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {practitioner.bio}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Award size={16} className="text-purple-600" />
          <span>{practitioner.experience} experience</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {practitioner.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        <button
          onClick={onSelect}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-full active:bg-purple-800 active:scale-95 transition-all font-semibold shadow-md hover:shadow-lg min-h-[44px]"
        >
          View Available Times
        </button>
      </div>
    </div>
  );
};
