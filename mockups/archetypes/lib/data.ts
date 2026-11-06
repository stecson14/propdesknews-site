// Generated from Prop Desk's live data on Nov 6, 2026 (deals matrix, rules pages, quick answers, news log).
// Every string is copied from the firm's own pages as recorded on propdesknews.com. "friction" is a mockup metric: the number of payout hurdles counted from those facts.

export type Firm = {
  slug: string; name: string; short: string; page: string; url: string;
  code: string; save: string; what: string; list50: number | null; after50: number | null; act50: number | null; actNote: string;
  aff: boolean; ends: string; endsNote: string; billing: string; chips: string[]; fine: [string, string][]; platforms: string[];
  rules: { kyc: string; hedging: string; news: string; bots: string; inactivity: string; payout: string; accounts: string };
  drawdown: string; split: string; consistency: string; dll: string; minDays: number; friction: number;
};

export type WireItem = { date: string; headline: string; kind: "deal" | "rule" | "alert"; url: string };

export const CHECKED = "Nov 6, 2026";

export const FIRMS: Firm[] = [
  {
    "slug": "apex-trader-funding",
    "name": "Apex Trader Funding",
    "short": "Apex",
    "page": "https://propdesknews.com/firms/apex-trader-funding/",
    "url": "https://apextraderfunding.com",
    "code": "SAVENOW",
    "save": "90% off",
    "what": "All evals (Intraday, EOD, Legacy). 25K Intraday $167 → $16.70.",
    "list50": 197,
    "after50": 19.7,
    "act50": 125,
    "actNote": "One-time PA activation fee after you pass (Rithmic/WealthCharts legacy); SAVENOW doesn't cover it",
    "aff": false,
    "ends": "",
    "endsNote": "Site timer runs to ~Nov 10",
    "billing": "monthly",
    "chips": [
      "EOD trailing drawdown",
      "$500 min payout",
      "50% consistency rule"
    ],
    "fine": [
      [
        "Drawdown",
        "End-of-day trailing. Safety net is the drawdown plus $100."
      ],
      [
        "Payouts",
        "100% split on EOD Performance Accounts. 5 qualifying days, $500 minimum, 50% consistency rule, max 6 payouts per account."
      ],
      [
        "What the code skips",
        "New signups only. Not valid on resets or PA activation fees."
      ]
    ],
    "platforms": [
      "Rithmic",
      "Tradovate",
      "WealthCharts",
      "TradingView"
    ],
    "rules": {
      "kyc": "Apex verifies the account owner and can require audits or extra verification at any time. Setting up an international payout method needs a government-issued ID or passport.",
      "hedging": "No hedging of any kind. Holding long and short at the same time on the same or a correlated instrument is prohibited, in one account or across your accounts. Directional trading only.",
      "news": "Allowed for your normal strategy. What's banned is \"news trading\" that chases the market or leaves orders on both sides to gamble on the release.",
      "bots": "Not allowed on any account type: no AI, autobots, algorithms, fully automated systems or HFT. Using them closes the PA or Live account and forfeits the balance. Trade copiers you run yourself are your responsibility.",
      "inactivity": "A Performance Account must log at least 2 trading days with $50 or more in net profit in every rolling 30-day period. Courtesy notices go out before closure, and a PA closed for inactivity can't be reinstated. Live accounts idle for 30 days may be closed.",
      "payout": "$500 minimum per request on every size. Caps step up over six payouts: $1,500 to $3,000 on a 50K EOD account ($13,000 in total), $1,500 to $3,000 on Intraday ($14,500). Live accounts: $500 minimum, daily requests.",
      "accounts": "20 active Performance Accounts per household, counted across everyone in the house, every company and every platform. All of them must trade in the same direction."
    },
    "drawdown": "EOD trailing",
    "split": "100%",
    "consistency": "50% per payout",
    "dll": "Yes (PA, by level)",
    "minDays": 5,
    "friction": 3
  },
  {
    "slug": "tradeify",
    "name": "Tradeify",
    "short": "Tradeify",
    "page": "https://propdesknews.com/firms/tradeify/",
    "url": "https://tradeify.co",
    "code": "NOV",
    "save": "30% off",
    "what": "40% off the Growth account. 50K $165 → $116, one-time payment.",
    "list50": 165,
    "after50": 116,
    "act50": 0,
    "actNote": "",
    "aff": false,
    "ends": "2026-11-13T23:59:00-05:00",
    "endsNote": "",
    "billing": "one-time",
    "chips": [
      "EOD trailing drawdown",
      "90/10 split",
      "One-time payment"
    ],
    "fine": [
      [
        "Drawdown",
        "End-of-day trailing. Profit targets $1.5K / $3K / $6K / $9K for 25K to 150K."
      ],
      [
        "Payouts",
        "90/10 split, Daily or Flex payout path."
      ],
      [
        "Consistency",
        "Consistency rule applies in the eval only."
      ]
    ],
    "platforms": [
      "Tradovate",
      "Rithmic",
      "WealthCharts",
      "TradingView"
    ],
    "rules": {
      "kyc": "Yes, before your first payout: Tradeify's own Sumsub check plus a separate Rise payout verification. Residents of Brazil, China, Italy, Mexico, Romania, South Korea, Spain, Taiwan, Thailand and the UAE must verify before getting a funded account, and crypto purchases need it at checkout.",
      "hedging": "Prohibited. No opposing positions on the same instrument or on two products from the same Product Group, in one account or across your accounts. Every account involved goes to violation status and profits from the period are forfeited.",
      "news": "No rules against it. Tradeify says it has no restrictions on news trading, DCA, flipping or scaling, and Tier 1 news is allowed on Select.",
      "bots": "Allowed with conditions: you must own the bot outright, use it only on your Tradeify accounts, record a live video enabling it on your PC, and it can't be a high-frequency bot.",
      "inactivity": "Place at least one trade per week (Monday to Friday) on each funded or evaluation account, or it may be marked inactive. Tradeify says it messages you before acting.",
      "payout": "$250 minimum on Select Flex and Daily, $500 on Growth (50K). Caps on a 50K: Flex $2,500, Daily $1,250, Growth $1,500 rising to $3,000 from the fourth payout.",
      "accounts": "5 simulated funded accounts per person and per household (any mix of Growth, Select Flex/Daily and Lightning; at most 3 of them 300K). Up to 15 Select evaluations per 30 days, unlimited Growth evaluations, and passed evaluations can be banked."
    },
    "drawdown": "EOD trailing",
    "split": "90/10",
    "consistency": "40% in eval, none funded",
    "dll": "Daily only ($1,000)",
    "minDays": 3,
    "friction": 1
  },
  {
    "slug": "take-profit-trader",
    "name": "Take Profit Trader",
    "short": "Take Profit Trader",
    "page": "https://propdesknews.com/firms/take-profit-trader/",
    "url": "https://takeprofittrader.com",
    "code": "NOFEE50",
    "save": "50% off for life",
    "what": "Early Black Friday sale, ends Mon Nov 9 (per TPT). 50K Test $170 → $85 per month.",
    "list50": 170,
    "after50": 85,
    "act50": 0,
    "actNote": "$130 activation fee waived with NOFEE50",
    "aff": false,
    "ends": "",
    "endsNote": "Ends Mon Nov 9",
    "billing": "monthly",
    "chips": [
      "$130 activation fee waived",
      "Resets $79 to $199",
      "PRO 80/20, PRO+ 90/10"
    ],
    "fine": [
      [
        "Billing",
        "The Test renews monthly ($150 / $170 / $245 / $330 / $360 list for 25K to 150K) until you pass."
      ],
      [
        "Fees",
        "$130 one-time activation fee, waived for life on accounts opened with this code. Test resets $79 / $99 / $139 / $169 / $199."
      ],
      [
        "Payouts",
        "PRO 80/20, PRO+ 90/10. Withdrawals from day one on PRO, no maximum."
      ]
    ],
    "platforms": [
      "Rithmic",
      "CQG",
      "TradingView"
    ],
    "rules": {
      "kyc": "Yes, at registration. Every new registrant completes KYC before becoming a fully verified customer; most checks clear in minutes, with a 24/5 team for manual reviews.",
      "hedging": "No counter positions: you can't hold opposite positions in the same or closely related products, across any accounts you own or control, on Test, PRO or PRO+.",
      "news": "Be flat on PRO accounts from one minute before to one minute after FOMC statements, NFP and CPI, with no open orders either. Fed speakers and FOMC minutes are allowed.",
      "bots": "Not permitted on any account: no bots, algos or automated execution tools. Every trade has to be placed by hand.",
      "inactivity": "Trade at least one day per calendar week (Sunday to Friday) to keep a PRO account active; a traded day is one round trip on any permitted product. Contact support for a temporary exception.",
      "payout": "PRO: withdraw from day one once your balance reaches the buffer (starting balance plus max drawdown, $52,000 on a 50K); Take Profit Trader says there's no cap on the amount. PRO+ has no buffer. No minimum payout is stated on the pages we read.",
      "accounts": "Unlimited Test accounts, traded at the same time. 5 active PRO or PRO+ accounts per person, and at most 10 passed Tests activated in any 30 days."
    },
    "drawdown": "EOD (Test), intraday (PRO)",
    "split": "80/20 PRO, 90/10 PRO+",
    "consistency": "50% in Test, none in PRO",
    "dll": "None in PRO",
    "minDays": 3,
    "friction": 2
  },
  {
    "slug": "lucid-trading",
    "name": "Lucid Trading",
    "short": "Lucid",
    "page": "https://propdesknews.com/firms/lucid-trading/",
    "url": "https://lucidtrading.com",
    "code": "VAULT",
    "save": "30% off",
    "what": "LucidDaily 50K $172 → $120.40.",
    "list50": 172,
    "after50": 120.4,
    "act50": 0,
    "actNote": "",
    "aff": false,
    "ends": "",
    "endsNote": "",
    "billing": "see firm",
    "chips": [
      "EOD drawdown",
      "Daily loss limit",
      "90/10 split"
    ],
    "fine": [
      [
        "Drawdown",
        "End-of-day. LucidDaily 25K: $1,000 max loss and a $600 daily loss limit."
      ],
      [
        "Payouts",
        "90/10 split. LucidFlex: 5 qualifying days, $500 minimum payout, up to 5 payouts, then live."
      ],
      [
        "Consistency",
        "LucidFlex eval: your largest day must be 40% or less of eval profit (50% with the paid add-on)."
      ]
    ],
    "platforms": [
      "Tradovate",
      "CQG",
      "TradingView"
    ],
    "rules": {
      "kyc": "Not stated on the pages we read.",
      "hedging": "Prohibited across accounts, including mini against micro of the same product. Accounts with a hedging violation lose intraday payout eligibility, and hedging live accounts is banned by Lucid and the CME.",
      "news": "Allowed on Flex, Pro and Direct. On LucidDaily, trading red-folder news is a hard breach.",
      "bots": "Allowed. Automated systems and trade copiers are permitted as long as they follow Lucid's rules, and you own any software error.",
      "inactivity": "An account with no trade producing at least $1 of net profit or loss in 30 calendar days is treated as abandoned and permanently deleted. Breached evaluations are deleted after 30 days unless reset.",
      "payout": "$500 minimum on every plan. Caps on a 50K: Flex 50% of profit up to $2,000; Pro $2,000 first, then $2,500; Direct $2,000 first, then $2,500; Daily pays profit above the $52,100 buffer.",
      "accounts": "Up to 10 active evaluations, 5 funded and 5 LucidLive accounts per household, and no more than 10 accounts in total across evaluations and funded (5 evaluations means at most 5 funded)."
    },
    "drawdown": "EOD trailing",
    "split": "90/10",
    "consistency": "40% Flex eval, 20% Pro cycle",
    "dll": "Optional on Flex, on for Daily",
    "minDays": 3,
    "friction": 3
  },
  {
    "slug": "iq-capital",
    "name": "IQ Capital",
    "short": "IQ Capital",
    "page": "https://propdesknews.com/firms/iq-capital/",
    "url": "https://checkout.iqcapital.io/products?aff=propdesk",
    "code": "PROPDESK",
    "save": "85% off",
    "what": "Black Friday: 85% off everything, for a limited time (per IQ Capital). 50K futures challenge $245 → $36.75.",
    "list50": 245,
    "after50": 36.75,
    "act50": 0,
    "actNote": "No activation fee listed on IQ Capital's page",
    "aff": true,
    "ends": "",
    "endsNote": "Site timer runs to ~Nov 8",
    "billing": "one-time",
    "chips": [
      "Futures, CFD & crypto",
      "No minimum days",
      "Up to 90% split"
    ],
    "fine": [
      [
        "Futures 50K",
        "$3,000 profit target, $2,000 max drawdown and a $1,000 daily loss limit."
      ],
      [
        "Challenge",
        "No consistency rule during the challenge and no minimum trading days to pass, per IQ Capital."
      ],
      [
        "Payouts",
        "Up to 90% split, no minimum payout, paid in crypto or by bank transfer."
      ],
      [
        "About the code",
        "PROPDESK is Prop Desk's affiliate code. At IQ Capital's checkout on Nov 4 it took 85% off the 50K futures challenge ($245 → $36.75), the same 85% as the site-wide Black Friday sale."
      ]
    ],
    "platforms": [],
    "rules": {
      "kyc": "Not stated on the pages we read.",
      "hedging": "Not stated on the pages we read.",
      "news": "Not stated on the pages we read.",
      "bots": "Not stated on the pages we read.",
      "inactivity": "Not stated on the pages we read.",
      "payout": "Not stated on the pages we read.",
      "accounts": "Not stated on the pages we read."
    },
    "drawdown": "See firm",
    "split": "Up to 90%",
    "consistency": "See firm",
    "dll": "See firm",
    "minDays": 0,
    "friction": 0
  },
  {
    "slug": "fundednext-futures",
    "name": "FundedNext Futures",
    "short": "FundedNext Futures",
    "page": "https://propdesknews.com/firms/fundednext-futures/",
    "url": "https://fundednext.com/?fpr=PROPDESK",
    "code": "PROPDESK",
    "save": "Up to 47% off",
    "what": "Flex 50K $141.99 → $74.99, one-time payment.",
    "list50": 141.99,
    "after50": 74.99,
    "act50": 0,
    "actNote": "",
    "aff": true,
    "ends": "",
    "endsNote": "",
    "billing": "one-time",
    "chips": [
      "EOD trailing drawdown",
      "One-time payment",
      "Up to 95% split (firm's claim)"
    ],
    "fine": [
      [
        "Drawdown",
        "End-of-day trailing only, no buffer rule."
      ],
      [
        "Payouts",
        "Up to 95% split is the firm's own claim."
      ],
      [
        "Platforms",
        "NinjaTrader, Tradovate, TradingView."
      ],
      [
        "About the code",
        "PROPDESK is Prop Desk's affiliate code. FundedNext's help center says partner codes match the best available official FundedNext discount, so it gives the same discount as FundedNext's public code FNFLEX."
      ]
    ],
    "platforms": [
      "Tradovate",
      "TradingView"
    ],
    "rules": {
      "kyc": "Yes: photo ID plus live selfie, required before your first Performance Reward withdrawal (not before trading). Usually takes 24-48 hours.",
      "hedging": "Not allowed: reverse hedging and hedging with correlated instruments are prohibited strategies.",
      "news": "Allowed on standard models ('allows ... news trading'); some promo challenges (e.g. FNL:002 12% MLL) ban it.",
      "bots": "Allowed: EAs and bots are permitted (not on some promo challenges like FNL:002).",
      "inactivity": "Challenge and funded accounts are breached after 30 consecutive calendar days with no trades (7 days on Futures Direct).",
      "payout": "$250 on Rapid Pro and Rapid Daily; $800 on Futures Direct.",
      "accounts": "Challenges: up to $750,000 combined allocation at a time. FundedNext (funded) accounts: up to 5 active per user and household, max 10 issued per calendar month."
    },
    "drawdown": "EOD trailing",
    "split": "Up to 95% (firm claim)",
    "consistency": "40% of target per day in challenge",
    "dll": "See plan",
    "minDays": 0,
    "friction": 1
  },
  {
    "slug": "myfundedfutures-mffu",
    "name": "MyFundedFutures",
    "short": "MyFundedFutures",
    "page": "https://propdesknews.com/firms/myfundedfutures-mffu/",
    "url": "https://myfundedfutures.com",
    "code": "CLUB",
    "save": "40% off",
    "what": "40% off any plan, and 50% off your first eval if you are new to MFFU. 50K Rapid $209 → $125, one-time payment.",
    "list50": 209,
    "after50": 125,
    "act50": 0,
    "actNote": "",
    "aff": false,
    "ends": "",
    "endsNote": "",
    "billing": "one-time",
    "chips": [
      "One-time payment",
      "Daily payouts on Rapid",
      "90/10 split on Rapid"
    ],
    "fine": [
      [
        "Consistency",
        "Rapid and Pro evaluations use a 50% rule, Rapid EOD 30%. Funded Rapid, Rapid EOD and Pro accounts have none."
      ],
      [
        "Payouts",
        "Funded Rapid pays daily at 90/10 once your balance clears a buffer ($2,100 on a 50K), with a $500 minimum."
      ],
      [
        "News",
        "Funded Rapid accounts don't allow Tier 1 news trading."
      ]
    ],
    "platforms": [
      "Tradovate",
      "TradingView"
    ],
    "rules": {
      "kyc": "Yes, mandatory before you begin trading a sim-funded account (Personal Settings > KYC). Once per person; one verified profile per individual. Payouts also need a Riseworks account.",
      "hedging": "Not allowed: 'MyFundedFutures prohibits hedging of any kind', including mini vs micro of the same underlying (e.g. NQ and MNQ).",
      "news": "Plan pages say news trading is allowed, but the news policy bans news-burst straddles/strangles, and for Tier 1 data you must be flat with no orders from 2 minutes before to 2 minutes after the release.",
      "bots": "Allowed with limits: automated strategies tuned to your own settings are OK if they don't exploit sim fills; HFT is not allowed.",
      "inactivity": "7 calendar days on Flex and Builder plans (no inactivity rule on Live accounts).",
      "payout": "Rapid: $500 after the buffer; Flex (legacy 25K): $250.",
      "accounts": "Up to 10 active evaluations. Sim-funded: up to 5 active when holding only 25K/50K sizes (other limits for larger sizes); Builder plans 1-2 per user."
    },
    "drawdown": "EOD / intraday by plan",
    "split": "90/10 Rapid",
    "consistency": "50% Rapid, 30% Rapid EOD",
    "dll": "By plan",
    "minDays": 0,
    "friction": 2
  },
  {
    "slug": "topstep",
    "name": "Topstep",
    "short": "Topstep",
    "page": "https://propdesknews.com/firms/topstep/",
    "url": "https://www.topstep.com",
    "code": "",
    "save": "No code live",
    "what": "Trading Combine 50K; no public promo code on Nov 6.",
    "list50": null,
    "after50": null,
    "act50": 149,
    "actNote": "One-time Express Funded activation (free with the No Activation Fee Combine)",
    "aff": false,
    "ends": "",
    "endsNote": "",
    "billing": "monthly",
    "chips": [
      "EOD trailing drawdown",
      "90/10 split",
      "$125 min payout"
    ],
    "fine": [
      [
        "Consistency",
        "55% in the Combine; 40% on the XFA Consistency path, none on Standard."
      ],
      [
        "Payouts",
        "5 winning days of $150+ (Standard) or 3 days under 40% (Consistency); 50% of balance per payout, capped by size."
      ]
    ],
    "platforms": [
      "TopstepX",
      "Tradovate",
      "TradingView"
    ],
    "rules": {
      "kyc": "Yes. Topstep runs identity verification (IDV) on every trader and can ask you to re-verify at any time. Express Funded activation happens after verification.",
      "hedging": "Not allowed across accounts, even briefly. First attempt gets a timed warning to un-hedge; after you acknowledge the policy, any hedge is liquidated on sight and repeat offenders lose the account.",
      "news": "Trading is restricted for a short window around Tier 1 news events, and trading your full max position size into a scheduled major release is a prohibited strategy. Normal trading around other releases is allowed; slippage is on you.",
      "bots": "Allowed with conditions. Topstep won't help set them up or cover malfunctions, and software that gives an unfair advantage counts as prohibited conduct. Trade copiers across your own XFAs are allowed up to $750K of buying power.",
      "inactivity": "An Express Funded Account with no trading activity for more than 30 days may be closed, and XFAs can't be put on hold.",
      "payout": "$125 minimum. Each Express Funded payout is up to 50% of your balance, capped at $2,000 to $6,000 by size and path (double with a Daily Loss Limit bought at checkout). Live Funded payouts have no cap.",
      "accounts": "Up to 5 active Express Funded Accounts at a time (1 for Shoulder Tap holders). Pass another Combine at the limit and the new XFA waits until one closes. You can mix sizes."
    },
    "drawdown": "EOD trailing",
    "split": "90/10",
    "consistency": "55% Combine, 40% XFA Consistency path",
    "dll": "Optional",
    "minDays": 3,
    "friction": 3
  }
];

