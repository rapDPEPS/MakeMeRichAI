# MakeMeRichAI Passive Income Funnel

MakeMeRichAI is a fully static marketing funnel designed to help you start collecting leads and selling digital assets with zero backend setup. The project ships with a polished landing page, ready-to-use product copy, conversion-optimized email templates, and a simple revenue calculator to demonstrate earning potential.

## Features

- **Conversion-focused landing page** with hero, benefits, product spotlight, pricing, testimonials, FAQ, and contact sections.
- **Traffic Playbook** outlining 5 organic + paid strategies to feed your funnel from day one.
- **Interactive revenue calculator** that illustrates projected passive income based on traffic and conversion rates.
- **Dynamic offer cards** populated from a JSON data file so you can easily swap in new affiliate products.
- **Email swipe file** and **lead magnet outline** to instantly launch an email capture sequence.
- **Lightweight stack** (vanilla HTML/CSS/JS) so you can host it anywhere—including free static hosts like GitHub Pages or Netlify.

## Getting Started

1. Open `index.html` in your browser to preview the funnel locally. No build step is required.
2. Update the offer data in `assets/data/offers.json` with your own affiliate products or digital assets.
3. Customize the copy in `index.html`, `passive-income-email-swipes.md`, `lead-magnet-outline.md`, and `content/traffic-playbook.md` to match your brand voice.
4. Hook up the "Join the Waitlist" form to your preferred email service (e.g., [Formspree](https://formspree.io/), [ConvertKit](https://convertkit.com/), [Brevo](https://www.brevo.com/)).
5. Deploy the `/` folder to your static host of choice.

## Customization Tips

- Replace the placeholder hero illustration in `assets/images/hero-placeholder.svg` with your own graphic or screenshot.
- Adjust the color scheme by tweaking CSS variables at the top of `assets/css/styles.css`.
- The FAQ section is powered by simple HTML details/summary elements—add or remove entries as needed.
- Use the calculator defaults in `assets/js/app.js` as a baseline for your niche; you can adjust conversion rates and commissions to fit your numbers.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In your repository settings, enable GitHub Pages for the `main` branch with the `/ (root)` folder.
3. Wait for the site to build. Share your new passive income funnel using the generated GitHub Pages URL.

## License

This project is released under the MIT License. See `LICENSE` for details.
