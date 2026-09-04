// Generated from the approved BPOS console mockup. Seven industries,
// five modules each. Module names and KPI labels come from the real portals:
// Yates, Preferred, Whitmore Vance, RJS, 1100 Group, Circa, Rosemont.
export type Stat = [dot: string, label: string, value: string, sub: string];
export type Row = [code: string, issue: string, n: number, action: string, blocker: number];
export interface Mod { nav: string; crumb: string; title: string; sub: string; cta: string;
  hero: [string, string, string, string]; stats: Stat[]; unit: string; rows: Row[];
  more: number; pills: [string, string, string]; }
export interface Industry { id: string; name: string;
  steps: [string, string, string][]; lock: [string, string]; mods: Mod[]; }

export const BPOS_INDUSTRIES: Industry[] = [
  {
    "id": "construction",
    "name": "Construction",
    "steps": [
      [
        "Job costs brought in",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "20 open"
      ],
      [
        "Post the month close",
        "lock",
        "locked by 2 blockers"
      ],
      [
        "Check the numbers",
        "num",
        "after close"
      ],
      [
        "Send owner billing",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "2 blockers on the worklist are holding the close. Warnings don't block, but the blockers must go."
    ],
    "mods": [
      {
        "nav": "Jobs",
        "crumb": "Jobs / This week",
        "title": "Job costs · Week ending Jun 20th",
        "sub": "Everything standing between this week and the month-end close.",
        "cta": "Import job costs",
        "hero": [
          "Cost to complete",
          "$14.2M",
          "across 9 active jobs · 3 tracking over bid",
          "Review the jobs"
        ],
        "stats": [
          [
            "",
            "Invoices imported",
            "2,431",
            "From your accounting system · automatic"
          ],
          [
            "r",
            "Blockers",
            "2",
            "Must fix to close"
          ],
          [
            "",
            "Close in",
            "4 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "18",
            "Worth a look"
          ]
        ],
        "unit": "Jobs",
        "rows": [
          [
            "RIVERSIDE-04",
            "Change order still unpriced",
            3,
            "Resolve",
            1
          ],
          [
            "CEDAR-11",
            "Cost-to-complete over bid",
            1,
            "Review",
            0
          ],
          [
            "HARBOR-02",
            "Retainage past due",
            1,
            "Review",
            0
          ],
          [
            "MIDTOWN-07",
            "Certified payroll missing",
            2,
            "Review",
            0
          ],
          [
            "ASHLAND-01",
            "Lien waiver not returned",
            1,
            "Review",
            0
          ],
          [
            "RIVERSIDE-04",
            "Sub insurance lapsed",
            1,
            "Review",
            0
          ]
        ],
        "more": 14,
        "pills": [
          "All 20",
          "2 blockers",
          "18 warnings"
        ]
      },
      {
        "nav": "Bids",
        "crumb": "Bids / Open board",
        "title": "Bid board · Week ending Jun 20th",
        "sub": "Everything in the market right now, and what is missing to bid it.",
        "cta": "Upload drawings",
        "hero": [
          "Open bid value",
          "$126M",
          "across 18 bids · 5 due this week",
          "Review the board"
        ],
        "stats": [
          [
            "",
            "Documents read",
            "1,908",
            "Drawings, specs and addenda · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to bid"
          ],
          [
            "",
            "Next due",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "9",
            "Worth a look"
          ]
        ],
        "unit": "Bids",
        "rows": [
          [
            "HARBOR-02",
            "Addendum 3 unread",
            1,
            "Resolve",
            1
          ],
          [
            "ASHLAND-01",
            "Scope gap in Division 9",
            1,
            "Review",
            0
          ],
          [
            "MIDTOWN-07",
            "Sub coverage thin",
            2,
            "Review",
            0
          ],
          [
            "CEDAR-11",
            "Allowance not carried",
            1,
            "Review",
            0
          ],
          [
            "RIVERSIDE-04",
            "Alternate not priced",
            1,
            "Review",
            0
          ],
          [
            "HARBOR-02",
            "Bid bond outstanding",
            1,
            "Review",
            0
          ]
        ],
        "more": 4,
        "pills": [
          "All 10",
          "1 blocker",
          "9 warnings"
        ]
      },
      {
        "nav": "Budget",
        "crumb": "Budget / This week",
        "title": "Budget vs actual · Week ending Jun 20th",
        "sub": "Where the money went, and what it will take to finish.",
        "cta": "Refresh forecast",
        "hero": [
          "Cost to complete",
          "$14.2M",
          "budget $72.8M · committed $58.1M",
          "Review the forecast"
        ],
        "stats": [
          [
            "",
            "Cost lines synced",
            "18,240",
            "From your accounting system · automatic"
          ],
          [
            "r",
            "Blockers",
            "2",
            "Must fix to forecast"
          ],
          [
            "",
            "Variance",
            "-1.8%",
            "Against budget"
          ],
          [
            "g",
            "Warnings",
            "11",
            "Worth a look"
          ]
        ],
        "unit": "Jobs",
        "rows": [
          [
            "RIVERSIDE-04",
            "Change order still unpriced",
            3,
            "Resolve",
            1
          ],
          [
            "CEDAR-11",
            "Forecast not refreshed",
            1,
            "Resolve",
            1
          ],
          [
            "HARBOR-02",
            "Contingency below 3%",
            1,
            "Review",
            0
          ],
          [
            "MIDTOWN-07",
            "Labor burn above plan",
            1,
            "Review",
            0
          ],
          [
            "ASHLAND-01",
            "Material escalation unbooked",
            1,
            "Review",
            0
          ],
          [
            "CEDAR-11",
            "Owner allowance overspent",
            1,
            "Review",
            0
          ]
        ],
        "more": 7,
        "pills": [
          "All 13",
          "2 blockers",
          "11 warnings"
        ]
      },
      {
        "nav": "Billing",
        "crumb": "Billing / This week",
        "title": "Pay applications · Week ending Jun 20th",
        "sub": "Everything standing between this month and getting paid.",
        "cta": "Generate pay apps",
        "hero": [
          "Billed to date",
          "$57.9M",
          "retainage held $1.9M · over-billed $820K",
          "Review the billing"
        ],
        "stats": [
          [
            "",
            "Pay apps drafted",
            "34",
            "From job costs · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to submit"
          ],
          [
            "",
            "Submission in",
            "3 days",
            "Thursday, Jun 26"
          ],
          [
            "g",
            "Warnings",
            "12",
            "Worth a look"
          ]
        ],
        "unit": "Jobs",
        "rows": [
          [
            "CEDAR-11",
            "Pay app 14 unsigned",
            1,
            "Resolve",
            1
          ],
          [
            "ASHLAND-01",
            "Lien waiver not returned",
            1,
            "Review",
            0
          ],
          [
            "HARBOR-02",
            "Retainage past due",
            1,
            "Review",
            0
          ],
          [
            "MIDTOWN-07",
            "Stored materials unsupported",
            2,
            "Review",
            0
          ],
          [
            "RIVERSIDE-04",
            "AR past 60 days",
            1,
            "Review",
            0
          ],
          [
            "CEDAR-11",
            "Backup missing for CO 7",
            1,
            "Review",
            0
          ]
        ],
        "more": 6,
        "pills": [
          "All 12",
          "1 blocker",
          "12 warnings"
        ]
      },
      {
        "nav": "Manpower",
        "crumb": "Manpower / This week",
        "title": "Crews & timesheets · Week ending Jun 20th",
        "sub": "Who worked where, and what expires before they can.",
        "cta": "Import timesheets",
        "hero": [
          "Hours this week",
          "16,480",
          "across 412 people · overtime 7.2%",
          "Review the crews"
        ],
        "stats": [
          [
            "",
            "Timesheets in",
            "398",
            "From the field · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run payroll"
          ],
          [
            "",
            "Payroll in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "8",
            "Worth a look"
          ]
        ],
        "unit": "Crews",
        "rows": [
          [
            "MIDTOWN-07",
            "Certified payroll missing",
            2,
            "Resolve",
            1
          ],
          [
            "FLEET",
            "5 certifications lapse in 30 days",
            5,
            "Review",
            0
          ],
          [
            "RIVERSIDE-04",
            "Crew over-allocated",
            1,
            "Review",
            0
          ],
          [
            "CEDAR-11",
            "Overtime above threshold",
            1,
            "Review",
            0
          ],
          [
            "ASHLAND-01",
            "Timesheet unapproved",
            3,
            "Review",
            0
          ],
          [
            "HARBOR-02",
            "Prevailing wage class wrong",
            1,
            "Review",
            0
          ]
        ],
        "more": 3,
        "pills": [
          "All 9",
          "1 blocker",
          "8 warnings"
        ]
      }
    ]
  },
  {
    "id": "realestate",
    "name": "Real estate",
    "steps": [
      [
        "Data rooms synced",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "10 open"
      ],
      [
        "Generate the IC memo",
        "lock",
        "locked by 1 blocker"
      ],
      [
        "Review returns",
        "num",
        "after memo"
      ],
      [
        "Send to committee",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "1 blocker on the worklist is holding the memo. Warnings don't block, but the blocker must go."
    ],
    "mods": [
      {
        "nav": "Portfolio",
        "crumb": "Portfolio / This week",
        "title": "Portfolio Command · Week ending Jun 20th",
        "sub": "Every asset, live off actuals rather than last quarter's board deck.",
        "cta": "Refresh actuals",
        "hero": [
          "Portfolio value",
          "$684M",
          "across 18 assets · occupancy 93.4%",
          "Review the portfolio"
        ],
        "stats": [
          [
            "",
            "Statements ingested",
            "1,204",
            "From property accounting · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to report"
          ],
          [
            "",
            "Board pack in",
            "6 days",
            "Tuesday, Jul 1"
          ],
          [
            "g",
            "Warnings",
            "8",
            "Worth a look"
          ]
        ],
        "unit": "Assets",
        "rows": [
          [
            "PAINTEDSKY",
            "Occupancy down 240 bps",
            1,
            "Resolve",
            1
          ],
          [
            "WOODSCRSS",
            "Insurance renewal in 30 days",
            1,
            "Review",
            0
          ],
          [
            "MAGNOLIA",
            "Tax reassessment pending",
            1,
            "Review",
            0
          ],
          [
            "CEDARRDG",
            "CapEx over budget",
            1,
            "Review",
            0
          ],
          [
            "HALTOM",
            "Delinquency above 4%",
            1,
            "Review",
            0
          ],
          [
            "SAVOY",
            "Payroll variance unexplained",
            1,
            "Review",
            0
          ]
        ],
        "more": 5,
        "pills": [
          "All 11",
          "1 blocker",
          "8 warnings"
        ]
      },
      {
        "nav": "Asset Books",
        "crumb": "Portfolio / Asset Books",
        "title": "Asset Books · Week ending Jun 20th",
        "sub": "One book per property, rebuilt from actuals every night.",
        "cta": "Rebuild the books",
        "hero": [
          "Books live",
          "18",
          "refreshed nightly · budget variance +2.1%",
          "Open an Asset Book"
        ],
        "stats": [
          [
            "",
            "Documents behind the books",
            "8,940",
            "Leases, statements, invoices · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to publish"
          ],
          [
            "",
            "Next rebuild",
            "Tonight",
            "02:00 local"
          ],
          [
            "g",
            "Warnings",
            "6",
            "Worth a look"
          ]
        ],
        "unit": "Assets",
        "rows": [
          [
            "MAGNOLIA",
            "Rent roll missing two months",
            2,
            "Resolve",
            1
          ],
          [
            "CEDARRDG",
            "T-12 and rent roll disagree",
            1,
            "Review",
            0
          ],
          [
            "WOODSCRSS",
            "CapEx coded to opex",
            1,
            "Review",
            0
          ],
          [
            "PAINTEDSKY",
            "Concession schedule stale",
            1,
            "Review",
            0
          ],
          [
            "SAVOY",
            "Management fee mismatch",
            1,
            "Review",
            0
          ],
          [
            "HALTOM",
            "Unit mix out of date",
            1,
            "Review",
            0
          ]
        ],
        "more": 3,
        "pills": [
          "All 9",
          "1 blocker",
          "6 warnings"
        ]
      },
      {
        "nav": "Underwriting",
        "crumb": "Underwriting / This week",
        "title": "Underwriting workbench · Week ending Jun 20th",
        "sub": "Everything standing between these deals and Thursday's committee.",
        "cta": "Upload an OM",
        "hero": [
          "In underwriting",
          "$284M",
          "across 11 deals · 2 going to IC this week",
          "Review the deals"
        ],
        "stats": [
          [
            "",
            "Documents ingested",
            "6,412",
            "From the data rooms · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run"
          ],
          [
            "",
            "Committee in",
            "3 days",
            "Thursday, Jun 26"
          ],
          [
            "g",
            "Warnings",
            "9",
            "Worth a look"
          ]
        ],
        "unit": "Deals",
        "rows": [
          [
            "MAGNOLIA",
            "Rent roll missing two months",
            2,
            "Resolve",
            1
          ],
          [
            "CEDARRDG",
            "Exit cap below buy-box policy",
            1,
            "Review",
            0
          ],
          [
            "PAINTEDSKY",
            "T-12 and rent roll disagree",
            1,
            "Review",
            0
          ],
          [
            "WOODSCRSS",
            "Insurance quote not received",
            1,
            "Review",
            0
          ],
          [
            "MAGNOLIA",
            "Tax reassessment not modelled",
            1,
            "Review",
            0
          ],
          [
            "HALTOM",
            "Sponsor track record incomplete",
            1,
            "Review",
            0
          ]
        ],
        "more": 4,
        "pills": [
          "All 10",
          "1 blocker",
          "9 warnings"
        ]
      },
      {
        "nav": "Distributions",
        "crumb": "Investors / This quarter",
        "title": "Distributions & waterfall · Q3",
        "sub": "Everything standing between this quarter and money reaching LPs.",
        "cta": "Run the waterfall",
        "hero": [
          "Q3 distributions",
          "$2.1M",
          "across 84 LPs · preferred return current",
          "Review the run"
        ],
        "stats": [
          [
            "",
            "Positions reconciled",
            "1,860",
            "From the cap table · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to distribute"
          ],
          [
            "",
            "Wires in",
            "4 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "7",
            "Worth a look"
          ]
        ],
        "unit": "LPs",
        "rows": [
          [
            "LP-118",
            "Wire instructions changed",
            1,
            "Resolve",
            1
          ],
          [
            "LP-042",
            "K-1 data incomplete",
            1,
            "Review",
            0
          ],
          [
            "LP-207",
            "Accredited status expired",
            1,
            "Review",
            0
          ],
          [
            "MAGNOLIA",
            "Waterfall tier boundary crossed",
            1,
            "Review",
            0
          ],
          [
            "LP-091",
            "Capital call unfunded",
            1,
            "Review",
            0
          ],
          [
            "LP-155",
            "Statement bounced back",
            1,
            "Review",
            0
          ]
        ],
        "more": 3,
        "pills": [
          "All 9",
          "1 blocker",
          "7 warnings"
        ]
      },
      {
        "nav": "Comps",
        "crumb": "Research / Markets",
        "title": "Sale & rent comps · Week ending Jun 20th",
        "sub": "What the market did this week, and which of it we can trust.",
        "cta": "Refresh comps",
        "hero": [
          "MSAs tracked",
          "29",
          "1,240 sale comps · 3,880 rent comps",
          "Review the markets"
        ],
        "stats": [
          [
            "",
            "Comps refreshed",
            "842",
            "From listings and county records · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to score"
          ],
          [
            "",
            "Rankings rebuild",
            "Tonight",
            "02:00 local"
          ],
          [
            "g",
            "Warnings",
            "5",
            "Worth a look"
          ]
        ],
        "unit": "Markets",
        "rows": [
          [
            "BOISE",
            "Comp set too thin to score",
            1,
            "Resolve",
            1
          ],
          [
            "HALTOM",
            "Rents stale past 90 days",
            1,
            "Review",
            0
          ],
          [
            "SLC",
            "New closing recorded",
            1,
            "Review",
            0
          ],
          [
            "DFW",
            "Cap rate outside range",
            1,
            "Review",
            0
          ],
          [
            "PHX",
            "Permit data not refreshed",
            1,
            "Review",
            0
          ],
          [
            "BOISE",
            "Employment series revised",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "5 warnings"
        ]
      }
    ]
  },
  {
    "id": "legal",
    "name": "Legal",
    "steps": [
      [
        "Time captured",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "15 open"
      ],
      [
        "Run the prebills",
        "lock",
        "locked by 1 blocker"
      ],
      [
        "Partner review",
        "num",
        "after run"
      ],
      [
        "Send invoices",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "1 blocker on the worklist is holding the prebills. Warnings don't block, but the blocker must go."
    ],
    "mods": [
      {
        "nav": "Matters",
        "crumb": "Matters / This week",
        "title": "Firm dashboard · Week ending Jun 20th",
        "sub": "Every open matter, and what is at risk this week.",
        "cta": "Open a matter",
        "hero": [
          "Work in progress",
          "$1.2M",
          "across 61 open matters · realization 88%",
          "Review the matters"
        ],
        "stats": [
          [
            "",
            "Documents indexed",
            "124,800",
            "From the DMS · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to bill"
          ],
          [
            "",
            "Bill run in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "12",
            "Worth a look"
          ]
        ],
        "unit": "Matters",
        "rows": [
          [
            "KESSLER-02",
            "Conflict check unresolved",
            1,
            "Resolve",
            1
          ],
          [
            "DELMAR-04",
            "Filing deadline in 3 days",
            1,
            "Review",
            0
          ],
          [
            "ORTEGA-11",
            "Matter over budget",
            1,
            "Review",
            0
          ],
          [
            "BAYCO-07",
            "No activity in 45 days",
            1,
            "Review",
            0
          ],
          [
            "NORTHWIND",
            "Staffing above matter plan",
            2,
            "Review",
            0
          ],
          [
            "KESSLER-02",
            "Document hold not lifted",
            1,
            "Review",
            0
          ]
        ],
        "more": 7,
        "pills": [
          "All 13",
          "1 blocker",
          "12 warnings"
        ]
      },
      {
        "nav": "Intake",
        "crumb": "Intake / This week",
        "title": "Intake & conflicts · Week ending Jun 20th",
        "sub": "Everything standing between a new client and an open matter.",
        "cta": "New intake",
        "hero": [
          "Parties screened",
          "4,100",
          "across 12 new intakes · 1 conflict flagged",
          "Review the intakes"
        ],
        "stats": [
          [
            "",
            "Screens run",
            "12",
            "Against every matter ever run · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to open"
          ],
          [
            "",
            "Turnaround",
            "4 hrs",
            "Average this week"
          ],
          [
            "g",
            "Warnings",
            "5",
            "Worth a look"
          ]
        ],
        "unit": "Intakes",
        "rows": [
          [
            "KESSLER-02",
            "Conflict check unresolved",
            1,
            "Resolve",
            1
          ],
          [
            "BAYCO-07",
            "Engagement letter unsigned",
            1,
            "Review",
            0
          ],
          [
            "NORTHWIND",
            "Client entity unverified",
            1,
            "Review",
            0
          ],
          [
            "DELMAR-04",
            "Rate schedule not agreed",
            1,
            "Review",
            0
          ],
          [
            "ORTEGA-11",
            "Beneficial owner unknown",
            1,
            "Review",
            0
          ],
          [
            "BAYCO-07",
            "Retainer not received",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "5 warnings"
        ]
      },
      {
        "nav": "Billing",
        "crumb": "Billing / This week",
        "title": "Billing & collections · Week ending Jun 20th",
        "sub": "Everything standing between this run and invoices going out Friday.",
        "cta": "Import time",
        "hero": [
          "Unbilled time",
          "$412,900",
          "across 61 matters · nothing sent yet",
          "Review the run"
        ],
        "stats": [
          [
            "",
            "Time entries captured",
            "8,204",
            "From practice management · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run"
          ],
          [
            "",
            "Invoices in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "14",
            "Worth a look"
          ]
        ],
        "unit": "Matters",
        "rows": [
          [
            "NORTHWIND",
            "Rate not on the OCG schedule",
            2,
            "Resolve",
            1
          ],
          [
            "BAYCO-07",
            "Time entries missing narrative",
            3,
            "Review",
            0
          ],
          [
            "DELMAR-04",
            "Write-off above threshold",
            1,
            "Review",
            0
          ],
          [
            "ORTEGA-11",
            "Lockup past 90 days",
            1,
            "Review",
            0
          ],
          [
            "KESSLER-02",
            "Disbursement uncoded",
            1,
            "Review",
            0
          ],
          [
            "NORTHWIND",
            "Discount not applied",
            1,
            "Review",
            0
          ]
        ],
        "more": 6,
        "pills": [
          "All 15",
          "1 blocker",
          "14 warnings"
        ]
      },
      {
        "nav": "Budget",
        "crumb": "Budget / This week",
        "title": "Matter budgets & AFAs · Week ending Jun 20th",
        "sub": "Which fee arrangements are about to stop being profitable.",
        "cta": "Refresh budgets",
        "hero": [
          "Fee at risk",
          "$88,000",
          "across 19 matters on alternative fees",
          "Review the budgets"
        ],
        "stats": [
          [
            "",
            "Budgets refreshed",
            "19",
            "Against posted time · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to invoice"
          ],
          [
            "",
            "Budget to actual",
            "96%",
            "Across the AFA book"
          ],
          [
            "g",
            "Warnings",
            "6",
            "Worth a look"
          ]
        ],
        "unit": "Matters",
        "rows": [
          [
            "KESSLER-02",
            "AFA cap nearly reached",
            1,
            "Resolve",
            1
          ],
          [
            "ORTEGA-11",
            "Phase over budget",
            1,
            "Review",
            0
          ],
          [
            "BAYCO-07",
            "Estimate not refreshed",
            1,
            "Review",
            0
          ],
          [
            "NORTHWIND",
            "Scope change unbilled",
            1,
            "Review",
            0
          ],
          [
            "DELMAR-04",
            "Budget never approved",
            1,
            "Review",
            0
          ],
          [
            "ORTEGA-11",
            "Task code missing",
            2,
            "Review",
            0
          ]
        ],
        "more": 3,
        "pills": [
          "All 9",
          "1 blocker",
          "6 warnings"
        ]
      },
      {
        "nav": "People",
        "crumb": "People / This week",
        "title": "Capacity & compensation · Week ending Jun 20th",
        "sub": "Who is over capacity, who is under, and who gets the credit.",
        "cta": "Review staffing",
        "hero": [
          "Origination credit",
          "$4.2M",
          "across 48 fee earners · utilization 71%",
          "Review the desk"
        ],
        "stats": [
          [
            "",
            "Hours analysed",
            "61,400",
            "From time entries · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to close"
          ],
          [
            "",
            "Comp review",
            "Jun 30",
            "Partner committee"
          ],
          [
            "g",
            "Warnings",
            "9",
            "Worth a look"
          ]
        ],
        "unit": "People",
        "rows": [
          [
            "PARTNER",
            "Origination dispute open",
            1,
            "Resolve",
            1
          ],
          [
            "ASSOC",
            "Utilization below target",
            6,
            "Review",
            0
          ],
          [
            "ASSOC",
            "Overtime above threshold",
            2,
            "Review",
            0
          ],
          [
            "PARALEGAL",
            "Capacity fully booked",
            3,
            "Review",
            0
          ],
          [
            "PARTNER",
            "Review not signed off",
            1,
            "Review",
            0
          ],
          [
            "ASSOC",
            "Rate below band",
            1,
            "Review",
            0
          ]
        ],
        "more": 4,
        "pills": [
          "All 10",
          "1 blocker",
          "9 warnings"
        ]
      }
    ]
  },
  {
    "id": "logistics",
    "name": "Logistics",
    "steps": [
      [
        "Invoices brought in",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "25 open"
      ],
      [
        "Run settlement",
        "lock",
        "locked by 3 blockers"
      ],
      [
        "Check the numbers",
        "num",
        "after run"
      ],
      [
        "Send payments",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "3 blockers on the worklist are holding settlement. Warnings don't block, but the blockers must go."
    ],
    "mods": [
      {
        "nav": "Ops",
        "crumb": "Ops / This week",
        "title": "Operations · Week ending Jun 20th",
        "sub": "What is moving, what is covered, and what is still open.",
        "cta": "Import loads",
        "hero": [
          "Loads this week",
          "1,077",
          "96% covered · 26 still uncovered",
          "Review the board"
        ],
        "stats": [
          [
            "",
            "Loads imported",
            "1,077",
            "From your TMS · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to dispatch"
          ],
          [
            "",
            "On time",
            "94.2%",
            "Trailing 7 days"
          ],
          [
            "g",
            "Warnings",
            "10",
            "Worth a look"
          ]
        ],
        "unit": "Loads",
        "rows": [
          [
            "NEXTWK",
            "26 loads uncovered",
            26,
            "Resolve",
            1
          ],
          [
            "LAREDO-77",
            "Detention risk building",
            1,
            "Review",
            0
          ],
          [
            "DALLAS-08",
            "Appointment missed",
            1,
            "Review",
            0
          ],
          [
            "MEMPHIS-31",
            "Driver hours near limit",
            1,
            "Review",
            0
          ],
          [
            "TULSA-19",
            "Reefer temp out of range",
            1,
            "Review",
            0
          ],
          [
            "ELPASO-12",
            "Cross-border docs pending",
            1,
            "Review",
            0
          ]
        ],
        "more": 6,
        "pills": [
          "All 12",
          "1 blocker",
          "10 warnings"
        ]
      },
      {
        "nav": "Load board",
        "crumb": "Operations / Load board",
        "title": "Load board · Week ending Jun 20th",
        "sub": "Every load in flight, on the map, with the reload beside it.",
        "cta": "Open the board",
        "hero": ["Loads in flight", "1,077", "412 carriers · 38 states", "Cover the open lanes"],
        "stats": [
          ["", "Covered", "947", "88.0% of the board"],
          ["", "Open lanes", "108", "22 without a reload"],
          ["b", "Blockers", "1", "Must fix to tender"],
          ["w", "Warnings", "7", "Worth a look"]
        ],
        "unit": "Loads",
        "rows": [
          ["DFW-DEN", "No reload on the return leg", 14, "Cover", 1],
          ["LAX-PHX", "Capacity tight, rate above target", 9, "Review", 0],
          ["SAV-CLT", "Appointment not confirmed", 6, "Review", 0],
          ["HSV-MLU", "Deadhead over 180 miles", 5, "Review", 0],
          ["ORD-CMH", "Carrier insurance expiring", 4, "Review", 0],
          ["LRD-MEM", "Cross-border documents pending", 3, "Review", 0]
        ],
        "more": 3,
        "pills": ["All 8", "1 blocker", "7 warnings"]
      },
      {
        "nav": "Carrier audit",
        "crumb": "Audit / This week",
        "title": "Carrier audit · Week ending Jun 20th",
        "sub": "Every invoice checked against the rate confirmation, before it is paid.",
        "cta": "Run the audit",
        "hero": [
          "Recovered this month",
          "$212,000",
          "3,908 invoices audited · 25 exceptions",
          "Review the exceptions"
        ],
        "stats": [
          [
            "",
            "Invoices audited",
            "3,908",
            "From carrier billing · automatic"
          ],
          [
            "r",
            "Blockers",
            "3",
            "Must fix to settle"
          ],
          [
            "",
            "Over rate con",
            "$84K",
            "Flagged this week"
          ],
          [
            "g",
            "Warnings",
            "22",
            "Worth a look"
          ]
        ],
        "unit": "Loads",
        "rows": [
          [
            "LAREDO-77",
            "Invoice over the rate con",
            4,
            "Resolve",
            1
          ],
          [
            "ELPASO-12",
            "Carrier insurance lapsed",
            1,
            "Resolve",
            1
          ],
          [
            "TULSA-19",
            "Duplicate invoice submitted",
            1,
            "Resolve",
            1
          ],
          [
            "DALLAS-08",
            "Detention billed without proof",
            2,
            "Review",
            0
          ],
          [
            "MEMPHIS-31",
            "Accessorial not on contract",
            1,
            "Review",
            0
          ],
          [
            "LAREDO-77",
            "Fuel surcharge mismatch",
            1,
            "Review",
            0
          ]
        ],
        "more": 16,
        "pills": [
          "All 25",
          "3 blockers",
          "22 warnings"
        ]
      },
      {
        "nav": "Billing",
        "crumb": "Billing / This week",
        "title": "Billing & settlement · Week ending Jun 20th",
        "sub": "Everything standing between this run and carriers being paid Friday.",
        "cta": "Upload load sheet",
        "hero": [
          "Ready to settle",
          "$1.84M",
          "across 214 carriers · nothing sent yet",
          "Review the run"
        ],
        "stats": [
          [
            "",
            "Invoices matched",
            "3,883",
            "Against rate confirmations · automatic"
          ],
          [
            "r",
            "Blockers",
            "3",
            "Must fix to run"
          ],
          [
            "",
            "Settlement in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "18",
            "Worth a look"
          ]
        ],
        "unit": "Loads",
        "rows": [
          [
            "LAREDO-77",
            "Invoice over the rate con",
            4,
            "Resolve",
            1
          ],
          [
            "ELPASO-12",
            "Carrier insurance lapsed",
            1,
            "Resolve",
            1
          ],
          [
            "MEMPHIS-31",
            "Invoice held, credit check",
            1,
            "Resolve",
            1
          ],
          [
            "DALLAS-08",
            "Detention billed without proof",
            2,
            "Review",
            0
          ],
          [
            "TULSA-19",
            "Customer AR past 60 days",
            1,
            "Review",
            0
          ],
          [
            "LAREDO-77",
            "Accessorial off contract",
            1,
            "Review",
            0
          ]
        ],
        "more": 12,
        "pills": [
          "All 21",
          "3 blockers",
          "18 warnings"
        ]
      },
      {
        "nav": "Reconciliation",
        "crumb": "Reconciliation / This week",
        "title": "Reconciliation · Week ending Jun 20th",
        "sub": "What matched, what did not, and what it is worth.",
        "cta": "Close the week",
        "hero": [
          "Unmatched variance",
          "$18,400",
          "98.4% matched · 41 open items",
          "Review the variance"
        ],
        "stats": [
          [
            "",
            "Lines reconciled",
            "7,812",
            "Carrier AP against customer AR · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to close"
          ],
          [
            "",
            "Closed through",
            "Jun 20",
            "Last full week"
          ],
          [
            "g",
            "Warnings",
            "13",
            "Worth a look"
          ]
        ],
        "unit": "Items",
        "rows": [
          [
            "LOADS",
            "Rate confirmation missing",
            4,
            "Resolve",
            1
          ],
          [
            "TULSA-19",
            "Fuel surcharge mismatch",
            1,
            "Review",
            0
          ],
          [
            "DALLAS-08",
            "Short pay unexplained",
            1,
            "Review",
            0
          ],
          [
            "LAREDO-77",
            "Accessorial double counted",
            1,
            "Review",
            0
          ],
          [
            "MEMPHIS-31",
            "Credit memo unapplied",
            1,
            "Review",
            0
          ],
          [
            "ELPASO-12",
            "Currency conversion variance",
            1,
            "Review",
            0
          ]
        ],
        "more": 9,
        "pills": [
          "All 14",
          "1 blocker",
          "13 warnings"
        ]
      },
      {
        "nav": "Commissions",
        "crumb": "Commissions / This week",
        "title": "Commissions · Week ending Jun 20th",
        "sub": "Everything standing between this run and payday on Friday.",
        "cta": "Upload load sheet",
        "hero": [
          "Ready to pay",
          "$201,480",
          "across 54 people · nothing sent yet",
          "Review the run"
        ],
        "stats": [
          [
            "",
            "Loads imported",
            "1,077",
            "From your TMS · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run"
          ],
          [
            "",
            "Payday in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "15",
            "Worth a look"
          ]
        ],
        "unit": "Loads",
        "rows": [
          [
            "ALEXJCO",
            "Nobody to pay — needs a payee",
            2,
            "Resolve",
            1
          ],
          [
            "MAYABFL",
            "Loads that lost money",
            1,
            "Review",
            0
          ],
          [
            "NYLARTX",
            "Loads that lost money",
            1,
            "Review",
            0
          ],
          [
            "WRENDAZ",
            "Loads that lost money",
            1,
            "Review",
            0
          ],
          [
            "DOTXUOH",
            "Loads that lost money",
            1,
            "Review",
            0
          ],
          [
            "MAYABFL",
            "Below min margin — pays $0",
            1,
            "Review",
            0
          ]
        ],
        "more": 9,
        "pills": [
          "All 16",
          "1 blocker",
          "15 warnings"
        ]
      }
    ]
  },
  {
    "id": "restaurants",
    "name": "Restaurants",
    "steps": [
      [
        "Sales imported",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "12 open"
      ],
      [
        "Post the close",
        "lock",
        "locked by 1 blocker"
      ],
      [
        "Review variances",
        "num",
        "after close"
      ],
      [
        "Send the owner pack",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "1 blocker on the worklist is holding the close. Warnings don't block, but the blocker must go."
    ],
    "mods": [
      {
        "nav": "Units",
        "crumb": "Units / This week",
        "title": "Nightly close · Week ending Jun 20th",
        "sub": "Every location closed nightly, not three weeks after the period.",
        "cta": "Import sales",
        "hero": [
          "Group EBITDA",
          "$1.34M",
          "across 41 units · 3% ahead of plan",
          "Review the units"
        ],
        "stats": [
          [
            "",
            "Tickets imported",
            "128,400",
            "From POS · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to close"
          ],
          [
            "",
            "Period close",
            "5 days",
            "Monday, Jun 30"
          ],
          [
            "g",
            "Warnings",
            "11",
            "Worth a look"
          ]
        ],
        "unit": "Units",
        "rows": [
          [
            "UNIT-19",
            "Cash deposit unreconciled",
            1,
            "Resolve",
            1
          ],
          [
            "UNIT-14",
            "Comps above policy",
            1,
            "Review",
            0
          ],
          [
            "UNIT-31",
            "Sales variance 8%",
            1,
            "Review",
            0
          ],
          [
            "UNIT-07",
            "Void rate above threshold",
            1,
            "Review",
            0
          ],
          [
            "UNIT-22",
            "Discount not authorised",
            2,
            "Review",
            0
          ],
          [
            "UNIT-19",
            "Till short two nights",
            1,
            "Review",
            0
          ]
        ],
        "more": 6,
        "pills": [
          "All 12",
          "1 blocker",
          "11 warnings"
        ]
      },
      {
        "nav": "Labor",
        "crumb": "Labor / This week",
        "title": "Labor & scheduling · Week ending Jun 20th",
        "sub": "What the schedule cost against what the dining room actually did.",
        "cta": "Publish schedule",
        "hero": [
          "Labor",
          "29.4%",
          "38,200 hours · overtime 4.1%",
          "Review the schedule"
        ],
        "stats": [
          [
            "",
            "Shifts scheduled",
            "2,940",
            "Against forecast sales · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run payroll"
          ],
          [
            "",
            "Payroll in",
            "3 days",
            "Wednesday, Jun 25"
          ],
          [
            "g",
            "Warnings",
            "9",
            "Worth a look"
          ]
        ],
        "unit": "Units",
        "rows": [
          [
            "UNIT-07",
            "Labor over target",
            1,
            "Resolve",
            1
          ],
          [
            "UNIT-22",
            "Overtime spike",
            1,
            "Review",
            0
          ],
          [
            "UNIT-31",
            "14 shifts unfilled",
            14,
            "Review",
            0
          ],
          [
            "UNIT-14",
            "Clock-in before shift",
            3,
            "Review",
            0
          ],
          [
            "UNIT-19",
            "Break compliance missed",
            2,
            "Review",
            0
          ],
          [
            "UNIT-07",
            "Manager hours unallocated",
            1,
            "Review",
            0
          ]
        ],
        "more": 4,
        "pills": [
          "All 10",
          "1 blocker",
          "9 warnings"
        ]
      },
      {
        "nav": "Inventory",
        "crumb": "Inventory / This week",
        "title": "Inventory & purchasing · Week ending Jun 20th",
        "sub": "What was bought, what was wasted, and what the vendor did to the price.",
        "cta": "Post counts",
        "hero": [
          "Food cost",
          "31.4%",
          "waste $41K · 12 vendor price moves",
          "Review the counts"
        ],
        "stats": [
          [
            "",
            "Invoices coded",
            "1,840",
            "From vendors · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to close"
          ],
          [
            "",
            "Counts due",
            "Tonight",
            "All units"
          ],
          [
            "g",
            "Warnings",
            "8",
            "Worth a look"
          ]
        ],
        "unit": "Units",
        "rows": [
          [
            "UNIT-31",
            "Inventory count missing",
            2,
            "Resolve",
            1
          ],
          [
            "VENDOR",
            "Produce up 6% without notice",
            1,
            "Review",
            0
          ],
          [
            "UNIT-22",
            "Shrink above target",
            1,
            "Review",
            0
          ],
          [
            "UNIT-07",
            "Invoice without receiving",
            1,
            "Review",
            0
          ],
          [
            "UNIT-14",
            "Par levels out of date",
            1,
            "Review",
            0
          ],
          [
            "UNIT-19",
            "Transfer unrecorded",
            1,
            "Review",
            0
          ]
        ],
        "more": 3,
        "pills": [
          "All 9",
          "1 blocker",
          "8 warnings"
        ]
      },
      {
        "nav": "COGS",
        "crumb": "COGS / This week",
        "title": "Prime cost · Week ending Jun 20th",
        "sub": "Food plus labor, the only number that decides whether a unit works.",
        "cta": "Rebuild recipes",
        "hero": [
          "Prime cost",
          "58.2%",
          "food 31.4% · labor 29.4% · +1.2 pts vs plan",
          "Review prime cost"
        ],
        "stats": [
          [
            "",
            "Recipes costed",
            "412",
            "Against live vendor prices · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to price"
          ],
          [
            "",
            "Menu review",
            "Jul 7",
            "Group meeting"
          ],
          [
            "g",
            "Warnings",
            "7",
            "Worth a look"
          ]
        ],
        "unit": "Units",
        "rows": [
          [
            "GROUP",
            "Prime cost over target",
            6,
            "Resolve",
            1
          ],
          [
            "GROUP",
            "Menu mix shifted",
            1,
            "Review",
            0
          ],
          [
            "KITCHEN",
            "Recipe costs stale",
            1,
            "Review",
            0
          ],
          [
            "UNIT-22",
            "Portion variance",
            1,
            "Review",
            0
          ],
          [
            "UNIT-07",
            "Yield below standard",
            1,
            "Review",
            0
          ],
          [
            "UNIT-31",
            "Price not passed through",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "7 warnings"
        ]
      },
      {
        "nav": "Reports",
        "crumb": "Reports / This period",
        "title": "Owner reporting · Period ending Jun 30",
        "sub": "Everything standing between this period and the owner pack.",
        "cta": "Build the pack",
        "hero": [
          "Packs ready",
          "38 of 41",
          "across 7 entities · consolidated nightly",
          "Review the packs"
        ],
        "stats": [
          [
            "",
            "Statements built",
            "41",
            "One per unit · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to publish"
          ],
          [
            "",
            "Period close",
            "5 days",
            "Monday, Jun 30"
          ],
          [
            "g",
            "Warnings",
            "6",
            "Worth a look"
          ]
        ],
        "unit": "Entities",
        "rows": [
          [
            "UNIT-19",
            "Blocking the group close",
            1,
            "Resolve",
            1
          ],
          [
            "GROUP",
            "Intercompany unmatched $12K",
            1,
            "Review",
            0
          ],
          [
            "GROUP",
            "Owner pack in review",
            1,
            "Review",
            0
          ],
          [
            "ENTITY-3",
            "Management fee not booked",
            1,
            "Review",
            0
          ],
          [
            "ENTITY-5",
            "Rent accrual missing",
            1,
            "Review",
            0
          ],
          [
            "GROUP",
            "Prior period adjustment",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "6 warnings"
        ]
      }
    ]
  },
  {
    "id": "brokerage",
    "name": "Brokerage",
    "steps": [
      [
        "Transactions synced",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "8 open"
      ],
      [
        "Run the payouts",
        "lock",
        "locked by 1 blocker"
      ],
      [
        "Check the splits",
        "num",
        "after run"
      ],
      [
        "Send statements",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "1 blocker on the worklist is holding payouts. Warnings don't block, but the blocker must go."
    ],
    "mods": [
      {
        "nav": "Listings",
        "crumb": "Listings / This week",
        "title": "Live listings · Week ending Jun 20th",
        "sub": "What is on the market, and what is quietly going stale.",
        "cta": "Add a listing",
        "hero": [
          "Live listings",
          "74",
          "18 under contract · 63 days on market",
          "Review the listings"
        ],
        "stats": [
          [
            "",
            "Listings synced",
            "74",
            "From your CRM · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to publish"
          ],
          [
            "",
            "New this week",
            "6",
            "Added to market"
          ],
          [
            "g",
            "Warnings",
            "7",
            "Worth a look"
          ]
        ],
        "unit": "Listings",
        "rows": [
          [
            "LIST-0902",
            "Listing expired, still live",
            1,
            "Resolve",
            1
          ],
          [
            "LIST-0914",
            "Photos missing",
            3,
            "Review",
            0
          ],
          [
            "LIST-0918",
            "Price reduction overdue",
            1,
            "Review",
            0
          ],
          [
            "LIST-0871",
            "No activity in 45 days",
            1,
            "Review",
            0
          ],
          [
            "LIST-0933",
            "Square footage disputed",
            1,
            "Review",
            0
          ],
          [
            "LIST-0902",
            "Owner contact stale",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "7 warnings"
        ]
      },
      {
        "nav": "BOV",
        "crumb": "BOV / This month",
        "title": "Autonomous BOV · June",
        "sub": "Comps, pricing and the letter, drafted before the pitch.",
        "cta": "Start a BOV",
        "hero": [
          "BOVs this month",
          "22",
          "2-day average turnaround · 4 in review",
          "Review the queue"
        ],
        "stats": [
          [
            "",
            "Comps pulled",
            "1,940",
            "From listings and county records · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to send"
          ],
          [
            "",
            "In review",
            "4",
            "Awaiting broker sign-off"
          ],
          [
            "g",
            "Warnings",
            "5",
            "Worth a look"
          ]
        ],
        "unit": "BOVs",
        "rows": [
          [
            "BOV-2210",
            "Comp set incomplete",
            2,
            "Resolve",
            1
          ],
          [
            "BOV-2204",
            "Pricing outside market range",
            1,
            "Review",
            0
          ],
          [
            "BOV-2199",
            "Owner data stale",
            1,
            "Review",
            0
          ],
          [
            "BOV-2211",
            "No recent closings in set",
            1,
            "Review",
            0
          ],
          [
            "BOV-2207",
            "Letter not reviewed",
            1,
            "Review",
            0
          ],
          [
            "BOV-2210",
            "Photos not attached",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "5 warnings"
        ]
      },
      {
        "nav": "Broker desk",
        "crumb": "Desk / This week",
        "title": "Broker desk · Week ending Jun 20th",
        "sub": "Everything standing between this run and agent payouts on Friday.",
        "cta": "Import transactions",
        "hero": [
          "Commissions payable",
          "$684,200",
          "across 38 agents · nothing sent yet",
          "Review the run"
        ],
        "stats": [
          [
            "",
            "Transactions synced",
            "96",
            "From closings · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to run"
          ],
          [
            "",
            "Payout in",
            "2 days",
            "Friday, Jun 27"
          ],
          [
            "g",
            "Warnings",
            "7",
            "Worth a look"
          ]
        ],
        "unit": "Deals",
        "rows": [
          [
            "LIST-0914",
            "Split not agreed in writing",
            1,
            "Resolve",
            1
          ],
          [
            "TXN-1187",
            "Referral fee unallocated",
            1,
            "Review",
            0
          ],
          [
            "TXN-1190",
            "Override applied twice",
            1,
            "Review",
            0
          ],
          [
            "TXN-1176",
            "Escrow not released",
            1,
            "Review",
            0
          ],
          [
            "TXN-1188",
            "Agent licence expiring",
            1,
            "Review",
            0
          ],
          [
            "TXN-1190",
            "Cap reached mid-deal",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "7 warnings"
        ]
      },
      {
        "nav": "Research",
        "crumb": "Research / Markets",
        "title": "Market research · Week ending Jun 20th",
        "sub": "What the submarket did, and whether the data is worth quoting.",
        "cta": "Refresh markets",
        "hero": [
          "Ownership records",
          "12,400",
          "41 submarkets · absorption tracked",
          "Review the markets"
        ],
        "stats": [
          [
            "",
            "Records refreshed",
            "1,180",
            "From county and listing sources · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to publish"
          ],
          [
            "",
            "Refreshed",
            "Today",
            "06:00 local"
          ],
          [
            "g",
            "Warnings",
            "6",
            "Worth a look"
          ]
        ],
        "unit": "Markets",
        "rows": [
          [
            "SUBMKT",
            "Absorption data stale",
            2,
            "Resolve",
            1
          ],
          [
            "DOWNTOWN",
            "Ownership unverified",
            1,
            "Review",
            0
          ],
          [
            "MIDTOWN",
            "New comp recorded",
            1,
            "Review",
            0
          ],
          [
            "NORTH",
            "Vacancy series revised",
            1,
            "Review",
            0
          ],
          [
            "SOUTH",
            "Construction starts missing",
            1,
            "Review",
            0
          ],
          [
            "DOWNTOWN",
            "Rent survey out of date",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "6 warnings"
        ]
      },
      {
        "nav": "Agents",
        "crumb": "Agents / This week",
        "title": "Agent growth · Week ending Jun 20th",
        "sub": "Who is producing, who is drifting, and who is about to leave.",
        "cta": "Add a prospect",
        "hero": [
          "Pipeline",
          "$128M",
          "across 38 agents · 312 hours reclaimed",
          "Review the desk"
        ],
        "stats": [
          [
            "",
            "Prospects sourced",
            "840",
            "From market and ownership data · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to assign"
          ],
          [
            "",
            "At retention risk",
            "6",
            "Flagged this week"
          ],
          [
            "g",
            "Warnings",
            "5",
            "Worth a look"
          ]
        ],
        "unit": "Agents",
        "rows": [
          [
            "DESK",
            "6 agents at retention risk",
            6,
            "Resolve",
            1
          ],
          [
            "ONBOARD",
            "Onboarding incomplete",
            2,
            "Review",
            0
          ],
          [
            "PROD",
            "Production below target",
            4,
            "Review",
            0
          ],
          [
            "DESK",
            "No pipeline activity 30 days",
            1,
            "Review",
            0
          ],
          [
            "ONBOARD",
            "Licence not verified",
            1,
            "Review",
            0
          ],
          [
            "PROD",
            "Split renegotiation due",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "5 warnings"
        ]
      }
    ]
  },
  {
    "id": "wealth",
    "name": "Wealth management",
    "steps": [
      [
        "Custodian data in",
        "done",
        "done"
      ],
      [
        "Fix what needs a look",
        "now",
        "13 open"
      ],
      [
        "Generate client packs",
        "lock",
        "locked by 1 blocker"
      ],
      [
        "Committee review",
        "num",
        "after packs"
      ],
      [
        "Send to clients",
        "lock",
        "locked"
      ]
    ],
    "lock": [
      "Step 3 is locked",
      "1 blocker on the worklist is holding the packs. Warnings don't block, but the blocker must go."
    ],
    "mods": [
      {
        "nav": "Households",
        "crumb": "Households / This quarter",
        "title": "Client book · Quarter ending Jun 30",
        "sub": "Every relationship on one record, not five systems.",
        "cta": "Add a household",
        "hero": [
          "Assets reported",
          "$8.4B",
          "across 1,204 households · 18 new this quarter",
          "Review the book"
        ],
        "stats": [
          [
            "",
            "Positions reconciled",
            "42,180",
            "From custodians · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to report"
          ],
          [
            "",
            "Reviews due",
            "42",
            "Next 30 days"
          ],
          [
            "g",
            "Warnings",
            "10",
            "Worth a look"
          ]
        ],
        "unit": "Households",
        "rows": [
          [
            "HH-0912",
            "Custodian feed mismatch",
            1,
            "Resolve",
            1
          ],
          [
            "HH-1188",
            "Beneficiary missing",
            1,
            "Review",
            0
          ],
          [
            "HH-0430",
            "Review overdue",
            12,
            "Review",
            0
          ],
          [
            "HH-0771",
            "Address unverified",
            1,
            "Review",
            0
          ],
          [
            "HH-1203",
            "Contact record stale",
            1,
            "Review",
            0
          ],
          [
            "HH-0912",
            "Risk profile expired",
            1,
            "Review",
            0
          ]
        ],
        "more": 5,
        "pills": [
          "All 11",
          "1 blocker",
          "10 warnings"
        ]
      },
      {
        "nav": "Models",
        "crumb": "Models / This quarter",
        "title": "Portfolio models · Quarter ending Jun 30",
        "sub": "Which portfolios drifted, and what it costs to bring them back.",
        "cta": "Rebalance",
        "hero": [
          "Portfolios drifted",
          "6",
          "across 14 models · average drift 2.1%",
          "Review the drift"
        ],
        "stats": [
          [
            "",
            "Portfolios checked",
            "1,204",
            "Against target bands · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to trade"
          ],
          [
            "",
            "Rebalance due",
            "22",
            "Households"
          ],
          [
            "g",
            "Warnings",
            "8",
            "Worth a look"
          ]
        ],
        "unit": "Households",
        "rows": [
          [
            "HH-0430",
            "Drift past band",
            1,
            "Resolve",
            1
          ],
          [
            "GROWTH",
            "Model change pending approval",
            1,
            "Review",
            0
          ],
          [
            "HH-0771",
            "Tax-loss opportunity",
            1,
            "Review",
            0
          ],
          [
            "HH-1188",
            "Cash above target",
            1,
            "Review",
            0
          ],
          [
            "HH-0912",
            "Restricted holding present",
            1,
            "Review",
            0
          ],
          [
            "HH-1203",
            "Trade blocked by wash sale",
            1,
            "Review",
            0
          ]
        ],
        "more": 4,
        "pills": [
          "All 10",
          "1 blocker",
          "8 warnings"
        ]
      },
      {
        "nav": "Performance",
        "crumb": "Performance / This quarter",
        "title": "Performance reporting · Quarter ending Jun 30",
        "sub": "Everything standing between this quarter and client packs going out.",
        "cta": "Build the packs",
        "hero": [
          "Packs ready",
          "1,166",
          "of 1,204 households · quarter close in 3 days",
          "Review the packs"
        ],
        "stats": [
          [
            "",
            "Positions reconciled",
            "42,180",
            "From custodians · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to publish"
          ],
          [
            "",
            "Reporting in",
            "3 days",
            "Thursday, Jun 26"
          ],
          [
            "g",
            "Warnings",
            "12",
            "Worth a look"
          ]
        ],
        "unit": "Households",
        "rows": [
          [
            "HH-0912",
            "Cost basis missing",
            1,
            "Resolve",
            1
          ],
          [
            "HH-0771",
            "Held-away account stale",
            1,
            "Review",
            0
          ],
          [
            "HH-1188",
            "Fee schedule not applied",
            2,
            "Review",
            0
          ],
          [
            "HH-0430",
            "Benchmark not assigned",
            1,
            "Review",
            0
          ],
          [
            "HH-1203",
            "Performance gap unexplained",
            1,
            "Review",
            0
          ],
          [
            "HH-0912",
            "Statement bounced back",
            1,
            "Review",
            0
          ]
        ],
        "more": 7,
        "pills": [
          "All 13",
          "1 blocker",
          "12 warnings"
        ]
      },
      {
        "nav": "Committee",
        "crumb": "Committee / This quarter",
        "title": "Investment committee · Jun 26",
        "sub": "What the committee has to decide, and what is missing to decide it.",
        "cta": "Build the pack",
        "hero": [
          "Managers on watch",
          "4",
          "of 62 managers · 7 diligence packs due",
          "Review the managers"
        ],
        "stats": [
          [
            "",
            "Managers monitored",
            "62",
            "Against mandate and peers · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to meet"
          ],
          [
            "",
            "Next meeting",
            "3 days",
            "Thursday, Jun 26"
          ],
          [
            "g",
            "Warnings",
            "6",
            "Worth a look"
          ]
        ],
        "unit": "Managers",
        "rows": [
          [
            "WATCH",
            "4 managers on watch",
            4,
            "Resolve",
            1
          ],
          [
            "EMERGING",
            "Diligence pack incomplete",
            1,
            "Review",
            0
          ],
          [
            "MAY",
            "Minutes unapproved",
            1,
            "Review",
            0
          ],
          [
            "CORE-FI",
            "Style drift detected",
            1,
            "Review",
            0
          ],
          [
            "SMALLCAP",
            "Capacity constraint flagged",
            1,
            "Review",
            0
          ],
          [
            "GLOBAL",
            "Fee change proposed",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "6 warnings"
        ]
      },
      {
        "nav": "Compliance",
        "crumb": "Compliance / This quarter",
        "title": "Compliance & operations · Quarter ending Jun 30",
        "sub": "The audit trail, kept current rather than reconstructed later.",
        "cta": "Export audit log",
        "hero": [
          "Trades reviewed",
          "1,840",
          "0 audit items open · books current",
          "Review exceptions"
        ],
        "stats": [
          [
            "",
            "Actions logged",
            "96,400",
            "Append-only · automatic"
          ],
          [
            "r",
            "Blockers",
            "1",
            "Must fix to file"
          ],
          [
            "",
            "ADV update",
            "Jul 15",
            "Annual amendment"
          ],
          [
            "g",
            "Warnings",
            "5",
            "Worth a look"
          ]
        ],
        "unit": "Items",
        "rows": [
          [
            "HH-1203",
            "RMD not yet taken",
            1,
            "Resolve",
            1
          ],
          [
            "TRADES",
            "Trade exception review",
            3,
            "Review",
            0
          ],
          [
            "ADV",
            "ADV update due",
            1,
            "Review",
            0
          ],
          [
            "HH-0912",
            "Suitability doc missing",
            1,
            "Review",
            0
          ],
          [
            "EMAIL",
            "Archive gap flagged",
            1,
            "Review",
            0
          ],
          [
            "HH-0430",
            "Fee disclosure unsigned",
            1,
            "Review",
            0
          ]
        ],
        "more": 2,
        "pills": [
          "All 8",
          "1 blocker",
          "5 warnings"
        ]
      }
    ]
  }
];
