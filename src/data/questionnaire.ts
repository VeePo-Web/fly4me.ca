/**
 * Worship in the Park — Canonical Questionnaire Data
 *
 * This file contains the full Q&A responses from the founding questionnaire.
 * It serves as the authoritative decision filter for all content, design,
 * and structural decisions across the site.
 *
 * Usage: Import specific sections to validate copy, tone, structure, or
 * feature decisions against the founder's stated intent.
 */

export interface QuestionnaireEntry {
  id: string;
  question: string;
  answer: string;
}

export interface QuestionnaireSection {
  section: string;
  entries: QuestionnaireEntry[];
}

export const questionnaire: QuestionnaireSection[] = [
  {
    section: "Foundation & Theology",
    entries: [
      {
        id: "1.1",
        question: "What is the clearest one-sentence description of Worship in the Park today?",
        answer: "To gather ecumenically the churches in Cochrane to worship. Unity. That if a people turn from their wicked ways and repent then God will hear our cry and heal our land.",
      },
      {
        id: "1.3",
        question: "What must remain at the absolute center of this event and website, even if everything else changes?",
        answer: "The vision and mission of the event. The verse that if a people would turn from their wicked ways that He would heal our land. I think also the info for the event.",
      },
      {
        id: "1.4",
        question: "Which truths must the website communicate without ambiguity?",
        answer: "A welcoming invitation, Prayer, Unity across churches, Repentance, Jesus openly exalted.",
      },
      {
        id: "1.5",
        question: "Which phrases from your current language feel most non-negotiable?",
        answer: "Sparked in prayer, and sustained in prayer and faith.",
      },
      {
        id: "1.6",
        question: "What should the website never accidentally make this event feel like?",
        answer: "A concert. A festival. A church program. A platform-building exercise. A single-church outreach disguised as unity. A casual summer activity with Christian language added on. A hype-driven production. An insider-only church gathering. A vague spiritual gathering. It should never feel fake. It needs to feel real. The goal is deep before wide. Not shallow. It should never feel like an inside thing, as it is open to the community.",
      },
      {
        id: "1.7",
        question: "What spiritual posture should people sense from the website before they ever arrive at the park?",
        answer: "Anticipation. Conviction. Purity, the fear of the Lord. Rending our hearts like it says in Joel. Humility. Depth.",
      },
      {
        id: "1.8",
        question: "How explicitly should the website speak about repentance, holiness, idols, realignment, and turning back to God?",
        answer: "Mainly that verse from Chronicles that if we turn then God will heal our land.",
      },
      {
        id: "1.9",
        question: "What is the theological center of the event?",
        answer: "Maybe from Matthew 4:10 or so, when Jesus says to Satan that we will worship God and only God alone. We are united through denominations by our faith in the Apostles' Creed. We are brothers and sisters under Christ.",
      },
      {
        id: "1.10",
        question: "What should be treated as vision language or prayerful hope rather than as a public-facing claim?",
        answer: "A town under one king. Jesus is King of this valley (Cochrane). No general language. Sometimes general language feels dull because it is familiar.",
      },
      {
        id: "1.11",
        question: "Complete this sentence: 'Worship in the Park exists to…'",
        answer: "Bring unity in Cochrane under Christ.",
      },
      {
        id: "1.12",
        question: "What should a spiritually hungry visitor feel by the time they finish reading the homepage?",
        answer: "They should feel hope. They should feel depth. They should sense that God will be there. Truly God will be there. That the veil is torn away and we will be aware of the spiritual war behind the scenes.",
      },
    ],
  },
  {
    section: "Audience & Positioning",
    entries: [
      {
        id: "2.1",
        question: "Who is the primary conversion audience for the website?",
        answer: "Families, hungry believers. The one who wants something deeper. Searching and seeking non-believers.",
      },
      {
        id: "2.2",
        question: "Which audience groups must feel explicitly welcomed?",
        answer: "Families, Children, Teens, Young adults, Adults, Older adults, Committed believers, People praying for renewal, Spiritually hungry people, People with little or no church background, Friends invited by others, Church leaders, Volunteers.",
      },
      {
        id: "2.3",
        question: "Which audience group is most likely to discover the site first and then share it?",
        answer: "Spiritually curious local resident, Church-connected parent, Local pastor or leader.",
      },
      {
        id: "2.4",
        question: "What are the main emotional barriers that could stop someone from attending?",
        answer: "It sounds too churchy or insider-only. I do not know if my family will be comfortable. I do not know what to expect. I do not know if I can come for only part of the day. I do not know if one church is secretly behind it. I do not know if it is truly Christ-centered.",
      },
      {
        id: "2.5",
        question: "What are the top practical questions a first-time visitor must get answered within 30–60 seconds?",
        answer: "What it is. The mission and the vision. The theology behind the unity. The main verses guiding us. Then the practical info displayed very clearly: when it is, how long, who it's for, who will be there.",
      },
      {
        id: "2.6",
        question: "What must the homepage communicate within the first 5 seconds?",
        answer: "THIS IS REAL, THIS IS AUTHENTIC, THIS IS GOD, THIS IS PURE.",
      },
      {
        id: "2.7",
        question: "What should the site lead with above the fold?",
        answer: "Plain-English event clarity first, Spiritual vision first.",
      },
      {
        id: "2.8",
        question: "Which phrasing best describes the public category this event should own?",
        answer: "A free outdoor worship event in Cochrane.",
      },
      {
        id: "2.9",
        question: "Which positioning statements are strongest?",
        answer: "A day wholly set apart for worship and prayer. Churches together under one king.",
      },
      {
        id: "2.10",
        question: "What language should be used first for discoverability?",
        answer: "Free outdoor worship event. All day. Non-stop prayer and worship at Mitford Park.",
      },
      {
        id: "2.11",
        question: "What language should be reserved for deeper sections?",
        answer: "The verse in Matthew that we should worship God and Him alone.",
      },
      {
        id: "2.12",
        question: "How should the website balance broad welcome and spiritual seriousness?",
        answer: "In the about and the vision and mission pages it shows more of the depth in the heart behind the event. The main landing page has the main verse from Chronicles and a shorter vision and mission.",
      },
      {
        id: "2.13",
        question: "Which statements would help a newcomer feel safe to attend?",
        answer: "All are welcome. All can come to the table. Maybe a verse that talks about Jesus inviting ALL. Maybe a page specifically for the new believer or spiritually curious, explaining everything.",
      },
    ],
  },
  {
    section: "Event Elements",
    entries: [
      {
        id: "3.1",
        question: "What is the clearest current description of the event format?",
        answer: "August 8th, 2026, 11am–7pm. 7 different worship teams, all an hour long each. Outdoor, at Mitford Park. There will be food trucks, and prayer tents, and free bibles, and a 'get connected' tent with the churches.",
      },
      {
        id: "3.2",
        question: "How should the eight-hour format be framed?",
        answer: "Drop in at any point. Stay for how long or short you want to.",
      },
      {
        id: "3.3",
        question: "How important is it that the website explain this as more than a stage program?",
        answer: "10 = essential to the identity.",
      },
      {
        id: "3.4",
        question: "Which event elements must have visible presence on the website before the footer?",
        answer: "Main worship gathering, Eight worship teams, MC-led flow, Prayer Tent, Get Connected Tent, Free Bibles, Food trucks, Parking, Washrooms, Weather / tent coverage.",
      },
      {
        id: "3.5",
        question: "How should the Prayer Tent be framed?",
        answer: "Prayer for all needs. Verses to invite newcomers — for encouragement, edification, comfort.",
      },
      {
        id: "3.6",
        question: "Which prayer needs should be explicitly named?",
        answer: "Healing, Repentance, Salvation, Encouragement, General prayer needs, Family needs, Physical needs, Emotional needs.",
      },
      {
        id: "3.7",
        question: "How should the Get Connected Tent be framed?",
        answer: "All churches come and set up a booth with their church. What they offer, programs, calendar, volunteers, etc. Times, address. So that people go where they feel connected with.",
      },
      {
        id: "3.8",
        question: "What should the Get Connected Tent facilitate?",
        answer: "Connection to local churches, Connection to ministries, Volunteer pathways, Questions about faith, Follow-up conversations, Prayer follow-up, Support after the event, Baptism follow-up.",
      },
      {
        id: "3.9",
        question: "How should free Bible distribution be described?",
        answer: "If you need a free Bible, come to the Get Connected Tent to receive it! We will have someone there to explain how to read it, what it is.",
      },
      {
        id: "3.10",
        question: "How should baptism presence be described?",
        answer: "It will be in the Bow River.",
      },
      {
        id: "3.11",
        question: "What should the site say about worship teams before all names are finalized?",
        answer: "Just have a list of the times for the worship teams. They will all be one hour long with 7 minutes transition.",
      },
      {
        id: "3.12",
        question: "How should the MC-led flow be represented?",
        answer: "Mention briefly as part of the day's flow. Explain its role in creating continuity and invitation.",
      },
      {
        id: "3.13",
        question: "Which 'what to expect' moments matter most?",
        answer: "Arrive freely, worship in the open, receive prayer, get connected and plugged in with a church, receive a free Bible. Get baptized!",
      },
    ],
  },
  {
    section: "Website Strategy",
    entries: [
      {
        id: "4.1",
        question: "What is the primary job of the website?",
        answer: "Clarify the vision. Act as a central hub for all vision and info. So it is as clear as possible in everyone's minds. And in so, get people to attend. And the vision being displayed beforehand fostering a depth of unity. And then to drive volunteer sign-ups.",
      },
      {
        id: "4.2",
        question: "What is the single most important action the website should drive?",
        answer: "To attend the event (not to sign up but to put it in calendar manually) and to share the vision.",
      },
      {
        id: "4.3",
        question: "What secondary actions should be highly visible?",
        answer: "Read FAQ, sign up for volunteer. Share the event with others.",
      },
      {
        id: "4.4",
        question: "What are the top user journeys the site needs to support?",
        answer: "I want to know practical details. I want to see which churches are involved.",
      },
      {
        id: "4.5",
        question: "Which user journey should get the most priority on the homepage?",
        answer: "The practical details and the spiritual vision and mission. And an invitation.",
      },
      {
        id: "4.6",
        question: "What does a perfect first-time visitor journey look like?",
        answer: "They understand the clarity of the vision and the day and understand the depth of it spiritually.",
      },
      {
        id: "4.7",
        question: "What does a perfect returning visitor journey look like?",
        answer: "They get more and more excited the more they think about it. They get more and more overwhelmed with the reality that God's hand is moving in Cochrane.",
      },
      {
        id: "4.8",
        question: "What does a perfect supporter journey look like?",
        answer: "They can share the event easily with others. Share the link. Maybe there is a downloadable run of show that they can print off and share with visuals and colors and branding. There will be quite a few older people so they might like paper copies.",
      },
      {
        id: "4.9",
        question: "What does a perfect church leader journey look like?",
        answer: "Church leader journey looks like they can easily download the PowerPoint to share with their church. With all the information. They know clearly how they can get involved. Maybe in the volunteer sign-up, there is an option for a church to request to be involved and a full form.",
      },
      {
        id: "4.10",
        question: "How many primary calls to action should exist in the hero area?",
        answer: "Not sure. The nav page needs to be super clear. The primary call to action should be something like 'add it to your calendar.' There are themes where you can either see the practical details or the spiritual depth and history. Maybe we have some history on the website of the churches in Cochrane to build the identity of our roots in Cochrane being Christian. There is identity in history.",
      },
      {
        id: "4.11",
        question: "Which CTAs belong in the hero?",
        answer: "See event details. Sign up to volunteer.",
      },
      {
        id: "4.12",
        question: "Which CTAs belong lower on the page?",
        answer: "Read the full vision. Download PowerPoint, and a day schedule for the event, that you can print off and share.",
      },
    ],
  },
  {
    section: "Site Structure",
    entries: [
      {
        id: "5.1",
        question: "What site structure feels most right for launch?",
        answer: "Multi-page event site.",
      },
      {
        id: "5.2",
        question: "Which pages should exist at launch?",
        answer: "Home, About / Vision, Event Details, Schedule / Lineup, Prayer, Get Connected / Churches, Volunteer, Partner / Sponsor / Donate, FAQ, What to Bring, Contact, Accessibility, Post-event photos and testimonies (for people to upload testimonies and videos and photos afterwards).",
      },
      {
        id: "5.3",
        question: "Which sections must appear on the homepage in this order?",
        answer: "1. Hero. 2. What this is, and what it is not (leading to full visioning page with downloads). 3. Event Details. 4. What to expect. 5. Who is involved (with link to church and volunteer sign-up). 6. Get connected. 7. Cochrane's church history. 8. FAQs. 9. Support Actions.",
      },
      {
        id: "5.4",
        question: "Should the homepage include a 'What this is / What this is not' section?",
        answer: "Yes, kind of like a clear visioning and identity section.",
      },
      {
        id: "5.5",
        question: "If yes, what should be listed there?",
        answer: "What this is: Worship, unity under Christ, Christ as king. What this is not: One church leading or promoting. Competition. A concert.",
      },
      {
        id: "5.6",
        question: "Should the site include a dedicated Vision page?",
        answer: "Homepage plus dedicated Vision page.",
      },
      {
        id: "5.7",
        question: "Should the site include a dedicated page for churches involved?",
        answer: "Yes. Maybe a page that has all the contacts of the churches involved, with their mission and visions, and pastors etc. So that the MC on the event can point people to the website to get connected.",
      },
      {
        id: "5.8",
        question: "Should the site include a dedicated page for prayer and ministry response?",
        answer: "Yes, that would be good too.",
      },
      {
        id: "5.9",
        question: "Should the site include a combined or separated support page?",
        answer: "One dedicated partner page.",
      },
      {
        id: "5.10",
        question: "Should the site include a post-event photos and testimonies page?",
        answer: "Yes.",
      },
      {
        id: "5.11",
        question: "What items must be visible in the site navigation?",
        answer: "Use your fantasy.co experience to decide.",
      },
      {
        id: "5.14",
        question: "Which content belongs in the footer?",
        answer: "Use your fantasy.co experience to decide.",
      },
    ],
  },
  {
    section: "Homepage",
    entries: [
      {
        id: "6.1",
        question: "What should the homepage headline accomplish?",
        answer: "Clarity of the vision, that someone's heart is immediately in it. This event has been prayed for for years.",
      },
      {
        id: "6.2",
        question: "Which headline directions are strongest?",
        answer: "Worship in the Park. And the background will be a drone video montage of Mitford Park.",
      },
      {
        id: "6.3",
        question: "What should the homepage subheadline clarify?",
        answer: "Date, location, and a verse maybe.",
      },
      {
        id: "6.5",
        question: "What should the second homepage section accomplish?",
        answer: "Clarify what this event is. Explain the vision.",
      },
      {
        id: "6.6",
        question: "What should the 'why this day matters' section communicate?",
        answer: "Some verses and some explaining the depth of the impact of one city under Christ. One King. Unity.",
      },
      {
        id: "6.7",
        question: "What should the 'what to expect' section communicate?",
        answer: "That Jesus is glorified. He is king. He reigns. He will be worshiped for who He is, what He has done, what He is doing, what He will do. He is God.",
      },
      {
        id: "6.8",
        question: "Should the homepage include a schedule preview?",
        answer: "Schedule preview on homepage, then a details page with a full schedule that someone can download.",
      },
      {
        id: "6.9",
        question: "Should the homepage include a worship team preview?",
        answer: "Yes, names, churches.",
      },
      {
        id: "6.10",
        question: "How should the partner church section be handled on the homepage?",
        answer: "Names, logos, and short descriptions of the churches' vision and mission, and contacts for the pastors.",
      },
      {
        id: "6.11",
        question: "How should the homepage introduce Prayer Tent, Get Connected, Bibles, and baptism?",
        answer: "There will be a get connected section, or post-response section that leads to a full page dedicated for that.",
      },
      {
        id: "6.12",
        question: "What should the support section at the bottom accomplish?",
        answer: "For support. That many hands carry the burden.",
      },
      {
        id: "6.13",
        question: "What should a first-time visitor be able to do without scrolling to the bottom?",
        answer: "Know the vision and mission. Know the identity of the event. Know if they are welcome. Know the practical details. And be aware of the other pages.",
      },
    ],
  },
  {
    section: "Copy & Tone",
    entries: [
      {
        id: "7.1",
        question: "What tone should define the website overall?",
        answer: "Prayer-born, anticipatory, alive, vitality, depth, authenticity. A purity, that it is clean inside and out. Transparency. God is king. Weighty but inviting. Not sugar-coating anything. It needs to be utterly sincere. Down to earth.",
      },
      {
        id: "7.2",
        question: "What tone should the website avoid?",
        answer: "Hype-driven, Overproduced, Megachurch-polished, Detached, Corporate, Conference-like, Festival-like, Corny revival branding, Vague Christian language, Overly casual, Generic 'Christianese' words.",
      },
      {
        id: "7.3",
        question: "Which words and phrases should the copy actively own?",
        answer: "Worship in the Park. Unity. Jesus is King. All are welcome.",
      },
      {
        id: "7.4",
        question: "Which words and phrases should the copy actively avoid?",
        answer: "Festival, concert, show, epic, premium, high-energy, unforgettable, activation, biggest, revival as a guarantee. No hype words. It needs to be grounded in depth and needs to be sincere and down to earth and humble and hold the Fear of the Lord. That God is King and we are not, we are just there to worship Him.",
      },
      {
        id: "7.5",
        question: "How should the site talk about unity across churches?",
        answer: "The Apostles' Creed. To define the beliefs in the Apostles' Creed as what unifies us among denominations and Christians. That we are united. Woven together. The goal is unity within uniqueness, not uniformity. It is harmony, not homogeneousness. Within the foundational bounds of faith in ALL the lines of the Apostles' Creed, the expression might look different, because each human is different.",
      },
      {
        id: "7.6",
        question: "How should the site talk about Jesus directly?",
        answer: "Bring up verses. This is best. Of who He is, what He has done. From the OT, and the Gospels, and Revelation.",
      },
      {
        id: "7.7",
        question: "How should the site handle repentance language?",
        answer: "Mostly share the verse from Chronicles. And just be very sincere like: This is God's word. Do we believe that God will do what He says He will do?",
      },
      {
        id: "7.8",
        question: "Which statements can the website confidently claim as fact today?",
        answer: "Free event, date, location, all-day worship. Unity, harmony.",
      },
      {
        id: "7.9",
        question: "Which themes must be framed as hope rather than guaranteed outcome?",
        answer: "Radically transform your life. Maybe say something like it is possible for God to radically transform your life.",
      },
      {
        id: "7.10",
        question: "What 'Do / Don't' copy rules should guide every page?",
        answer: "The same tone. No hype. The depth under the one vision and north star of the event. The whole website needs to be fantasy.co quality. Unity within uniqueness, not uniformity. Harmony, not homogeneousness.",
      },
      {
        id: "7.11",
        question: "Which tagline territories feel strongest?",
        answer: "Either something about Jesus' death and resurrection, OR maybe the verse talking about the two laws Jesus talks about: to love God and love neighbor.",
      },
      {
        id: "7.12",
        question: "Should the copy feel more like proclamation, invitation, or hosted guidance?",
        answer: "Invitation. Maybe a 2–3 on the scale (mostly invitation and hosted guidance).",
      },
      {
        id: "7.13",
        question: "Where should the copy be plainest?",
        answer: "Event details, FAQ, Schedule.",
      },
      {
        id: "7.14",
        question: "Where should the copy carry the most spiritual and emotional weight?",
        answer: "Vision section, About page / Christianity and worship history in Cochrane.",
      },
    ],
  },
  {
    section: "Visual Direction",
    entries: [
      {
        id: "8.1",
        question: "What visual atmosphere should the site create?",
        answer: "Open-air clarity, communal, grounded, anticipation. The hero background will be a drone shot of the park. A view high above. Maybe a drone montage of Mitford and of Cochrane too so people begin to see visually and have hope of what is possible in Cochrane, from a view that is above: All symbolic.",
      },
      {
        id: "8.2",
        question: "Which visual principles should guide the design?",
        answer: "Prayer-born sincerity, humble, reverent, clarity is key, vision focus, love and unity oriented.",
      },
      {
        id: "8.3",
        question: "What should the site feel like visually?",
        answer: "Reverent, alive, daylit, active, breathable, a balance of depth and of hope.",
      },
      {
        id: "8.4",
        question: "What should the site NOT feel like visually?",
        answer: "Festival poster, Christian concert promo, Conference launch, Corporate church microsite, Luxury brand landing page, Children's event, Overly somber spiritual site, Rustic casual picnic branding, Generic worship stock collage.",
      },
      {
        id: "8.5",
        question: "What color direction feels most right?",
        answer: "White and black. Maybe the colors of blood for Christ's blood. Maybe light blue. White, cream color. NO BLACK BACKGROUND.",
      },
      {
        id: "8.6",
        question: "What typography direction feels most right?",
        answer: "Something unique. Clear for everything being explained. But the more artistic ones like the hero page to use more unique and artistic typography, so it is polarizing and in line with the brand identity.",
      },
      {
        id: "8.7",
        question: "What imagery should the site prioritize?",
        answer: "Outdoor worship in real space, Wide public-space shots, Park environment, Maybe like hands raised blurred from the back.",
      },
      {
        id: "8.8",
        question: "What imagery should be avoided?",
        answer: "Celebrity-style worship leader portraits, One dominant face as the brand, Generic stock hands-in-the-air images, Over-saturated color grading, Stage spectacle imagery, Abstract 'revival' graphics, Overly polished megachurch photos. We are after God's presence, not polish.",
      },
      {
        id: "8.9",
        question: "Interim visual strategy if no original photography exists yet?",
        answer: "AI to make placeholder, or grey placeholders on the website that say placeholder.",
      },
      {
        id: "8.11",
        question: "What should the visual system communicate about shared ownership?",
        answer: "That we are united. Woven together. Unity within uniqueness, not uniformity. Harmony, not homogeneousness. God's glory shows up in all different colors. Like the sky. (Ezekiel 1:28).",
      },
      {
        id: "8.12",
        question: "What should design do to make practical info feel beautiful?",
        answer: "Use principles from world-class agencies like CLAY, or from fantasy.co. Very high-end website.",
      },
      {
        id: "8.13",
        question: "What should the page never visually overemphasize?",
        answer: "Production. Shallowness. Ignorance. One leader, one church. Christ is our king. Never uniformity. But God's glory shows up in all different colors. Like the sky. (Ezekiel 1:28).",
      },
    ],
  },
  {
    section: "Confirmed Details",
    entries: [
      {
        id: "9.1",
        question: "Current confirmed event details",
        answer: "Name: Worship in the Park. Date: August 8th, 2026. Time: 11am–7pm. Location: Mitford Park, Cochrane AB. Cost: Free. Attendance: ALL ARE WELCOME. YOUNG AND OLD. 3-dimensional unity in the sense of the height of generations, the width in denominations and unity between varying depth of faith backgrounds.",
      },
      {
        id: "9.2",
        question: "Which details are fully confirmed today?",
        answer: "August 8, 2026. 11:00 AM to 7:00 PM. Mitford Park, Cochrane, Alberta. Free admission. No ticket required. No attendee pre-registration. Eight worship teams in concept. Prayer Tent. Get Connected Tent. Free Bibles. Baptism presence. Food trucks. Free parking. Washrooms on site. Outdoor tents / weather coverage planned. Pets intended to be allowed. Volunteer age requirement 18+. Volunteers connected to a church. Shift-based volunteer model. Evacuation plan (details pending). Approved by fire hall. Security present. Parking is the Mitford parking lot.",
      },
      {
        id: "9.3",
        question: "Which details are still being finalized?",
        answer: "Final worship team names. Final partner church list. Exact site map. Food truck details. Volunteer workflow. Partnership / sponsorship structure. Emergency / safety guidance.",
      },
      {
        id: "9.4",
        question: "What FAQ questions should the site be ready to answer?",
        answer: "Do I need a ticket? Can I come for only part of the day? Where do I park? Is parking free? Can I bring children? Can I bring a lawn chair or blanket? Will food be available? Are washrooms available? Is the site accessible? What happens if weather changes? Can I bring a pet? Will prayer be available? Can I get baptized? How do I volunteer? How can I support the event? Why now? What is this event about? Who is all helping? What can I expect? What if I do not believe? Who is Jesus? What do people mean when they say worship? What can I expect in the prayer tent? What can I expect in the get connected tent? Do I need to stay the whole time? Why Mitford? Why outdoors? Why multiple churches and unity? Who handles the money and donations coming in? Will there be security? What if it rains? What worship teams? Who is organizing this? How can different denominations come together? What does God say about unity of a city under His true rule, following His laws?",
      },
      {
        id: "9.5",
        question: "What to bring list",
        answer: "Lawn chair, Blanket, Water bottle, Sun protection, Weather layers, Bible, Friends or family, Cash / card for food, Comfortable shoes, Open schedule flexibility, Notebook and pen, Your friends and family, Potentially umbrella if it rains (never know in Cochrane), A towel if you plan to get baptized, Bring your Christian clothing!",
      },
    ],
  },
  {
    section: "Volunteer & Support",
    entries: [
      {
        id: "10.1",
        question: "How should volunteer participation be framed?",
        answer: "Have a form for volunteers to apply and be audited. And for them to explain why they want to volunteer.",
      },
      {
        id: "10.2",
        question: "What should the volunteer page communicate?",
        answer: "How the volunteering will work. Who are the coordinators. What the expectations are. What the boundaries are.",
      },
      {
        id: "10.3",
        question: "What volunteer roles exist?",
        answer: "Setup, takedown, parking, prayer team support, get connected tent, free Bible table, security, greeting, stage hand for tech and worship, other, floater.",
      },
      {
        id: "10.4",
        question: "What fields should the volunteer form include?",
        answer: "Full name, Email, Phone number, Age confirmation, Church connected to, Preferred role, Shift availability, Relevant experience, Prayer ministry experience, Emergency contact, Agreement to culture / expectations, A 'why' do you want to volunteer?, A 'is there anything we should be concerned about with your volunteering?'",
      },
      {
        id: "10.5",
        question: "How should giving be framed?",
        answer: "Just so that there is absolutely no pressure. And that if it is God's idea, then it is His job to sustain it. With people, with help, financially, etc.",
      },
      {
        id: "10.6",
        question: "What budget categories need support?",
        answer: "Stage / sound support, Tents and shelter, Prayer and ministry support, Bible distribution, Volunteer hospitality, Site logistics, General event support, Permits.",
      },
      {
        id: "10.7",
        question: "How should partner, sponsor, and donor be distinguished?",
        answer: "Partner is a church willing to partner with their resources, volunteer — this comes from church leadership. Sponsor is money, maybe a business or church or ministry. Donor is individual person. Volunteer sign-up is individual and can come from any church.",
      },
      {
        id: "10.8",
        question: "Should the site offer a newsletter or email updates?",
        answer: "Yes, an option to send reminders leading up to the event. These emails will have the branding, and the day schedule etc.",
      },
      {
        id: "10.9",
        question: "What should the newsletters contain?",
        answer: "Updates. Prayer points and visioning. Day schedule. Practical reminders. Worship teams that will be there. Some history of worship and Christianity in the town of Cochrane.",
      },
    ],
  },
  {
    section: "Additional Elements",
    entries: [
      {
        id: "11.1",
        question: "What additional site elements are requested?",
        answer: "A kids area with bouncy castles. Baptism in the Bow River. Maybe Levi Switzer doing something at the skate park with his ministry.",
      },
      {
        id: "11.2",
        question: "What trust signals should be on the site?",
        answer: "Clear date/time/location block. No-ticket clarity. Partner church visibility. Worship lineup. Schedule / day-at-a-glance. Practical FAQ. What to bring. Site map. Weather note. Accessibility note. Real contact email. Quotes from local leaders about the event.",
      },
      {
        id: "11.3",
        question: "What content should be included about baptism, Bibles, and the vision?",
        answer: "The baptism. The Bibles. The heart and vision behind it. The impact of unity (like it says in Psalm 133). The spiritual depth of it. The invitation to invite all people, all ages.",
      },
      {
        id: "11.4",
        question: "How should spiritual response and worship diversity be communicated?",
        answer: "However the one and true living God shows Himself to us, we will worship Him for it. Invite spiritual response with verses Paul writes — if you eat, do it for the glory of God, if you fast, do it for the glory of God. God's glory has different expressions of worship. Unity within uniqueness, not uniformity. If we begin to notice specks in others' eyes, then maybe there are planks in our own eyes. Only God can judge the heart. We must only judge our own purity in our own worship.",
      },
      {
        id: "11.5",
        question: "What sharing and distribution channels are planned?",
        answer: "Partner church websites, Church newsletters, Instagram, Facebook, Text sharing, Town of Cochrane event listing, Eventbrite free listing.",
      },
      {
        id: "11.6",
        question: "What shareable content should be available?",
        answer: "Pastor or leader quotes, Worship team list, Short vision statement, Practical FAQ, Site map.",
      },
      {
        id: "11.7",
        question: "What post-event content is planned?",
        answer: "Testimonies, photos, videos. Photos of the actual event.",
      },
      {
        id: "11.8",
        question: "What does long-term success look like?",
        answer: "I hope it becomes a space where people can meet the real and true God. That it is woven into the yearly cycle of Cochrane for all churches to become excited about and to bring vitality and life to Cochrane. Plugging in families to churches.",
      },
      {
        id: "11.9",
        question: "Brand filter test for all decisions",
        answer: "Is it in line with the visions from above. With unity. With sincerity and depth and authenticity.",
      },
      {
        id: "11.10",
        question: "What are the biggest current challenges?",
        answer: "Lack of clarity. No central hub to point everyone to for the info. Not enough volunteers. Need to spread the word. Need to build awareness and anticipation and clarity on the practical details.",
      },
      {
        id: "11.11",
        question: "What does website success look like?",
        answer: "People instantly understand what the event is. Families and all people feel welcome. Volunteers feel easy to sign up. Churches feel easy to reach out and ask questions. The event feels deep and authentic and real. It is clear. The event feels pure and holy and reverent. It is clear that it was sparked from God's hand and is being protected by the fear of the Lord.",
      },
      {
        id: "11.12",
        question: "What does day-one launch success look like?",
        answer: "The page going live and everyone on the organization team feels comfortable sending it to their whole contact lists, to begin to spread the word for volunteers, and for information.",
      },
    ],
  },
];

