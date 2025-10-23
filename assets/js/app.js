const offersContainer = document.querySelector('[data-offers]');
const calculatorForm = document.querySelector('[data-calculator-form]');
const calculatorOutput = document.querySelector('[data-calculator-output]');
const calculatorBreakdown = document.querySelector('[data-calculator-breakdown]');

async function loadOffers() {
  try {
    const response = await fetch('assets/data/offers.json');
    const offers = await response.json();

    offersContainer.innerHTML = offers
      .map(
        (offer) => `
        <article class="card offer-card">
          <h3>${offer.title}</h3>
          <p>${offer.description}</p>
          <div class="meta">
            <span>Commission: ${offer.commission}</span>
            <span>Product price: ${offer.price}</span>
            <span>Per sale: ${offer.payout}</span>
          </div>
          <a class="button secondary" href="${offer.link}" target="_blank" rel="noopener">
            ${offer.cta}
          </a>
        </article>
      `
      )
      .join('');
  } catch (error) {
    offersContainer.innerHTML = `
      <article class="card offer-card">
        <h3>Offer library unavailable</h3>
        <p>We couldn't load the offer list. Refresh the page or replace <code>assets/data/offers.json</code> with your own products.</p>
      </article>
    `;
    console.error('Failed to load offers', error);
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value) {
  return Number(value).toLocaleString();
}


const rangeOutputs = {
  visitors: (value) => `${formatNumber(value)} visitors`,
  optInRate: (value) => `${value}% opt-in rate`,
  conversionRate: (value) => `${value}% conversion rate`,
  averageCommission: (value) => `$${formatNumber(value)} per sale`,
};

function syncRangeOutputs() {
  if (!calculatorForm) return;
  const ranges = calculatorForm.querySelectorAll('input[type="range"]');
  ranges.forEach((input) => {
    const key = input.name;
    const value = input.value;
    const target = calculatorForm.querySelector(`[data-range-output="${key}"]`);
    if (target) {
      const formatted = rangeOutputs[key] ? rangeOutputs[key](value) : value;
      const [primary, ...rest] = formatted.split(' ');
      target.innerHTML = `<strong>${primary}</strong> ${rest.join(' ')}`.trim();
    }
  });
}

function updateCalculator() {
  if (!calculatorForm) return;
  const formData = new FormData(calculatorForm);
  const visitors = Number(formData.get('visitors'));
  const optInRate = Number(formData.get('optInRate')) / 100;
  const conversionRate = Number(formData.get('conversionRate')) / 100;
  const averageCommission = Number(formData.get('averageCommission'));

  const subscribers = Math.round(visitors * optInRate);
  const buyers = Math.round(subscribers * conversionRate);
  const monthlyRevenue = buyers * averageCommission;
  const yearlyRevenue = monthlyRevenue * 12;

  calculatorOutput.textContent = formatCurrency(yearlyRevenue);

  calculatorBreakdown.innerHTML = `
    <li><strong>${formatNumber(subscribers)}</strong> new subscribers per month</li>
    <li><strong>${formatNumber(buyers)}</strong> monthly customers</li>
    <li><strong>${formatCurrency(monthlyRevenue)}</strong> projected monthly profit</li>
  `;
}

if (offersContainer) {
  loadOffers();
}

if (calculatorForm) {
  calculatorForm.addEventListener('input', (event) => {
    if (event.target.matches('input[type="range"]')) {
      syncRangeOutputs();
    }
    updateCalculator();
  });
  syncRangeOutputs();
  updateCalculator();
}

const waitlistForm = document.querySelector('[data-waitlist-form]');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = waitlistForm.querySelector('input[type="email"]');
    const button = waitlistForm.querySelector('button');
    const email = emailInput.value.trim();

    if (!email) {
      alert('Add your email so we can send the launch details.');
      return;
    }

    button.disabled = true;
    button.textContent = 'Added to waitlist!';
    emailInput.value = '';
  });
}
