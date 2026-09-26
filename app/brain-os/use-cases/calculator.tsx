'use client';

import { useId, useState } from 'react';
import { BRAIN_BANDS } from '@/components/landing/brain-pricing-content';

/* Time returned, priced. A model the visitor drives: every input is theirs.
   The defaults come from one operation's own usage in September 2026 (33
   people, 791 questions in a week, so 4.8 questions per person per working
   day); the minutes per question and the hourly cost are assumptions and say
   so. The price comes from the published bands, so there is one source. */

const HOURS_BY_HAND = 2; // truckload planning, customer reported
const SECONDS_WITH_BRAIN = 30;
const WORKING_DAYS = 5;
const WORKING_WEEKS = 48;

type Band = { range: string; annual: number | null; min: number; max: number };

const BANDS: Band[] = BRAIN_BANDS.map(b => {
  const nums = b.range.match(/\d+/g)?.map(Number) ?? [];
  const annual = /^\$/.test(b.annual) ? Number(b.annual.replace(/[^0-9]/g, '')) : null;
  if (/^Up to/i.test(b.range)) return { range: b.range, annual, min: 0, max: nums[0] };
  if (/and up/i.test(b.range)) return { range: b.range, annual, min: nums[0], max: Infinity };
  return { range: b.range, annual, min: nums[0], max: nums[1] };
});

const money = (n: number) => `$${(Math.round(n / 100) * 100).toLocaleString('en-US')}`;
const whole = (n: number) => Math.round(n).toLocaleString('en-US');

function Field({ label, note, value, display, min, max, step, onChange }: {
  label: string; note: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="bp-field">
      <div className="bp-field-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{display}</output>
      </div>
      <small>{note}</small>
      <input id={id} type="range" min={min} max={max} step={step} value={value} aria-valuetext={display} onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

export function ImpactCalculator() {
  const [people, setPeople] = useState(33);
  const [perDay, setPerDay] = useState(4.8);
  const [minutes, setMinutes] = useState(5);
  const [plans, setPlans] = useState(20);
  const [rate, setRate] = useState(40);

  const weeklyFromQuestions = (people * perDay * WORKING_DAYS * minutes) / 60;
  const weeklyFromPlans = plans * (HOURS_BY_HAND - SECONDS_WITH_BRAIN / 3600);
  const weekly = weeklyFromQuestions + weeklyFromPlans;
  const yearly = weekly * WORKING_WEEKS;
  const value = yearly * rate;
  const band = BANDS.find(b => people >= b.min && people <= b.max) ?? BANDS[BANDS.length - 1];
  const price = band.annual;
  const multiple = price ? value / price : null;
  const scale = Math.max(value, price ?? 0) || 1;

  return (
    <div className="bp-calc">
      <div className="bp-calc-in">
        <p className="bp-calc-kick">YOUR OPERATION</p>
        <Field label="People who can ask" note="The band Brain OS is priced on. Default: the reference deployment, week to 18 September." value={people} display={`${people}`} min={5} max={160} step={1} onChange={setPeople} />
        <Field label="Questions per person, per working day" note="Default: 791 questions by 33 people in one week, so 4.8 each per day." value={perDay} display={perDay.toFixed(1)} min={0.5} max={15} step={0.1} onChange={setPerDay} />
        <Field label="Minutes each answer saves" note="An assumption. A chase across the system of record, an inbox and a phone call is rarely under five." value={minutes} display={`${minutes} min`} min={1} max={20} step={1} onChange={setMinutes} />
        <Field label="Truckload plans per week" note="An assumption. Each one is two hours by hand and thirty seconds with Brain OS, customer reported." value={plans} display={`${plans}`} min={0} max={100} step={1} onChange={setPlans} />
        <Field label="Loaded cost per hour" note="An assumption. Salary, benefits and the desk, per working hour." value={rate} display={`$${rate}`} min={20} max={150} step={5} onChange={setRate} />
      </div>
      <div className="bp-calc-out">
        <p className="bp-calc-kick">WHAT THE MODEL SAYS</p>
        <div className="bp-out-hero">
          <p>Hours returned each week</p>
          <p className="bp-out-value" aria-live="polite">{whole(weekly)}<small>hrs</small></p>
        </div>
        <div className="bp-out-grid">
          <div><p>Hours returned each year, over {WORKING_WEEKS} working weeks</p><p>{whole(yearly)}</p></div>
          <div><p>Value of those hours at ${rate} an hour</p><p>{money(value)}</p></div>
          <div><p>Brain OS for the year, published band “{band.range}”</p><p>{price ? money(price) : 'Quoted'}</p></div>
          <div><p>Return on the year’s fee</p><p>{multiple ? `${multiple.toFixed(1)}×` : 'Ask us'}</p></div>
        </div>
        <div className="bp-out-bars">
          <p className="bp-calc-kick">SIDE BY SIDE</p>
          <ul className="bp-bars">
            <li title={`Value of hours returned, per year: ${money(value)}`}>
              <span className="bp-bar-label">Value of hours returned</span>
              <span className="bp-track"><span className="bp-fill" style={{ width: `${Math.max(0.5, (value / scale) * 100)}%` }} /></span>
              <span className="bp-bar-value">{money(value)}</span>
            </li>
            <li title={`Brain OS for the year: ${price ? money(price) : 'quoted'}`}>
              <span className="bp-bar-label">Brain OS, per year</span>
              <span className="bp-track"><span className="bp-fill is-light" style={{ width: `${price ? Math.max(0.5, (price / scale) * 100) : 0.5}%` }} /></span>
              <span className="bp-bar-value">{price ? money(price) : 'Quoted'}</span>
            </li>
          </ul>
        </div>
        <div className="bp-out-bars">
          <p className="bp-calc-kick">WHERE THE HOURS COME FROM</p>
          <div className="bp-stack" role="img" aria-label={`${whole(weeklyFromQuestions)} hours a week from answers and ${whole(weeklyFromPlans)} from truckload plans`}>
            <span style={{ width: `${(weeklyFromQuestions / (weekly || 1)) * 100}%` }} />
            <span style={{ width: `${(weeklyFromPlans / (weekly || 1)) * 100}%` }} />
          </div>
          <div className="bp-legend" aria-hidden="true">
            <span><i style={{ background: '#3b66ce' }} />Answers, {whole(weeklyFromQuestions)} hrs a week</span>
            <span><i style={{ background: '#8fb0e8' }} />Truckload plans, {whole(weeklyFromPlans)} hrs a week</span>
          </div>
        </div>
        <p className="bp-calc-note">
          The arithmetic: people × questions a day × {WORKING_DAYS} days × minutes ÷ 60, plus plans × (2 hours − 30 seconds), gives hours a week. Times {WORKING_WEEKS} weeks, times the hourly cost, gives the value. The band and its price are the ones published at endurancelabs.ai/brain/pricing.
        </p>
      </div>
    </div>
  );
}