export const WIRE: WireItem[] = [
  {
    "date": "2026-11-06",
    "headline": "FTM Perps: Added to perps tracking",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/ftm-perps-added-perps-tracking/"
  },
  {
    "date": "2026-11-06",
    "headline": "Funded Trader Markets: Added to tracking: \"Up to 75% OFF\" on 1-Step Nitro, e.g",
    "kind": "deal",
    "url": "https://propdesknews.com/news/2026/11/funded-trader-markets-added-tracking-up-75-pct/"
  },
  {
    "date": "2026-11-05",
    "headline": "Elite Trader Funding: $27 evaluation reset promo ended",
    "kind": "deal",
    "url": "https://propdesknews.com/news/2026/11/elite-trader-funding-27-evaluation-reset-promo-ended/"
  },
  {
    "date": "2026-11-05",
    "headline": "Phidias Premium accounts pay a rising split: 75% first payout, 100% from the fifth",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/phidias-propfirm-premium-accounts-use-rising-split-75/"
  },
  {
    "date": "2026-11-05",
    "headline": "PropShopTrader's new NOV26 code: 40% off evaluations, 25% off Direct",
    "kind": "deal",
    "url": "https://propdesknews.com/news/2026/11/propshoptrader-new-code-nov26/"
  },
  {
    "date": "2026-11-05",
    "headline": "Topstep: Labs Drops #010 and #011 live",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/topstep-labs-drops-010-011-live/"
  },
  {
    "date": "2026-11-05",
    "headline": "Topstep updates its Terms of Use, dated November 4",
    "kind": "alert",
    "url": "https://propdesknews.com/news/2026/11/topstep-terms-use-updated-last-updated/"
  },
  {
    "date": "2026-11-05",
    "headline": "Tradeify: India and UK traders must pass KYC before getting funded",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/tradeify-kyc-aml-policy-updated-nov-4/"
  },
  {
    "date": "2026-11-04",
    "headline": "Bulenox now lists Tradovate among its trading platforms",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/bulenox-tradovate-platform-list/"
  },
  {
    "date": "2026-11-04",
    "headline": "Correction: our Nov 1 FundingTicks alert was an old event",
    "kind": "alert",
    "url": "https://propdesknews.com/news/2026/11/fundingticks-correction-nov-1-winding-down-alert-was/"
  },
  {
    "date": "2026-11-04",
    "headline": "IQ Capital: Added to tracking",
    "kind": "rule",
    "url": "https://propdesknews.com/news/2026/11/iq-capital-added-tracking/"
  },
  {
    "date": "2026-11-04",
    "headline": "Lucid: Correction: the $108 / $172 / $272 / $365 prices and the 25K rules logged as LucidDaily",
    "kind": "deal",
    "url": "https://propdesknews.com/news/2026/11/lucid-correction-108-172-272-365-prices-25k/"
  },
  {
    "date": "2026-11-04",
    "headline": "Take Profit Trader gives away a free $50K PRO account daily through Nov 9",
    "kind": "deal",
    "url": "https://propdesknews.com/news/2026/11/take-profit-trader-daily-giveaway-free-50k-pro/"
  }
];

