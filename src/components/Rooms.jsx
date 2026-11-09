import { BOOK, beforeYouReserve, extras, included, rooms } from '../data/content.js';
import { Button, Eyebrow, OwnerNote, Photo, StepNo } from './ui.jsx';

const columns = ['2026 · 2+ nights', '2026 · 1 night', '2027 · 2+ nights', '2027 · 1 night'];

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Choose your outlook</Eyebrow>
        <h2 id="rooms-heading" className="mt-4 max-w-[14ch] font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          Harbour light or garden quiet.
        </h2>
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed">
          Three rooms, all en-suite. Luskentyre and Scarista are the larger, superior rooms with harbour views. Borve looks over the mature garden towards the South Harbour. Each can be set as a superking or twin when you reserve.
        </p>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed">
          All rooms are up one flight of stairs. Maximum two adults per room. Check-in is 4.30pm–6.30pm, other times by arrangement. Check-out is by 10am.
        </p>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.id}
              className={`flex flex-col overflow-hidden rounded-[2rem] ${
                room.featured
                  ? 'on-dark bg-[#2E4036] text-[#F2F0E9] lg:-my-4'
                  : 'border border-[#2E4036]/15 bg-[#F2F0E9] text-[#1A1A1A]'
              }`}
            >
              <Photo
                id={room.image}
                alt={room.alt}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <StepNo light={room.featured}>{room.index}</StepNo>
                <h3 className="mt-3 font-sans text-3xl font-bold tracking-tight">{room.name}</h3>
                <p className="mt-1 text-sm">
                  {room.level} · {room.outlook}
                </p>
                <p className="mt-4 text-sm leading-relaxed">{room.summary}</p>
                <ul className="mt-4 space-y-1 text-sm leading-relaxed">
                  {room.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="mt-6 text-3xl font-bold tracking-tight">From {room.lead}</p>
                <p className="mt-1 text-sm leading-relaxed">
                  2026 rate for two nights or more. One night is {room.oneNight}.
                </p>
                <div className="mt-6">
                  <Button href={BOOK}>Book Direct</Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-sans text-2xl font-bold tracking-tight">Rates, February to November</h3>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed">
            Rates are per room, per night. The lower rate applies to stays of two or more nights. Single occupancy deducts £10 per night. Payment is by bank transfer or secure online card. A 25% deposit confirms the booking. The balance is due four weeks before arrival.
          </p>
          <div className="mt-6 space-y-4 md:hidden">
            {rooms.map((room) => (
              <div key={room.id} className="rounded-[2rem] border border-[#2E4036]/20 p-5">
                <h4 className="font-sans text-lg font-bold">{room.name}</h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {columns.map((label, index) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt>{label}</dt>
                      <dd className="font-semibold">{room.rates[index]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <table className="mt-6 hidden w-full border-collapse text-left text-sm md:table">
            <caption className="sr-only">Room rates for 2026 and 2027, February to November</caption>
            <thead>
              <tr className="border-b border-[#2E4036]/20">
                <th scope="col" className="py-3 pr-4 font-semibold">Room</th>
                {columns.map((label) => (
                  <th key={label} scope="col" className="py-3 pr-4 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-[#2E4036]/15">
                  <th scope="row" className="py-3 pr-4 font-semibold">{room.name}</th>
                  {room.rates.map((rate, index) => (
                    <td key={columns[index]} className="py-3 pr-4">{rate}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-sans text-2xl font-bold tracking-tight">The small things are already there.</h3>
            <ul className="mt-4 space-y-2 text-base leading-relaxed">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-2xl font-bold tracking-tight">Optional extras</h3>
            <ul className="mt-4 space-y-2 text-base leading-relaxed">
              {extras.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-sans text-2xl font-bold tracking-tight">Before you reserve</h3>
          <ul className="mt-4 max-w-[52ch] space-y-2 text-base leading-relaxed">
            {beforeYouReserve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <OwnerNote>
            <ul className="list-disc space-y-2 pl-5">
              <li>Room size in square metres or square feet for Luskentyre, Scarista and Borve.</li>
              <li>Exact bed dimensions for the superking and twin setup in each room.</li>
              <li>Any step-free access to public rooms, garden or parking that should be published.</li>
              <li>Lite-bite menu and prices.</li>
              <li>Laundry prices.</li>
              <li>EV charging price per kWh, or keep “at cost” only.</li>
            </ul>
          </OwnerNote>
        </div>
      </div>
    </section>
  );
}
