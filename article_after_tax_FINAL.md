# 3 Things Almost Every CRE Model Gets Wrong About the After-Tax LP Return

*By Kasing Ng, CPA, former Big 4 auditor*

I spent years auditing real estate funds and REITs at a Big 4 firm. The job is mostly backward-looking. By the time the financials reach you, the entity is formed, the LPA is signed, and the deal closed a long time ago. Your whole job is to trace every number back to something you can point to. A figure you cannot support does not belong in the statements, so you learn fast to distrust any number when you cannot see where it came from.

It also gives you a specific vantage point. You see how these deals turned out: the depreciation that got taken, the recapture that hit when the asset sold, the K-1s that went out to the LPs. Then you look back at the pro forma that raised the money in the first place, the forward underwriting still sitting in the file, and you notice it modeled none of that. It stopped at a pre-tax IRR.

I am not a developer, and I never underwrote these deals going in. But if you audit the back end of enough of them, the same three gaps between the pitch and the reality keep showing up. All three are on the tax side, and all three change the number the LP actually keeps.

None of them are complicated, which is part of why they are so easy to skip.

> One note before I start. This is not a shot at Excel, and it is not a bet against using AI to write your spreadsheets. Use both. The problem I am describing survives inside those tools. A fresh formula or a good chatbot will not catch it for you, because it is not an arithmetic error. It is an error in what you decided to model in the first place. Treat this as a second set of eyes on that decision.

## 1. The model stops at pre-tax

This is the big one, and it is nearly universal.

Almost every development pro forma I saw in those files ended at a pre-tax IRR and a pre-tax equity multiple. The deck says "17% IRR," everyone nods, and the meeting moves on. The problem is that your LP does not spend pre-tax dollars. They spend what is left after depreciation recapture, after capital gains, and for most passive investors, after the 3.8% net investment income tax.

That gap is not small, and it is not the same from one deal to the next. Two deals with an identical 17% pre-tax IRR can hand the LP very different after-tax returns, depending on how much depreciation was taken, how the gain splits at exit, and the investor's own tax posture.

When you show a pre-tax number and call it "the return," you are not lying. But you are handing the LP a figure they will never actually see in their account. The sophisticated ones know it and quietly discount you for it. The rest find out at exit, which is worse.

There is a fair objection here, and the better sponsors raise it: you cannot model after-tax at screening, because you do not know who your LPs are yet. One deal takes tax-exempt pension money. The next takes a taxable high-net-worth investor, or a foreign LP sitting behind a blocker. That is all true, but it proves too much. You do not need anyone's personal 1040 to see the friction that hits every taxable dollar, and that friction is recapture, capital gains, and the 3.8% surtax. So do not try to predict each investor's return. Model one standard taxable LP instead, and hold every deal to that same after-tax baseline. Set the baseline at the top of the scale, at a top-federal-bracket investor paying the NIIT. That is your stress-test floor. If a deal still clears its hurdle after tax under those assumptions, it holds up, and any lower-bracket or tax-exempt LP only comes out ahead of it. That is what makes it a fair comparison across deals.

The fix is not complicated. Carry the deal all the way to that after-tax baseline. Depreciation shields income during the hold, and the tax comes due at exit, so model both ends. It is more work, and it is also the only number that ends up mattering.

## 2. They lump the recapture together (§1250 vs §1245)

This one is more technical, and it is where even good models quietly go wrong.

When you sell, the depreciation you took gets recaptured, meaning the IRS taxes it back. It does not all get taxed the same way, though, and that is the part spreadsheets tend to flatten:

- Straight-line depreciation on the real property, meaning the building and its structural components, recaptures under §1250. That gets taxed at a capped 25% rate, the so-called unrecaptured §1250 gain rate.
- Accelerated or bonus depreciation on the personal-property pieces recaptures under §1245. Those are the 5- and 7-year components a cost-segregation study carves out of the building, things like carpeting, fixtures, specialized electrical, and equipment. §1245 recapture is taxed at ordinary income rates plus the 3.8% NIIT for a passive investor, which lands north of 40% all in, not 25%.

If your model front-loads aggressive cost-segregation or bonus depreciation, which is great for early-year returns, and then recaptures all of it at the 25% §1250 rate at exit, it is understating the exit tax. The early benefit is real, but the exit cost comes in too low, so the after-tax IRR ends up overstated. That kind of error looks fine right up until an LP's own accountant runs the numbers and asks a question you cannot answer in the room.

The fix is to split the recapture: §1250 at 25%, §1245 at ordinary rates plus NIIT, and only recapture what you actually accelerated. The two are not interchangeable, and the deals where it matters most are the ones being marketed on their depreciation in the first place.

## 3. The number you cannot trace

The first two are modeling errors. This one is more of a reflex, the deepest habit the job leaves you with.

In audit, a number you cannot trace is a problem by definition. It does not matter how reasonable it looks. If you cannot follow it back to a source, it does not get signed off. You spend years asking the same question until it is involuntary: show me where this comes from.

Most underwriting models cannot answer it. The final IRR is the output of forty cross-referenced tabs, and one of them has a broken link nobody has opened in three months, a liability sitting under a green cell. The person presenting it usually is not being dishonest. They just cannot see, or show you, where the number came from.

And it surfaces at the worst possible time. The investment committee, or an LP's analyst, asks where one cash-flow line comes from, and the sponsor is suddenly clicking through tabs live, hunting for the formula. The number might even be right, but at that point it does not matter, because the room just watched them not know their own model.

The fix here is a discipline rather than a feature: every number that reaches an investor should trace back to a formula and an input you can point to. If you cannot show where a number comes from, you do not really know it. You are just hoping.

## Why I built a tool around this

Eventually I got tired of finding the same three problems, so I built the model I wish those deals had come in on. It is called CREDevSim. It is a desktop app that runs on your own machine, and nothing about your deal ever touches a server. It does three specific things:

- It carries the deal all the way to the after-tax LP IRR and MOIC, not just a pre-tax figure.
- It splits §1250 and §1245 recapture correctly, so the exit tax on a bonus-depreciation deal does not come out understated.
- Every number traces back to a formula you can open. That is the audit habit, built into the software.

It also models §1031 exchanges, Opportunity Zone treatment, and §469 passive-loss suspension, since those change the after-tax answer too.

One honest thing, because I would rather you trust me than oversell you. It is a modeling tool, not tax advice. The tax figures are illustrative. The engine computes them at the asset level from the rates, elections, and inputs you give it, including the share of basis you designate as cost-segregation or bonus-eligible personal property. It does not run a cost-segregation study for you, and it does not replace your CPA, so verify the output before you put anything in front of an LP. What it does is start you from numbers built the way an auditor would check them, instead of from a pre-tax figure that was never the real one.

It is free. If any of this sounded like a spreadsheet you already own, give it a run.

---

*Kasing Ng is a California-licensed CPA and former Big 4 auditor. CREDevSim is a financial modeling tool and does not provide audit, attestation, or tax services; the CPA credential is stated as background only. Consult your own qualified advisors before making investment or tax decisions.*