/**
 * Scripture anchors referenced throughout the questionnaire.
 * These verses serve as theological decision filters.
 */
export const scriptureAnchors = [
  { ref: "2 Chronicles 7:14", theme: "Repentance and healing", usage: "Core vision anchor — if my people turn, God will heal the land" },
  { ref: "Matthew 4:10", theme: "Worship God alone", usage: "Theological center — worship God and Him alone" },
  { ref: "Psalm 133", theme: "Unity", usage: "The impact and beauty of unity" },
  { ref: "Ezekiel 1:28", theme: "God's glory in diversity", usage: "God's glory shows up in all different colors — unity within uniqueness" },
  { ref: "Joel 2:13", theme: "Rend your hearts", usage: "Spiritual posture of humility and repentance" },
] as const;

/**
 * 3-Dimensional Unity concept from the questionnaire.
 * Every decision about audience, messaging, and welcome language should reflect all three dimensions.
 */
export const threeDimensionalUnity = {
  height: "Generations — young and old, children through elders",
  width: "Denominations — unity across church lines through the Apostles' Creed",
  depth: "Faith backgrounds — committed believers, seekers, spiritually curious, no church background",
} as const;

/**
 * Partner churches mentioned so far.
 */
export const partnerChurches = ["KingsGate", "Saint Peters", "Impact Church"] as const;

/**
 * Volunteer form field requirements from the questionnaire.
 */
export const volunteerFormFields = [
  "Full name",
  "Email",
  "Phone number",
  "Age confirmation (18+)",
  "Church connected to",
  "Preferred role",
  "Shift availability",
  "Relevant experience",
  "Prayer ministry experience",
  "Emergency contact",
  "Agreement to culture / expectations",
  "Why do you want to volunteer?",
  "Is there anything we should be concerned about?",
] as const;

/**
 * Volunteer roles confirmed in the questionnaire.
 */
export const volunteerRoles = [
  "Setup",
  "Takedown",
  "Parking",
  "Prayer team support",
  "Get Connected Tent",
  "Free Bible table",
  "Security",
  "Greeting",
  "Stage hand (tech and worship)",
  "Floater",
  "Other",
] as const;
