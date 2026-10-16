// Deliberately synthetic data for the public product concepts. Workflow sources
// and the separate, dated production figures are documented in
// docs/imagery/home-product-concepts.txt.
export const billingWeeks = [
  { week: 'Week 1', delivered: 82, billed: 76 },
  { week: 'Week 2', delivered: 91, billed: 85 },
  { week: 'Week 3', delivered: 87, billed: 82 },
  { week: 'Week 4', delivered: 112, billed: 103 },
  { week: 'Week 5', delivered: 118, billed: 109 },
  { week: 'Week 6', delivered: 126, billed: 108 },
];

export const deliveryWeeks = [92, 94, 93, 95, 94, 96, 97, 96];
export const quietCustomers = [
  { name: 'Customer A', days: 94, priorLoads: 24 },
  { name: 'Customer B', days: 108, priorLoads: 17 },
  { name: 'Customer C', days: 126, priorLoads: 12 },
];

export type QuestionId = 'billing' | 'delivery' | 'customers';
export const conversations: Record<QuestionId, {
  label: string;
  question: string;
  answer: string;
  chartTitle: string;
  unit: string;
  bars: { label: string; value: number }[];
  sources: string[];
  records: { label: string; value: string }[];
  recommendation: string;
  draft: string;
}> = {
  billing: {
    label: 'Find unbilled work',
    question: 'What’s delivered but not billed?',
    answer: '18 delivered loads are still unbilled. 12 are missing proof of delivery, and 6 need an invoice review. Start with the missing documents—the carrier contacts are already on the load records.',
    chartTitle: 'What is holding up billing',
    unit: 'loads',
    bars: [{ label: 'Missing proof of delivery', value: 12 }, { label: 'Invoice review', value: 6 }],
    sources: ['Delivery records', 'Billing status'],
    records: [{ label: 'Delivered this week', value: '126 loads' }, { label: 'Billed from those deliveries', value: '108 loads' }, { label: 'Delivered, not billed', value: '18 loads' }],
    recommendation: 'Prepare a document request for the carrier on each missing-POD load.',
    draft: 'Hello, could you send the signed proof of delivery for load DEMO-014? Our records show it has been delivered, and we need the document to complete billing. Thank you.',
  },
  delivery: {
    label: 'Understand delays',
    question: 'Where are our late deliveries coming from?',
    answer: '40 of 1,000 deliveries were late in this sample week. 26 were recorded against dock appointment delays. That is 65% of the late deliveries, so appointment coordination is the first place to look.',
    chartTitle: 'Late deliveries by recorded reason',
    unit: 'deliveries',
    bars: [{ label: 'Dock appointments', value: 26 }, { label: 'In transit', value: 10 }, { label: 'Other', value: 4 }],
    sources: ['Arrival records', 'Appointment log'],
    records: [{ label: 'Deliveries in the sample week', value: '1,000' }, { label: 'On time', value: '960 / 96%' }, { label: 'Late', value: '40 / 4%' }],
    recommendation: 'Prepare a note for dispatch to review the appointment exceptions.',
    draft: 'Team, 26 of this week’s 40 late deliveries are recorded against dock appointment delays. Please review the appointment exceptions and confirm the next pickup and delivery windows with the facilities involved.',
  },
  customers: {
    label: 'Spot quiet customers',
    question: 'Which customers haven’t shipped in 90 days?',
    answer: 'Three customers have no shipment in the past 90 days. Together, they had 53 loads in the previous 90-day period. Customer A had the most activity, so it is a useful place to begin a follow-up.',
    chartTitle: 'Days since the last shipment',
    unit: 'days',
    bars: quietCustomers.map(customer => ({ label: customer.name, value: customer.days })),
    sources: ['Customer history', 'Shipment records'],
    records: quietCustomers.map(customer => ({ label: `${customer.name} · prior 90 days`, value: `${customer.priorLoads} loads` })),
    recommendation: 'Prepare a check-in with Customer A, using their shipment history as context.',
    draft: 'Hello, I wanted to check in on your upcoming shipping plans. We enjoyed supporting your previous shipments and would be glad to help with any new lanes or capacity needs. Is there anything coming up we can help with?',
  },
};
