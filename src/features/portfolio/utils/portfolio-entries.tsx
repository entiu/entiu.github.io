import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export type Entry = {
  imgKey: string;
  title: string;
  description: string;
  why: ReactNode;
  how: ReactNode;
  what: ReactNode;
};

export const portfolioEntries: Entry[] = [
  {
    imgKey: "metro",
    title: "Bucharest v2.0",
    description: "Trading geography for clarity",
    why: (
      <p>
        As a traveler with the Bucharest underground, I often have a hard time deciphering{" "}
        <a
          className="text-amber-500 font-semibold underline hover:text-amber-600 transition-colors"
          href="/metrorex.jpg"
          target="blank">
          the current metro map
        </a>
        , because of its unfriendly design. The most glaring of its flaws, in my opinion, is
        prioritizing geographical accuracy over clarity. This makes it fairly hard for people to
        quickly grasp the network's structure and plan their routes effectively.
      </p>
    ),
    how: (
      <>
        <p>
          Inspired by the Paris metro map, I created a design that balances geographical accuracy
          with geometric convention. The result is a network both visually appealing and easy to
          navigate.
        </p>
        <p>
          The main junctions are easily identifiable, as are the major landmarks around the city,
          the largest parks and the Dâmbovița river.
        </p>
        <p>
          A thorough list with the most relevant neighborhoods is provided at the bottom of the map,
          each one being easy to locate thanks to the alphanumeric grid. This is one of the ways in
          which overground orientation is facilitated without compromising aesthetics.
        </p>
      </>
    ),
    what: <p>A geometrically simplified underground map.</p>,
  },
  {
    imgKey: "staffeine",
    title: "Staffeine",
    description: "Farewell, paper stacks",
    why: (
      <p>
        HoReCa owners and employees spend too much of their time handling repetitive, tedious tasks
        by hand, leaving room for frustration, errors and a general waste of resources.
      </p>
    ),
    how: (
      <p>
        Staffeine acts as a schedule- and staff-manager, useful for both employers and employees. It
        can help businesses easily generate schedules, assign tasks and monitor their team's
        efficiency. Via digitization, gamification and automation, Staffeine aims to reduce
        bureaucracy and improve the work ethics in cafes, restaurants and hotels.
      </p>
    ),
    what: (
      <p>
        A progressive web app, built mobile-first but also available on desktop for admin
        functionalities.
      </p>
    ),
  },
  {
    imgKey: "ivbs",
    title: "Invibes",
    description: "Quirky ad formats",
    why: (
      <p>
        Techno-feudalism makes it imperative for businesses of all ages to promote, before they
        succeed.
      </p>
    ),
    how: (
      <>
        <p>
          As part of the Product team at Invibes Advertising, I would participate in the entire
          process that preceded the launch of a new format: ideation, mock-ups, prototyping,
          development, and finally deployment.
        </p>
        <p>
          All digital design was tackled in the Adobe suite (Illustrator, Photoshop, XD), whereas
          the final products were developed as web components with Vanilla JavaScript.
        </p>
      </>
    ),
    what: <p>Interactive, in-feed advertising.</p>,
  },
  {
    imgKey: "cf",
    title: "Creative Factory",
    description: "All-in-one ad management",
    why: (
      <p>
        The AdOps department of one of the world's largest sports media groups need a tool to
        configure all digital widgets they publish.
      </p>
    ),
    how: (
      <p>
        Creative Factory is a web app that allows users to create, customize and manage widgets use
        in digital ad campaigns. The platform takes the user through the whole journey of designing
        and configuring what the ad looks like, finally rendering a <code>script</code> tag (which
        is then embedded on the publisher's website).
      </p>
    ),
    what: <p>A single-page application built with React and TypeScript.</p>,
  },
  {
    imgKey: "kidex",
    title: "Kidex",
    description: "So much to do, so much to see",
    why: (
      <p>
        Parents can have a tough time finding engaging activities for their children, often relying
        on word-of-mouth recommendations or scattered online searches.
      </p>
    ),
    how: (
      <p>
        Kidex aggregates a wide variety of child-friendly events and activities in one user-friendly
        platform. Parents can easily search, filter, and book activities based on their children's
        interests and age groups.
      </p>
    ),
    what: <p>A collection of mock-ups used in developing the native web app.</p>,
  },
  {
    imgKey: "vilex",
    title: "Vilex AI",
    description: "Law and order.",
    why: (
      <p>
        The Romanian Diaspora runs into numerous legal challenges when trying to access authorities
        from their country, often due to language barriers and unfamiliarity with legal procedures.
      </p>
    ),
    how: (
      <p>
        Vilex engages AI to provide accessible legal assistance to Romanians abroad. Through an easy
        to grasp chat interface, users can receive guidance on various legal matters, document
        preparation, and procedural advice in their native language.
      </p>
    ),
    what: (
      <>
        <p>A freemium chat-based AI legal assistant accessible via web.</p>
        {/* <a
          href="/vilex/index.html"
          className="sm:w-full md:w-auto md:self-baseline mt-2"
          target="_blank">
          <Button className="w-full cursor-pointer">View demo</Button>
        </a> */}
      </>
    ),
  },
  {
    imgKey: "sopranos",
    title: "Undisputed",
    description: "Coronating the all-time champion of TV shows",
    why: <p>No reason needed. The Sopranos is the greatest TV show of all time.</p>,
    how: (
      <p>
        I saw the initial design in a local cafe, and felt compelled to reimagine it digitally. The
        whole design was created in Adobe Illustrator.
      </p>
    ),
    what: <p>A cartoony illustrated poster.</p>,
  },
  {
    imgKey: "ttt-2",
    title: "Tic-tac-tic-tac-toe",
    description: "Like tic-tac-toe, but recursive",
    why: (
      <p>
        You may find yourself in a situation where a regular game of tic-tac-toe just doesn't cut it
        anymore.
      </p>
    ),
    how: (
      <>
        <p>
          A tic-tac-toe board where each cell contains another tic-tac-toe board. To win a cell, you
          have to win the smaller board inside it.
        </p>
        <p>
          The twist is that the position of your move in the smaller board determines which cell
          your opponent must play in next on the larger board. This adds a layer of strategy, as
          players must think ahead about both their immediate moves and the broader implications for
          the overall game.
        </p>
        <p>Built with vanilla JavaScript, HTML and CSS.</p>
      </>
    ),
    what: (
      <>
        <p>A web-based mini-game.</p>
        <a
          href="/tic-tac-tic-tac-toe/index.html"
          className="sm:w-full md:w-auto md:self-baseline mt-2"
          target="_blank">
          <Button className="w-full cursor-pointer">View demo</Button>
        </a>
      </>
    ),
  },
  {
    imgKey: "cetea",
    title: "Cetea",
    description: "Wedding as big as a festival",
    why: (
      <p>
        A close couple of friends gets married in the back yard of their own country house. The size
        of the place, and the number of activity stations planned, call for a festival-inspired map.
      </p>
    ),
    how: (
      <>
        <p>
          Geographical accuracy is sacrificed in favor of a more illustrative, easy to grasp design
          (sounds familiar?).
        </p>
        <p>
          The main experience points are highlighted with vibrant colors, while smaller details are
          rendered in a more minimalistic style.
        </p>
        <p>Cardinal help is provided in honor of the groom, who's a geodetic engineer.</p>
      </>
    ),
    what: <p>An illustrated map, used as a guide for the wedding guests.</p>,
  },
  {
    imgKey: "surf",
    title: "MUV",
    description: "Sedentary times call for dynamic designs",
    why: (
      <p>
        Preparing for their surf trip to Morocco in early November 2025, sports junkies{" "}
        <a
          className="text-amber-500 font-semibold underline hover:text-amber-600 transition-colors"
          href="https://muvoutside.com/"
          target="_blank">
          @muvoutside
        </a>{" "}
        could not start on their adventure without something to fire up the spirits.
      </p>
    ),
    how: (
      <p>
        Sketched on paper and digitized in Illustrator, joyful but light, the result can easily be
        borne on T-shirts, canvases, flags and other merch.
      </p>
    ),
    what: (
      <p>
        Shaka aura, surf props, sun and waves — all the must-haves for a good time by the Atlantic.
      </p>
    ),
  },
  {
    imgKey: "vienna",
    title: "Vienna",
    description: "A day in the life of a Golden Retriever",
    why: (
      <p>
        Come on,{" "}
        <a
          className="text-amber-500 font-semibold underline hover:text-amber-600 transition-colors"
          href="/vienna.jpeg"
          target="_blank">
          look at her
        </a>
        .
      </p>
    ),
    how: <p>Designed in Adobe Illustrator. Texture added with opacity masks and noise grain.</p>,
    what: (
      <p>
        A hopefully cute illustration of a Golden Retriever enjoying her life, somewhere in
        Transylvania.
      </p>
    ),
  },
];