export const NEWS_RULES: { firm: string; slug: string; rule: string }[] = [
  {
    "firm": "Apex",
    "slug": "apex-trader-funding",
    "rule": "Allowed for your normal strategy. What's banned is \"news trading\" that chases the market or leaves orders on both sides to gamble on the release."
  },
  {
    "firm": "Tradeify",
    "slug": "tradeify",
    "rule": "No rules against it. Tradeify says it has no restrictions on news trading, DCA, flipping or scaling, and Tier 1 news is allowed on Select."
  },
  {
    "firm": "Take Profit Trader",
    "slug": "take-profit-trader",
    "rule": "Be flat on PRO accounts from one minute before to one minute after FOMC statements, NFP and CPI, with no open orders either. Fed speakers and FOMC minutes are allowed."
  },
  {
    "firm": "Lucid",
    "slug": "lucid-trading",
    "rule": "Allowed on Flex, Pro and Direct. On LucidDaily, trading red-folder news is a hard breach."
  },
  {
    "firm": "IQ Capital",
    "slug": "iq-capital",
    "rule": "Not stated on the pages we read."
  },
  {
    "firm": "FundedNext Futures",
    "slug": "fundednext-futures",
    "rule": "Allowed on standard models ('allows ... news trading'); some promo challenges (e.g. FNL:002 12% MLL) ban it."
  },
  {
    "firm": "MyFundedFutures",
    "slug": "myfundedfutures-mffu",
    "rule": "Plan pages say news trading is allowed, but the news policy bans news-burst straddles/strangles, and for Tier 1 data you must be flat with no orders from 2 minutes before to 2 minutes after the release."
  },
  {
    "firm": "Topstep",
    "slug": "topstep",
    "rule": "Trading is restricted for a short window around Tier 1 news events, and trading your full max position size into a scheduled major release is a prohibited strategy. Normal trading around other releases is allowed; slippage is on you."
  }
];

export function costToFund(f: Firm): number | null {
  if (f.after50 == null) return null;
  return Math.round((f.after50 + (f.act50 || 0)) * 100) / 100;
}

export function money(n: number | null): string {
  if (n == null) return "—";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
