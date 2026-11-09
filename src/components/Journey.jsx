import { BOOK, BUSES, CALMAC_UIG, CALMAC_ULLAPOOL } from '../data/content.js';
import { Button, Eyebrow, OwnerNote, Photo, StepNo, TextLink } from './ui.jsx';

const legs = [
  {
    index: '01',
    title: 'Reach Harris',
    body: 'Tarbert is the ferry port and hub of Harris. Caledonian MacBrayne sails Uig on Skye to Tarbert. The published crossing is about 1 hour 40 minutes. Book online in advance, even as a foot passenger. Vehicle check-in is 45 minutes before departure. Foot passengers, 30 minutes. Always check the live timetable and service status before you travel.',
  },
  {
    index: '02',
    title: 'Cross to Scalpay',
    body: 'Leave Tarbert on the road across Scalpay Bridge. The bridge connects Scalpay to Harris, joining the three islands of Scalpay, Harris and Lewis. There is no island ferry for the final leg.',
  },
  {
    index: '03',
    title: 'Arrive at the house',
    body: 'The house is between the island’s North and South Harbours. Check-in is from 4.30pm to 6.30pm. Other times by arrangement. Tell us if you will arrive after 6.30pm so we can meet you. Check-out is by 10am.',
  },
];

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>An island, not an obstacle</Eyebrow>
            <h2 id="journey-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
              The last seven miles are the easy part.
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed">
              Scalpay is joined to Harris by bridge, so there is no island ferry for the final leg. From Tarbert ferry port it is a seven-mile scenic drive to the house, about ten minutes.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[2rem]">
            <Photo
              id="bridge"
              alt="The bridge between Harris and Scalpay, seen across the sound with rocky green shores on either side."
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {legs.map((leg) => (
            <li key={leg.index} className="rounded-[2rem] border border-[#2E4036]/15 p-6">
              <StepNo>{leg.index}</StepNo>
              <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight">{leg.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{leg.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[52ch] text-base leading-relaxed">
          An alternative approach is Ullapool to Stornoway on Lewis, about 2 hours 40 minutes, then south by road or bus through Harris to Tarbert and on to Scalpay.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <TextLink href={CALMAC_UIG} external>Uig to Tarbert on CalMac</TextLink>
          <TextLink href={CALMAC_ULLAPOOL} external>Ullapool to Stornoway</TextLink>
        </p>

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold tracking-tight">Travel times, as the house states them</h3>
          <dl className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#2E4036]/15 p-5">
              <dt className="font-semibold">Tarbert ferry port to Two Harbours</dt>
              <dd className="mt-2 text-sm leading-relaxed">About 10 minutes. 7 miles by road, via Scalpay Bridge.</dd>
            </div>
            <div className="rounded-[2rem] border border-[#2E4036]/15 p-5">
              <dt className="font-semibold">Tarbert to the Harris beaches, Luskentyre to Scarista</dt>
              <dd className="mt-2 text-sm leading-relaxed">About 20 minutes, as stated on the property site.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed">Ferry crossings are not included in these driving times.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-sans text-2xl font-bold tracking-tight">By air</h3>
            <p className="mt-3 max-w-[46ch] text-base leading-relaxed">
              The nearest airport is Stornoway (SYY) on Lewis. From there, continue south to Tarbert by the W10 bus or by car, then on to Scalpay.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-2xl font-bold tracking-tight">By bus</h3>
            <p className="mt-3 max-w-[46ch] text-base leading-relaxed">
              Comhairle nan Eilean Siar publishes Harris services, including W10 from Stornoway to Tarbert and W14 from Tarbert to Scalpay. Most services run Monday to Saturday. Some stops are request-only. Check the current timetable before you travel.
            </p>
            <p className="mt-3">
              <TextLink href={BUSES} external>Harris bus timetables</TextLink>
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold tracking-tight">When you arrive</h3>
          <ul className="mt-4 max-w-[52ch] space-y-2 text-base leading-relaxed">
            <li>Each room has an allocated parking space at the front of the house.</li>
            <li>The EV charger must be reserved for exclusive use when booking. Electricity is charged at cost and settled on departure.</li>
            <li>Cows and sheep roam freely in the crofting community. Leave outdoor shoes in the porch. Slippers are provided.</li>
            <li>All guest rooms are up one flight of stairs.</li>
            <li>Detailed directions are provided in the Guest Area after reservation.</li>
            <li>The published terms ask guests to take suitable travel insurance for disruption, and to check CalMac service status before sailing.</li>
          </ul>
          <OwnerNote>
            <ul className="list-disc space-y-2 pl-5">
              <li>Preferred transfer guidance from Stornoway airport: taxi firms, hire cars, or a stated drive time.</li>
              <li>The nearest Scalpay bus stop you recommend, and whether you collect from Tarbert.</li>
              <li>A short public turn-by-turn from Scalpay Bridge, or keep directions in the Guest Area only.</li>
              <li>A verified map embed or what3words for the house.</li>
              <li>Any winter or weather-disruption wording beyond travel insurance and checking CalMac service status.</li>
            </ul>
          </OwnerNote>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Button href={BOOK}>Book Direct</Button>
          <p className="max-w-[36ch] text-sm leading-relaxed">The bridge is the easy bit. Detailed directions follow the reservation.</p>
        </div>
      </div>
    </section>
  );
}
