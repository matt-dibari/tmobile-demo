import React, { useState } from 'react';
import { Laptop, Calendar, Clock, CheckCircle2, AlertTriangle, Battery, HardDrive, Cpu, ArrowRight } from 'lucide-react';
import { sound } from '../../../utils/sound';

interface Props {
  onComplete?: () => void;
}

export const TechExpressWidget: React.FC<Props> = ({ onComplete }) => {
  const [selectedSlot, setSelectedSlot] = useState('2:30 PM (Today)');
  const [issueType, setIssueType] = useState('Battery & Thermal Throttling');
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const availableSlots = [
    { time: '2:30 PM (Today)', tech: 'Sarah K. (Bellevue Tech Bar)' },
    { time: '3:15 PM (Today)', tech: 'Marcus V. (Bellevue Tech Bar)' },
    { time: '4:00 PM (Today)', tech: 'David L. (Bellevue Tech Bar)' },
    { time: 'Tomorrow 9:30 AM', tech: 'Next Available Specialist' },
  ];

  const handleBook = () => {
    sound.playClick();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
      sound.playSuccess();
      if (onComplete) onComplete();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden font-sans text-gray-900 my-2">
      {/* Header */}
      <div className="bg-[#18181B] px-4 py-3 text-white flex items-center justify-between border-b-2 border-[#E20074]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#E20074] flex items-center justify-center">
            <Laptop className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              TechExpress Walk-In & Diagnostic
            </h4>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#E20074] font-bold bg-[#E20074]/15 px-2 py-0.5 rounded">
          HQ Tech Bar
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Device Telemetry Card */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-800">Apple MacBook Pro 16" (M3 Max)</span>
            <span className="text-[10px] font-mono text-gray-500">Asset: TM-MBP-90812</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-gray-200">
            <div className="space-y-0.5">
              <span className="text-gray-500 flex items-center gap-1 text-[10px]">
                <Battery className="w-3 h-3 text-rose-500" /> Battery
              </span>
              <span className="font-mono font-bold text-rose-600">68% Health</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-gray-500 flex items-center gap-1 text-[10px]">
                <Cpu className="w-3 h-3 text-amber-500" /> CPU Thermal
              </span>
              <span className="font-mono font-bold text-amber-600">Throttling</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-gray-500 flex items-center gap-1 text-[10px]">
                <HardDrive className="w-3 h-3 text-emerald-500" /> Storage
              </span>
              <span className="font-mono font-bold text-gray-800">412 GB / 1TB</span>
            </div>
          </div>
        </div>

        {!isBooked ? (
          <>
            {/* Slot Picker */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Choose Express Bar Appointment
              </label>
              <div className="space-y-1.5">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedSlot(slot.time);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                      selectedSlot === slot.time
                        ? 'border-[#E20074] bg-[#E20074]/5 ring-1 ring-[#E20074]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#E20074]" />
                      <span className="text-xs font-bold text-gray-900">{slot.time}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">{slot.tech}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBook}
              disabled={isBooking}
              className="w-full py-2.5 rounded-lg bg-[#E20074] hover:bg-[#c40064] text-white text-xs font-bold shadow-md shadow-[#E20074]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isBooking ? (
                <>
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Reserving Tech Bar Slot...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm TechExpress Reservation</span>
                </>
              )}
            </button>
          </>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-emerald-900">Appointment Confirmed!</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Your appointment is set for <strong>{selectedSlot}</strong> at the <strong>Bellevue HQ Building 2 Tech Bar</strong>. A loaner device has been pre-staged in your name.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-500">
              Calendar invite sent to: <span className="font-semibold text-gray-800">matt.dibari@t-mobile.com</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
