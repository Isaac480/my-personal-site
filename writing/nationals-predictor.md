---
title: Building a D3 Track Nationals Predictor
description: "A study in statistics, generative AI, and web design"
image: /static/img/posts/nationals-cover.png
date: "2026-06-16"
---

Final product:
<a href="https://nationalspredictor.vercel.app/" target="_blank" rel="noopener noreferrer">
  D3 Track Nationals Predictor
</a>

As a member of UChicago's distance program, a frequent debate on runs is the topic of qualifying for nationals. In any given year, the top 20-24 athletes in DIII are invited to compete at nationals, and so athletes put all their efforts into posting qualifying times. However, since qualification is based on ranking rather than a stable cutoff time, there is much uncertainty about what time makes the cut. Additionally, many athletes who qualify in a certain event will decide to scratch in favor of a different event, causing the ranking needed to qualify to be much more leniant than set by the NCAA. For example, in indoor 2026, the 37th ranked miler was the last person to qualify despite the top 20 auto qualifying, due to medical scratches, or athletes opting to run the DMR, 800, 3k etc. 

Despite this uncertainty, we can expect the times and ranking needed to follow a somewhat predictable pattern. Times will get slightly faster between years, and the number of scratches in a given year should also follow some distribution. These distributions will be event specific – nearly everyone opts to run the 3k since it is the last distance event of indoor, but fewer people will choose to run the mile and 800 because of the preliminary rounds. The point is that these patterns can be analyzed more rigorously using statistical models, rather than our own mental heuristics and guessing. As behavioral psychology proposes, we are often poor intuitive statisticians, and often overestimate the times needed due to extraneous factors and personal experience.

> "People make judgments under uncertainty by relying on heuristics rather than formal calculations of probability, and these heuristics can produce predictable biases."
>
> — Daniel Kahneman, *Thinking, Fast and Slow*


## Data Scraping
The first major obstacle is obtaining the data. The NCAA doesn't keep public records of the start lists or qualifying lists for each championship meet, so I decided to scrape the data directly from TFRRS, the official results database. For each year from 2022 to the present, two pages are scraped:

1) Championship meet results — identifies which athletes/teams actually competed at nationals.
2) Qualifying performance list — the ranked list of all qualifying times submitted during the season.

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/tfrrs1.png" alt="Jira"
         style="height:500px; width:auto; object-fit: contain;">
    <figcaption>
      Top 50 before nationals
    </figcaption>
  </figure>

  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/tfrrs2.png" alt="Jira"
         style="height:500px; width:auto; object-fit: contain;">
    <figcaption>
      Nationals starting lists
    </figcaption>
  </figure>
</div>

By cross-referencing these two sources, we find the last qualifier for each event: the athlete with the highest (worst) qualifying rank who still competed at the championship. This gives us the historical cutoff rank and time for each event and year. Why only 2022? First, COVID served as a major disruptor of the championships, and second, the rising popularity of "supershoes" in 2021 caused a sharp increase in times across all events.

## Trackflation
A well-known phenomenon in track is that times and marks have gotten significantly faster due to better shoes, supplements, training, etc. Any good model should try to account for this trackflation, which we can do by fitting a linear regression to the average time of athletes ranked 21st–30th across 2021-2025 (after conversion to banked equivalents). I chose this range because the average will have less variance, and also aligns more closely with the typical ranking cutoffs. Noteably, 

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/drift.png" alt="assdf"
         style="height:300px; width:auto; object-fit: contain;">
    <figcaption>Yearly drift from linear regression</figcaption>
  </figure>
</div>

## Statistical Model
The prediction pipeline has two stages:

1. Time → Estimated Rank
All historical qualifying times (converted and drift-adjusted) are pooled and sorted. An input time is mapped to an estimated rank via linear interpolation against this pooled distribution.

2. Rank → P(Qualify)
A time qualifies if rank ≤ field_size + δ, where δ is the “delta” — how many spots past the automatic field size the cutoff extends (due to scratches, multi-event athletes, etc.).

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/nationals-predictor1.png" alt="assdf"
         style="height:300px; width:auto; object-fit: contain;">
    <figcaption></figcaption>
  </figure>
</div>

The delta is modeled as Normal(μ, σ²) with unknown parameters. Using a Jeffreys prior, the posterior predictive distribution for a new year’s delta is a Student-t distribution with n−1 degrees of freedom, centered at the sample mean with scale s⋅√(1 + 1/n). This naturally accounts for uncertainty from the small sample size (4–5 years of data).

P(qualify) = P(δnew≥ rank − field_size), computed from this Student-t distribution. With few data points the heavy tails of the Student-t appropriately widen the uncertainty compared to a normal approximation.

## Qualification Thresholds
The threshold table inverts the model: given a target probability (e.g., 90%), we find the rank where P(qualify) equals that probability using the inverse Student-t CDF, then map that rank back to a time via the pooled time-to-rank curve. This tells you the time you need to have a given chance of qualifying.

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/nationals-predictor2.png" alt="assdf"
         style="height:300px; width:auto; object-fit: contain;">
    <figcaption></figcaption>
  </figure>
</div>

## Limitations
1) Based on only 4–5 years of historical data, so predictions carry meaningful uncertainty.
2) The model assumes the delta distribution is roughly normal and stationary — unusual years (e.g., rule changes, COVID effects) could violate this.
3) Conversion factors are approximate population averages; individual athletes may see different flat-to-banked differentials.
4) Times very far from the cutoff zone (extremely fast or slow) are extrapolated beyond the historical data and should be interpreted with caution.
5) In some years, the last rank in was lower than the number of qualifiers, leading to innapropriately strict thresholds. This flaw is due to individuals scratching day-of competition, and will have to be fixed in the next version.

## Futher directions
As of July 13th 2026, the predictor is limited to only running events, so future versions will incorporate field events as they follow a similar model of qualification. The model will need to be [validated using the 2026 outdoor data](validating-nationals-predictor.md), and then adjusted accordingly. With more years of data, the 90% estimate ranges will naturally get narrower, as statistical power increases. Additionally, the model can be extended to DI and DII. While qualification for nationals is based on performance at a regional meet, the same methodology can be used for qualification for the regional meets which is based on event standing.