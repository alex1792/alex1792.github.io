// Gallery content, newest trip first.
//
// To add a trip:
//   1. scripts/add-photos.sh <trip-id> path/to/originals/*.jpg
//   2. Add a trip block below; paste the photo lines the script prints and
//      fill in title and alt.
//
// Trip fields:  id (folder name in assets/gallery/), title, date, location,
//               summary (optional), album (optional link to a full album)
// Photo fields: file (name without suffix), shape ("wide" | "tall" | ""),
//               title, alt (describes the photo for screen readers),
//               location (optional, overrides the trip location)
window.GALLERY_TRIPS = [
  {
    id: "bryce-canyon-2026",
    title: "Bryce Canyon National Park",
    date: "October 2026",
    location: "Utah",
    photos: [
      { file: "_93A3575", shape: "wide", title: "Hoodoos", alt: "Hoodoos" },
      { file: "_93A3625", shape: "tall", title: "Bryce Canyon", alt: "Brcye Canyon Loop" },
      { file: "_93A3692", shape: "tall", title: "Navajo Loop", alt: "Navajo Loop Trail" },
      { file: "_93A3718", shape: "wide", title: "Bryce Canyon Overlook", alt: "Bryce Canyon Overlook via Bryce Point" },
    ]
  },
  {
    id: "zion-2026",
    title: "Zion National Park",
    date: "October 2026",
    location: "Utah",
    photos: [
      { file: "_93A3775", shape: "wide", title: "Zion Canyon", alt: "Zion Canyon via West Rim Trail" },
      { file: "_93A3796", shape: "tall", title: "Canyon Overlook", alt: "Canyon Overlook" },
      { file: "_93A3846", shape: "tall", title: "The Narrows", alt: "The Narrows" },
      { file: "_93A3882", shape: "wide", title: "The Watchman", alt: "The Watchman" },
    ]
  },
  {
    id: "pomona-badminton-2026",
    title: "Badminton",
    date: "Sep 2026",
    location: "Pomona, CA",
    photos: [
      {
        file: "93A3371",
        shape: "wide",
        title: "Badminton",
        alt: "Badminton match on an indoor court",
      },
      {
        file: "93A3357",
        shape: "tall",
        title: "Badminton",
        alt: "A badminton player lunging for a shot on an indoor court",
      },
    ],
  },
  {
    id: "channel-islands-2026",
    title: "Channel Islands",
    date: "Sep 2026",
    location: "Santa Cruz Island, CA",
    photos: [
      {
        file: "93A3031",
        shape: "wide",
        title: "Ventura Harbor",
        alt: "Ventura Harbor",
        location: "Ventura, CA",
      },
      {
        file: "93A3080",
        shape: "tall",
        title: "Scorpion Anchorage Dock",
        alt: "Scorpion Anchorage Dock on Santa Cruz Island",
      },
      {
        file: "93A3216",
        shape: "",
        title: "Island Fox",
        alt: "An island fox",
      },
      {
        file: "93A3251",
        shape: "",
        title: "Common Dolphins",
        alt: "Common dolphins swimming in the ocean",
      },
    ],
  },
  {
    id: "socal-coast-2026",
    title: "Southern California Coast",
    date: "Aug 2026",
    location: "Malibu & La Jolla, CA",
    photos: [
      {
        file: "93A2803",
        shape: "wide",
        title: "Alonica",
        alt: "Bare feet on the sand as sea foam washes in at Point Dume",
        location: "Malibu, CA",
      },
      {
        file: "93A2883",
        shape: "tall",
        title: "California Sea Lion",
        alt: "A California sea lion",
        location: "La Jolla, CA",
      },
    ],
  },
  {
    id: "yellowstone-2026",
    title: "Yellowstone National Park",
    date: "May 2026",
    location: "Wyoming",
    photos: [
      {
        file: "93A2622",
        shape: "wide",
        title: "Old Faithful Geyser",
        alt: "Old Faithful Geyser erupting",
      },
      {
        file: "93A2665",
        shape: "tall",
        title: "Grand Prismatic Spring",
        alt: "Grand Prismatic Spring",
      },
      {
        file: "93A2527",
        shape: "wide",
        title: "Artist Point - Lower Falls",
        alt: "Lower Falls seen from Artist Point",
      },
      {
        file: "93A2484",
        shape: "tall",
        title: "Mammoth Hot Springs",
        alt: "Mammoth Hot Springs",
      },
      {
        file: "93A2340",
        shape: "",
        title: "Yellowstone National Park",
        alt: "Yellowstone landscape near Mammoth",
        location: "Mammoth, WY",
      },
      {
        file: "93A2375",
        shape: "",
        title: "Lamar Valley",
        alt: "Lamar Valley",
      },
      {
        file: "93A2725",
        shape: "",
        title: "Mt. Holmes",
        alt: "Mt. Holmes",
      },
      {
        file: "93A2728",
        shape: "",
        title: "Bison",
        alt: "A bison",
      },
    ],
  },
];
