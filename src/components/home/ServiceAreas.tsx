import React from "react";
import { siteConfig } from "@/data/config";
import { Icons } from "@/components/ui/Icons";

export const ServiceAreas: React.FC = () => {
  const sectors = [
    { zone: "Central and Northern Sectors", list: "Sectors 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20" },
    { zone: "Southern and Eastern Sectors", list: "Sectors 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40" },
    { zone: "Extended Sectors and Suburbs", list: "Sectors 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 60, Dhanas, Maloya" },
    { zone: "Panchkula and Surrounding Areas", list: "Panchkula Sectors 1-25, MDC, Mansa Devi, Pinjore, Kalka Road" },
    { zone: "Mohali and Greater Tricity", list: "Mohali Phases 1-11, Sectors 67-82, Airport Road, Kharar, Zirakpur, VIP Road, New Chandigarh" },
    { zone: "Industrial and Commercial Belts", list: "Industrial Area Phase 1 and 2, Manimajra, IT Park, Housing Board" },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Icons.MapPin size={14} className="text-blue-600" />
            Hyper-Local Doorstep Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Local Service Areas and Sectors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Our mobile service vans and certified technicians are stationed strategically
            across major zones to guarantee 60-90 minutes arrival at your residence.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((zoneItem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icons.MapPin size={16} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {zoneItem.zone}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {zoneItem.list}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <Icons.Clock size={12} />
                <span>Typical Doorstep ETA: 60-90 Mins</span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Call Box */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-slate-900">
              Not sure if your specific sector or colony is covered?
            </div>
            <div className="text-xs text-slate-500">
              Give our support desk a quick call. We cover 98% of all residential societies.
            </div>
          </div>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs shrink-0 transition-colors inline-flex items-center gap-2"
          >
            <Icons.Phone size={14} className="text-amber-400" />
            <span>{`Check Coverage: ${siteConfig.phone}`}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
