import styles from './rate-variance-mockup.module.css';

const records = [
  ['Invoice', 'Cordova Freight · INV-88214 · $2,610.00'],
  ['Rate confirmation', '$2,410.00 · signed Jun 17'],
  ['Accessorials claimed', 'Detention 2.0 hr · lumper $84'],
  ['Supported by', 'Telematics dwell 1.4 hr · receipt on file'],
  ['Contract terms', 'Detention after 2 hr · $60/hr'],
] as const;

// Keep this screen as native text, rather than a screenshot, at every display size.
export function RateVarianceMockup() {
  return (
    <figure id="rate-variance" className={styles.figure} aria-label="Illustrative Brain OS invoice review">
      <div className={styles.label}>
        <span>BRAIN OS / INVOICE REVIEW</span>
        <span>ILLUSTRATIVE SCREEN</span>
      </div>
      <div className={styles.screen}>
        <header className={styles.header}>
          <h4>Rate variance check</h4>
          <p>Rate confirmation against the carrier invoice, line by line.</p>
        </header>
        <div className={styles.body}>
          <dl className={styles.records}>
            {records.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <dl className={styles.amounts}>
            <div className={styles.approved}>
              <dt>Approved amount</dt>
              <dd><strong>$2,494.00</strong><span>Linehaul plus the lumper receipt</span></dd>
            </div>
            <div>
              <dt>Disputed</dt>
              <dd><strong>$116.00</strong><span>Detention not supported by dwell</span></dd>
            </div>
            <div>
              <dt>Recovered this month</dt>
              <dd><strong>$68,400</strong><span>Across 318 audited invoices</span></dd>
            </div>
          </dl>
        </div>
        <p className={styles.note}>The dwell time comes from the truck, so the dispute is not an opinion.</p>
      </div>
      <figcaption>Product demo with sample data. Figures and connections shown are illustrative.</figcaption>
    </figure>
  );
}
