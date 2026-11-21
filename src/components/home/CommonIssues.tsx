import React from "react";
import Link from "next/link";

export const CommonIssues: React.FC<{ cityName?: string; stateName?: string; productName?: string; brandName?: string }> = ({ cityName, stateName, productName, brandName }) => {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-none px-[1%]">
        <div className="space-y-3 text-[11px] leading-[1.75] text-slate-600 sm:space-y-3.5 sm:text-xs sm:leading-[1.8] lg:text-[13px]">
          {cityName && productName && (
            <p>
              <strong className="font-semibold text-slate-900">
                {`${brandName ? `${brandName} ${productName}` : productName} Repair and Service Support in ${cityName}, ${stateName || "India"}:`}</strong>{` Find information about ${brandName ? `${brandName} ` : ""}${productName.toLowerCase()} repair in ${cityName}, including common faults, inspection, maintenance, cleaning and relevant installation support where applicable. This page is focused on ${brandName ? `${brandName} ` : ""}${productName.toLowerCase()} service assistance in ${cityName}; service availability, appliance compatibility and the estimate are confirmed after reviewing the model and reported issue.`}</p>
          )}
          {cityName && (
            <p>
              <strong className="font-semibold text-slate-900">{`Home Appliance Repair and Service Support in ${cityName}, ${stateName || "India"}:`}</strong>{` Service Support Hub helps residents explore multi-brand appliance repair, maintenance, installation and doorstep diagnosis options in ${cityName}. Customers can review support for air conditioners, refrigerators, washing machines, televisions, microwaves, kitchen chimneys, gas hobs, geysers and other household appliances. Local availability, travel coverage, appointment timing and service estimates are confirmed for the customer’s specific locality and appliance before a visit is finalized.`}</p>
          )}
          <p>
            Welcome to <strong className="font-semibold text-slate-900">Service Support Hub</strong>,
            your convenient destination for exploring multi-brand home appliance repair, maintenance,
            installation, and technical support services. We help customers find service assistance
            for a wide range of household products, whether they need an AC service center, refrigerator
            repair center, washing machine service, LED or Smart TV repair, or support for another
            essential appliance. Our aim is to make it easier to understand available service options,
            share an appliance concern, and request a suitable doorstep visit.
          </p>

          <p>
            Our home appliance service categories include air conditioners, refrigerators, deep
            freezers, washing machines, televisions, microwave ovens, kitchen chimneys, built-in gas
            hobs, cooking stoves, geysers, water purifiers, RO systems, and dishwashers. Service
            assistance may cover inspection, fault diagnosis, cleaning, maintenance, installation,
            component replacement, and repair, depending on the product and location. We also help
            customers explore technical support for IT and electronic equipment, including laptops,
            desktop computers, computer peripherals, printers, CCTV cameras, and related networking
            devices. Availability is confirmed according to the service type and local coverage.
          </p>

          <p>
            Service Support Hub is designed for customers searching for brand-related service and
            repair assistance in one place. You can explore options for popular appliance brands such
            as LG, Samsung, Whirlpool, IFB, Bosch, Haier, Godrej, Daikin, Voltas, Sony, Panasonic,
            Faber, Elica, Kaff, Glen, Kent, and Aquaguard, along with other supported brands. We are
            an independent multi-brand service platform and are not claiming to be the official
            service center of every brand. Brand names are used only to help identify the products
            customers may need assistance with.
          </p>

          <p>
            Clear communication is an important part of our service approach. The technician can
            inspect the reported issue, explain the diagnosis, and share an estimate for approval
            before repair work begins. Service charges, spare-part requirements, appointment
            availability, and any applicable workmanship or parts warranty are confirmed for the
            specific job. Warranty coverage, exclusions, and claim conditions are subject to the
            written terms shared at the time of service.
          </p>

          <p>
            We aim to make local service discovery easier across locations. Explore appliance
            service information for <Link href="/cities/noida" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Noida</Link>{`, `}
            <Link href="/cities/greater-noida" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Greater Noida</Link>{`, `}
            <Link href="/cities/ghaziabad" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Ghaziabad</Link>{`, `}
            <Link href="/cities/meerut" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Meerut</Link>{`, `}
            <Link href="/cities/muzaffarnagar" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Muzaffarnagar</Link>{`, `}
            <Link href="/cities/delhi" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Delhi</Link>{`, `}
            <Link href="/cities/chandigarh" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Chandigarh</Link>{`, `}
            <Link href="/cities/faridabad" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Faridabad</Link>{`, and `}
            <Link href="/cities/gurugram" className="font-semibold text-blue-700 underline-offset-2 hover:underline">Gurugram</Link>.
            Coverage and appointment slots can differ by area, appliance, and service requirement.
          </p>

          <p>
            Whether you are looking for a brand-wise appliance repair center, home appliance
            maintenance, computer and IT support, or CCTV-related technical assistance, explore our
            service categories and contact Service Support Hub to discuss your requirement. We
            encourage customers to confirm the product model, issue, location, estimate, and applicable
            service terms before approving a booking.
          </p>
        </div>
      </div>
    </section>
  );
};
