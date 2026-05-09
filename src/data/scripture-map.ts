/**
 * Scripture Map — Centralized registry of every scripture placement on the site.
 *
 * Cross-references:
 *   - wireframe.ts → page structure
 *   - ux-conversion-map.ts → psychological purpose of each section
 *   - persona-registry.ts → voice and copy guidelines
 *   - christian-design-philosophy.ts → visual design principles
 *
 * Rules:
 *   1. One verse per page/section maximum
 *   2. No verse repeated more than twice across the entire site
 *   3. NIV unless noted otherwise
 *   4. Each verse must reinforce the AIDA stage of its section
 */

export type ScriptureVariant = "whisper" | "anchor" | "inline";
export type Translation = "NIV" | "NLT" | "KJV";

export interface ScriptureEntry {
  path: string;
  section?: string;
  verse: string;
  reference: string;
  translation: Translation;
  variant: ScriptureVariant;
  /** Exegetical commentary: original context, why chosen, how it connects to the site's theological narrative. */
  theology: string;
}

export const SCRIPTURE_MAP: ScriptureEntry[] = [
  // ─── HOME PAGE (/) ────────────────────────────────────────────────────

  {
    path: "/",
    section: "VeilIntro",
    verse: "At that moment the curtain of the temple was torn in two from top to bottom.",
    reference: "Matthew 27:51",
    translation: "NIV",
    variant: "anchor",
    theology:
      "The tearing of the temple veil (60 feet tall, woven thick) signified the end of separation between God and humanity. In the temple system, only the High Priest could enter God's presence once a year. Christ's death opened access for all. This verse anchors the veil animation in atonement theology — the user literally watches the barrier between them and God tear open.",
  },
  {
    path: "/",
    section: "Hero",
    verse: "If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.",
    reference: "2 Chronicles 7:14",
    translation: "NIV",
    variant: "anchor",
    theology:
      "God's response to Solomon after the temple dedication. The four conditions (humble, pray, seek, turn) are not individual self-help steps but a corporate call to national repentance. This verse is the theological foundation of the entire event — Cochrane's churches humbling themselves together in public prayer. It is a covenant promise: if the people respond, then God will act.",
  },
  {
    path: "/",
    section: "WhatThisIsNot",
    verse: "God is spirit, and his worshipers must worship in the Spirit and in truth.",
    reference: "John 4:24",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Jesus speaking to the Samaritan woman at the well — a theological outsider. He dismantles the idea that worship requires a specific location (Jerusalem or Mount Gerizim) and redefines it as Spirit-driven and truth-anchored. This verse validates the 'not a concert, not a program' declarations: worship is not a format; it is an orientation of the heart toward God.",
  },
  {
    path: "/",
    section: "VisionTease",
    verse: "For where two or three gather in my name, there am I with them.",
    reference: "Matthew 18:20",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Often trivialized as 'Jesus shows up at small groups,' this verse actually concludes a passage about church discipline and communal discernment (Matt 18:15–20). The 'gathering in my name' is not casual — it means gathering under Christ's authority for His purposes. This reframes the event as Christ-initiated, not humanly organized.",
  },
  {
    path: "/",
    section: "WhatToExpect",
    verse: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.",
    reference: "Acts 2:42",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Luke's summary of the first church community after Pentecost. The four devotions (teaching, fellowship, breaking bread, prayer) are not a program but a description of Spirit-filled community. Each maps to an element of the event: worship/teaching, the gathering itself, food trucks and communion, and the Prayer Tent.",
  },
  {
    path: "/",
    section: "ChurchesTogether",
    verse: "Make every effort to keep the unity of the Spirit through the bond of peace.",
    reference: "Ephesians 4:3",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Paul's imperative to the Ephesian church. 'Make every effort' (Greek: spoudazontes) implies urgency and intentional labor — unity does not happen passively. 'The bond of peace' connects unity to shalom, the Hebrew concept of comprehensive wholeness. This verse frames inter-church cooperation as obedience, not preference.",
  },
  {
    path: "/",
    section: "CrossInterstitial",
    verse: "He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness.",
    reference: "1 Peter 2:24",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Peter writing to persecuted believers scattered across Asia Minor. 'Bore our sins in his body on the cross' echoes Isaiah 53 (the Suffering Servant). The verse pairs substitutionary atonement ('bore our sins') with its purpose ('that we might die to sins and live for righteousness'). Placed over the cross image, it connects the visual symbol to its theological meaning.",
  },
  {
    path: "/",
    section: "SchedulePreview",
    verse: "From the rising of the sun to the place where it sets, the name of the Lord is to be praised.",
    reference: "Psalm 113:3",
    translation: "NIV",
    variant: "whisper",
    theology:
      "A Hallel psalm sung at Jewish festivals. 'From the rising of the sun to the place where it sets' describes all-day, continuous praise — precisely the structure of this event (11 AM to 7 PM). It roots the event's format in ancient worship practice, not modern event design.",
  },
  {
    path: "/",
    section: "BeforeYouCome",
    verse: "The earth is the Lord's, and everything in it, the world, and all who live in it.",
    reference: "Psalm 24:1",
    translation: "NIV",
    variant: "whisper",
    theology:
      "A royal psalm of David. 'The earth is the Lord's' grounds the logistics section in theology of place — God owns Mitford Park, the parking lots, the food trucks. Practical preparation becomes stewardship of God's land, not consumer logistics. The verse frames 'before you come' as entering holy ground.",
  },
  // Saint quotes on homepage (PullQuote components, not ScriptureWhisper):
  // - WhatThisIsNot: Dietrich Bonhoeffer, "The Church is the Church only when it exists for others." (Letters and Papers from Prison)
  // - ChurchesTogether: John Chrysostom, "Though we are many, we are one body, because we all share in one bread." (Homily on 1 Corinthians)
  // - NavGrid: Augustine, "You have made us for yourself, O Lord, and our hearts are restless until they rest in you." (Confessions)
  {
    path: "/",
    section: "ScriptureWhisper",
    verse: "How good and pleasant it is when God's people live together in unity.",
    reference: "Psalm 133:1",
    translation: "NIV",
    variant: "whisper",
    theology:
      "A Song of Ascents, sung by pilgrims traveling to Jerusalem for festivals. 'God's people live together in unity' described the physical experience of diverse tribes gathering in one place for worship — exactly what Worship in the Park recreates. The psalm's brevity and simplicity match the whisper treatment.",
  },
  {
    path: "/",
    section: "YouAreInvited",
    verse: "The Spirit and the bride say, 'Come!' And let the one who hears say, 'Come!' Whoever is thirsty, let them come.",
    reference: "Revelation 22:17",
    translation: "NIV",
    variant: "anchor",
    theology:
      "The final invitation in all of Scripture. The Spirit (God), the bride (the Church), and the individual hearer all echo the same word: 'Come!' This is not human marketing — it is the cosmic invitation that closes the entire biblical narrative. Placing it at the site's final CTA section aligns the user's scroll journey with the Bible's own narrative arc.",
  },

  // ─── HUB PAGES ────────────────────────────────────────────────────────

  {
    path: "/day-details",
    verse: "This is the day the Lord has made; let us rejoice and be glad in it.",
    reference: "Psalm 118:24",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Part of the Hallel liturgy, traditionally sung at Passover and Tabernacles. 'This is the day' is not generic positivity — it refers to the day God has acted decisively in history. Applied to the event, it frames August 8 as a day set apart by God, not merely organized by humans.",
  },
  {
    path: "/vision",
    verse: "Where there is no vision, the people perish.",
    reference: "Proverbs 29:18a",
    translation: "KJV",
    variant: "whisper",
    theology:
      "The Hebrew chazon (vision) means prophetic revelation — God-given direction, not human strategic planning. 'The people perish' (Hebrew: para) means they become ungoverned, scattered, directionless. The KJV is used deliberately because this phrasing has become canonical in English-speaking church culture.",
  },
  {
    path: "/support",
    verse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    reference: "2 Corinthians 9:7",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Paul writing to Corinth about the collection for Jerusalem's impoverished church. 'Not reluctantly or under compulsion' directly counters manipulative fundraising. 'God loves a cheerful giver' (Greek: hilaron — root of 'hilarious') describes joyful, voluntary generosity. This verse sets the tone for all support: willing, not guilted.",
  },
  {
    path: "/faith",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Jesus speaking during a period of rejection — John the Baptist questioned Him, cities refused to repent. Into that context, He offers rest to 'all who are weary and burdened.' The invitation is unconditional and comes from Christ himself, not from the church. This positions the faith section as Jesus' invitation, not a human recruitment effort.",
  },

  // ─── VISION SUBPAGES ──────────────────────────────────────────────────

  {
    path: "/vision/mission",
    verse: "If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.",
    reference: "2 Chronicles 7:14",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Repeated here as the canonical home of the founding verse — the Mission page is where the full theological argument is made. (See Hero commentary for full exegesis.)",
  },
  {
    path: "/vision/unity",
    verse: "I in them and you in me — so that they may be brought to complete unity. Then the world will know that you sent me.",
    reference: "John 17:23",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Jesus' High Priestly Prayer, spoken hours before His crucifixion. 'Complete unity' is not organizational merger but relational oneness modeled on the Trinity ('I in them and you in me'). The purpose of unity is missional: 'Then the world will know.' This verse makes visible unity an evangelistic act, not merely an ecumenical nicety.",
  },
  {
    path: "/vision/church-history",
    verse: "Remember the days of old; consider the generations long past.",
    reference: "Deuteronomy 32:7",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Moses' final song to Israel before entering the Promised Land. 'Remember the days of old' is a command to root present action in generational faithfulness. It frames Cochrane's church history not as nostalgia but as covenant continuity.",
  },
  {
    path: "/vision/partners",
    verse: "There is one body and one Spirit, just as you were called to one hope when you were called — one Lord, one faith, one baptism.",
    reference: "Ephesians 4:4–5",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Paul's seven 'ones' — one body, one Spirit, one hope, one Lord, one faith, one baptism. This is the doctrinal basis for Christian unity: not that churches agree on everything, but that they share the essential confession. It validates denominational diversity while affirming core orthodoxy.",
  },

  // ─── SUPPORT SUBPAGES ─────────────────────────────────────────────────

  {
    path: "/support/volunteer",
    verse: "Whatever you do, work at it with all your heart, as working for the Lord.",
    reference: "Colossians 3:23",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Paul writing to slaves in Colossae — people doing unglamorous work under compulsion. 'As working for the Lord' reframes all labor as worship. Applied to event volunteering (parking, setup, cleanup), it dignifies practical service as sacred.",
  },
  {
    path: "/support/church-partner",
    verse: "From him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work.",
    reference: "Ephesians 4:16",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Paul's Body of Christ metaphor at its most anatomical — 'every supporting ligament' makes each church a necessary structural component, not an optional participant. 'Grows and builds itself up in love' shows that the body's health depends on every part functioning.",
  },
  {
    path: "/support/donate",
    verse: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
    reference: "Philippians 4:19",
    translation: "NIV",
    variant: "whisper",
    theology:
      "Paul thanking the Philippian church for their financial gift. 'My God will meet all your needs' is not a prosperity promise — it is Paul's assurance that God honors sacrificial generosity by providing for the giver's needs. It frames donation as partnership with God's provision, not as loss.",
  },
  {
    path: "/support/prayer",
    verse: "The prayer of a righteous person is powerful and effective.",
    reference: "James 5:16b",
    translation: "NIV",
    variant: "anchor",
    theology:
      "James writing to scattered Jewish Christians. 'Powerful and effective' (Greek: energoumene — 'energized') means prayer that actually accomplishes things in the real world. This validates prayer as real action — not lesser support than money or time.",
  },

  // ─── FAITH SUBPAGES ───────────────────────────────────────────────────

  {
    path: "/faith/get-connected",
    verse: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.",
    reference: "Hebrews 10:24–25",
    translation: "NIV",
    variant: "whisper",
    theology:
      "The author of Hebrews addressing believers tempted to withdraw from community during persecution. 'Not giving up meeting together' acknowledges that connecting takes courage. 'Spur one another on' frames church involvement as mutual encouragement, not institutional obligation.",
  },
  {
    path: "/faith/questions",
    verse: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
    reference: "Matthew 7:7",
    translation: "NIV",
    variant: "anchor",
    theology:
      "From the Sermon on the Mount — Jesus' most extended teaching block. 'Ask… seek… knock' uses three escalating verbs to validate persistent inquiry. The grammar (present imperative) means 'keep asking, keep seeking, keep knocking.' Doubt is not a failure of faith; it is the beginning of deeper faith.",
  },
  {
    path: "/faith/contact-pastor",
    verse: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
    translation: "NIV",
    variant: "anchor",
    theology:
      "Peter writing to persecuted church elders. 'Cast all your anxiety' (Greek: epiripsantes — to throw forcefully) is not passive. It requires the act of releasing control. 'Because he cares for you' is the ground of courage: you can reach out because God already cares.",
  },

  // ─── DAY DETAILS SUBPAGES ─────────────────────────────────────────────

  {
    path: "/day-details/weather",
    verse: "He calms the storm to a whisper; the waves of the sea are hushed.",
    reference: "Psalm 107:29",
    translation: "NIV",
    variant: "whisper",
    theology:
      "A thanksgiving psalm recounting God's deliverances. The 'storm to a whisper' language acknowledges real danger while affirming God's sovereignty. Applied to an outdoor event, it validates the weather concern while pointing to the One who governs it.",
  },
  {
    path: "/day-details/accessibility",
    verse: "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.",
    reference: "Matthew 25:40",
    translation: "NIV",
    variant: "whisper",
    theology:
      "From the Sheep and Goats judgment parable. 'The least of these' is not sentimental — it is eschatological. Jesus identifies Himself with the vulnerable: serving them is serving Christ. Accessibility is not compliance; it is Christology in practice.",
  },

  // ─── UTILITY PAGES ────────────────────────────────────────────────────

  {
    path: "/contact",
    verse: "Let us then approach God's throne of grace with confidence.",
    reference: "Hebrews 4:16a",
    translation: "NIV",
    variant: "whisper",
    theology:
      "'The throne of grace' is the mercy seat — the place in the Holy of Holies where God's presence dwelt. 'With confidence' (Greek: parresia — bold, open speech) means you do not need to approach God (or His people) timidly. This encourages visitors to reach out without shame.",
  },
  {
    path: "/testimony",
    verse: "They triumphed over him by the blood of the Lamb and by the word of their testimony.",
    reference: "Revelation 12:11",
    translation: "NIV",
    variant: "anchor",
    theology:
      "The heavenly declaration about the saints who overcome Satan. 'The word of their testimony' is not a church program — it is spiritual warfare. Sharing what God has done is an act of cosmic significance. This elevates the testimony form from 'feedback' to spiritual declaration.",
  },

  // ─── FOOTER ────────────────────────────────────────────────────────────

  {
    path: "*",
    section: "Footer",
    verse: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength… Love your neighbor as yourself.",
    reference: "Mark 12:30–31",
    translation: "NIV",
    variant: "inline",
    theology:
      "Jesus' answer to 'what is the greatest commandment?' — the Shema (Deuteronomy 6:4–5) combined with Leviticus 19:18. Love of God and love of neighbor are inseparable. As the last words on every page, this verse functions as a benediction — the final word the visitor carries with them.",
  },
];
