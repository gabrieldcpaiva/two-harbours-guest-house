export const BOOK = 'https://www.twoharbours.com/availability.php';
export const TRIPADVISOR =
  'https://www.tripadvisor.co.uk/Hotel_Review-g1522935-d6714704-Reviews-Two_Harbours_Guest_House-Isle_of_Scalpay_Lewis_and_Harris_Outer_Hebrides_The_Hebrides.html';
export const CALMAC_UIG = 'https://www.calmac.co.uk/en-gb/route-information/uig-tarbert-harris/';
export const CALMAC_ULLAPOOL = 'https://www.calmac.co.uk/ports/ullapool-port/';
export const BUSES = 'https://www.cne-siar.gov.uk/roads-and-travel/bus-services/harris-bus-timetables';
export const EMAIL = 'enquiries@twoharbours.com';
export const PHONE_DISPLAY = '+44 7831 313729';
export const PHONE_TEL = '+447831313729';

export const nav = [
  { href: '#the-house', label: 'The house' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#journey', label: 'Journey' },
  { href: '#gallery', label: 'Photographs' },
];

export const timesQuote =
  'A welcoming Victorian guest house, superb hosts and a remarkable history as a hideout for Bonnie Prince Charlie.';

export const quotes = [
  {
    text: 'Our accommodation was spotless and comfortable. The breakfast was plentiful, beautifully cooked and presented. The homemade ad hoc baking is dangerously good and lovely to receive.',
    name: 'Nosila07',
    date: 'September 2026',
    title: 'Excellent hosts providing quality accommodation',
  },
  {
    text: 'The attention to detail became really obvious when we checked into the immaculately clean and comfortable Borve Room, which had everything we might need and more.',
    name: 'Alison W',
    date: 'September 2026',
    title: 'A beautiful Guesthouse where the owners really care about the comfort of their guests',
  },
  {
    text: 'Nestled between the two harbours on Scalpay Island (connected via a bridge to Harris) this gem of a Guest House was a real find… The room was a generous size, nothing missed but plenty of extra nice touches, such as home-made cake with the brew kit.',
    name: '736adyh',
    date: 'September 2026',
    title: 'Probably the nicest Guest House we have stayed in.',
  },
];

export const places = [
  {
    id: 'scalpay',
    title: 'Scalpay',
    body: 'Where you stay. The house sits between the North and South Harbours, joined to Harris by bridge.',
  },
  {
    id: 'harris',
    title: 'Harris',
    body: 'Beaches from Luskentyre to Scarista, about twenty minutes from Tarbert.',
  },
  {
    id: 'lewis',
    title: 'Lewis',
    body: 'North of Harris. Stornoway by air, or the Ullapool ferry, then the road south to Scalpay.',
  },
];

export const campbell = 'He came to me for safety, so how can I betray him.';

export const plaque =
  'On this site was the house in which Bonnie Prince Charlie passed some of his days as a fugitive in his own rightful land.';

export const history = [
  'Hospitality here is older than the house.',
  'At dawn on 30 April 1746, Bonnie Prince Charlie and his party arrived by rowing boat from Benbecula. They had disguised themselves as a shipwrecked merchant crew. The Prince was using the name Sinclair. Donald Campbell and his wife knew who their visitors were.',
  'Donald was loyal to the Hanoverian crown and aware of the £30,000 bounty. He chose hospitality anyway: a warm fire, beds, food, shelter and the use of his boat.',
  'When a local minister arrived with men to claim the reward, Donald’s answer was plain.',
];

export const historyAfter = [
  'The Prince stayed four nights, leaving on 4 May while a boat was secured in Stornoway for his escape to France. Donald later had to go into hiding. A plaque on the wall commemorates the refuge given on this site.',
  'The house that stands here today was rebuilt in the 1880s, incorporating the ruins and foundations of Donald Campbell’s farmstead. It has solid granite walls and a prominent position between Scalpay’s North and South Harbours.',
  'It became a draper’s and grocer’s, then a Church Manse, and more recently Two Harbours Guest House.',
  'The renovation keeps the historic charm and adds modern comforts: three en-suite rooms, a farmhouse kitchen, a mature garden and a guest patio looking over the dry stone wall to the North Harbour and the Harris hills, with An Cliseam in view.',
];

export const rooms = [
  {
    id: 'luskentyre',
    index: '01',
    name: 'Luskentyre',
    level: 'Superior',
    outlook: 'Harbour view',
    image: 'luskentyre',
    alt: 'The Luskentyre room with a sofa, desk, patterned curtains and a window looking across the harbour to the Harris hills.',
    summary:
      'Our super-sized room looks over the North Harbour and Harris hills on one side, and the mature garden and South Harbour on the other. A desk and sofa give you space to spread a map, or do nothing with the afternoon.',
    features: [
      'Superking or twin, on reservation',
      'Private en-suite with mains-pressure shower',
      'Desk, sofa and smart television',
    ],
    lead: '£184',
    oneNight: '£200',
    rates: ['£184', '£200', '£194', '£210'],
    featured: false,
  },
  {
    id: 'scarista',
    index: '02',
    name: 'Scarista',
    level: 'Superior',
    outlook: 'Elevated harbour view',
    image: 'scarista',
    alt: 'The bright Scarista room with green armchairs, a writing desk and harbour views through tall windows.',
    summary:
      'Large and bright, with elevated views over the harbour and the North Harris hills. Local artwork warms the room, and an extra-large en-suite shower room gives the day’s salt and weather somewhere to stay behind.',
    features: [
      'Superking or twin, on reservation',
      'Extra-large en-suite shower room',
      'Local artwork and harbour views',
    ],
    lead: '£184',
    oneNight: '£200',
    rates: ['£184', '£200', '£194', '£210'],
    featured: true,
  },
  {
    id: 'borve',
    index: '03',
    name: 'Borve',
    level: 'Standard',
    outlook: 'Garden view',
    image: 'borve',
    alt: 'The Borve room with a double bed, armchairs and a window over the guest-house garden.',
    summary:
      'Our standard double is still larger than most, with a view over the mature garden towards the South Harbour. The quieter choice for guests who prefer green things to blue things, though both are close.',
    features: [
      'Superking or twin, on reservation',
      'Private en-suite shower room',
      'Garden view towards the South Harbour',
    ],
    lead: '£170',
    oneNight: '£190',
    rates: ['£170', '£190', '£180', '£199'],
    featured: false,
  },
];

export const included = [
  'Full cooked breakfast',
  'Welcome tray',
  'Wi-Fi and Ethernet, up to 200 Mbps throughout the house',
  'Smart television with FreeSat and streaming',
  'Slippers and dressing gowns',
  'Allocated parking space',
];

export const extras = [
  'Evening lite-bites can be ordered by WhatsApp.',
  'Packed lunches and an optional wash-and-fold laundry service are available.',
  'Wine, beer, Isle of Harris Gin and Hearach single malt are offered.',
  'Safe bike storage and a boot dryer are provided.',
  'The 7kW EV charger (Hypervolt Home 3 Pro) is reserved for exclusive use at booking. You pay only for electricity used, at cost, settled on departure.',
];

export const beforeYouReserve = [
  'Maximum two adults per room. No children under 14. No pets.',
  'No smoking or vaping inside. Smoking is permitted in the garden.',
  'Dietary requirements can be catered for with notice.',
  'No hot food in bedrooms. Dining-room facilities, tableware and a fridge are available.',
  'All guest rooms are up one flight of stairs.',
  'Single-night stays are requests, not instant confirmations.',
];

export const gallery = [
  {
    id: 'front',
    alt: 'Two Harbours Guest House beside its mature garden, with the North Harbour and Harris hills beyond.',
    caption: 'The Old Manse, between the two harbours.',
  },
  {
    id: 'patio',
    alt: 'The guest patio and mature garden, looking over a dry stone wall to the North Harbour and the Harris hills, with An Cliseam in view.',
    caption: 'The patio, over the dry stone wall.',
  },
  {
    id: 'view',
    alt: 'A garden lawn and dry stone wall, with the water and snow-dusted Harris hills beyond.',
    caption: 'From the garden to the hills.',
  },
  {
    id: 'sunset',
    alt: 'Evening light over a rocky shore and open water, with a hill on the horizon.',
    caption: 'Evening light on the shore.',
  },
  {
    id: 'sound',
    alt: 'Sunset over a wide stretch of water, with a rocky foreground, low islands and hills.',
    caption: 'The water at sunset.',
  },
  {
    id: 'stone',
    alt: 'A standing stone in coastal grass at dusk, with water and hills beyond.',
    caption: 'Coastal grass on Scalpay.',
  },
  {
    id: 'bridge',
    alt: 'The bridge between Harris and Scalpay, seen across the sound with rocky green shores on either side.',
    caption: 'Scalpay Bridge.',
  },
  {
    id: 'luskentyre-light',
    alt: 'Sunlight across the Luskentyre room, with the sofa, the bed and a window to the harbour.',
    caption: 'Luskentyre, harbour light.',
  },
  {
    id: 'scarista-bed',
    alt: 'The Scarista room with a large bed, green armchairs and tall windows over the harbour.',
    caption: 'Scarista, elevated and bright.',
  },
  {
    id: 'borve-alt',
    alt: 'The Borve room from the doorway, with a double bed, armchairs and a window toward the garden.',
    caption: 'Borve, garden quiet.',
  },
  {
    id: 'dining',
    alt: 'The breakfast room laid with wooden tables, place settings and a painted Hebridean landscape on the walls.',
    caption: 'The breakfast room.',
  },
  {
    id: 'breakfast',
    alt: 'A breakfast plate of pancakes with berries and syrup, beside fruit, juice and tea.',
    caption: 'Breakfast, included.',
  },
];

export const steps = [
  {
    index: '01',
    title: 'Arrive',
    body: 'Cross Scalpay Bridge. The house is a seven-mile drive from Tarbert ferry port, about ten minutes. Check-in is 4.30pm–6.30pm, and other times by arrangement.',
  },
  {
    index: '02',
    title: 'Unwind',
    body: 'Leave outdoor shoes in the porch. Slippers are provided, and a welcome tray is waiting. The patio looks over the dry stone wall to the North Harbour.',
  },
  {
    index: '03',
    title: 'Linger',
    body: 'Breakfast is included, from the farmhouse kitchen. Check-out is by 10am. The harbours are already there, and the Harris beaches are close.',
  },
];

export const terms = [
  ['Arrival and departure', 'Check-in 4.30pm–6.30pm, other times by arrangement. Check-out by 10am.'],
  ['Deposit and balance', '25% deposit when more than 28 days away. Balance due 28 days before arrival. Full payment within 28 days of arrival. Online holds last one hour pending payment.'],
  ['Changes', 'Date changes up to 28 days before arrival, subject to availability. If no alternative is agreed, the booking is cancelled with no deposit refund.'],
  ['Cancellation', 'No-shows are not refunded. Cancellations are not normally refunded. If the house resells the dates it arranges a pro-rata return.'],
  ['Who can stay', 'Maximum two adults per room. No children under 14. No pets.'],
  ['Dietary needs', 'Dietary requirements can be catered for with sufficient notice.'],
];
