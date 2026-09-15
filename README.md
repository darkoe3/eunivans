# Eunivans Educational Centre

A responsive, seven-page school website built with Next.js 16 App Router, JavaScript, Tailwind CSS 4, Lucide React, Next Image and subtle reduced-motion-aware Framer Motion animation.

## Run locally

Use Node.js 20.9 or later (Node 24 was used for verification).

```bash
npm install
npm run dev
```

Open http://localhost:3000. On Windows where PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`.

```bash
npm run lint
npm run build
npm start
```

## Pages and source structure

- `app/page.js`: home, hero, welcome, school values, milestones, sample testimonial and noticeboard.
- `app/{about,academics,admissions,student-life,gallery,contact}/page.js`: individual pages with metadata.
- `components/ui.js`: Brand, SectionHeading, PageHero, ProgrammeCard, Programmes, Values, StatisticsSection, AchievementCard, Philosophy and CallToAction.
- `components/navigation.js`: announcement, responsive navigation/mobile menu and floating contact/back-to-top controls.
- `components/forms.js`: shared enquiry form, AdmissionsForm and ContactForm.
- `components/gallery.js`: category filtering and native-dialog lightbox, keyboard arrows, Escape, focus restoration and modal focus containment.
- `components/footer.js`, `components/reveal.js`: footer and subtle animation.
- `lib/content.js`: shared school information, programmes, values and image records.
- `app/globals.css`: responsive brand styling and Tailwind import/theme.
- `app/{icon.svg,opengraph-image.js,robots.js,sitemap.js,not-found.js}`: SEO assets and 404.

## Content and supplied assets

**No PDF, logo or photographs were present in the supplied workspace or accessible attachments.** The site uses the information provided in the request. Original, labelled SVG illustrations reserve image spaces and do not depict actual pupils, buildings or events. The temporary shield mark and E favicon are not claimed to be the school logo. No stock photographs are presented as school photographs.

When the assets are available:

1. Read the prospectus and compare it against the transcribed information.
2. Inspect every image, verify its caption, and confirm permission to publish photographs of pupils.
3. Add descriptively named files under `public/images/`, such as `eunivans-logo.jpeg`, `spelling-competition.jpg`, `student-awards.jpg`, `school-leadership-event.jpg` and `graduation-ceremony.jpg`.
4. Update every `gallery` record in `lib/content.js`, adding all supplied photographs. Set factual alt text, categories and captions; remove illustration notices only after replacement.
5. Update Hero in `app/page.js` to use the best genuine school photograph. Never use the flyer as the main hero. Adjust `.hero-image img` object positioning at mobile and desktop widths so faces remain visible. The current layout reserves a prominent hero image panel; it can expand into a full-width photographic background with a purple readability overlay once the photograph is inspected.
6. Replace Brand’s temporary ShieldCheck mark with `next/image` in its white container. Update the About crest, favicon and Open Graph artwork with the actual logo.
7. For gallery photos, use their real dimensions instead of the illustrations’ 1200 × 850 dimensions. Next Image generates optimised raster variants. Keep original aspect ratios and appropriate `sizes`; use `priority` only for the hero. Keep source originals separately, serve sensibly sized high-quality copies, and avoid heavy filters.

## Information requiring school confirmation before launch

- Prospectus, official logo and all school/event photographs.
- Establishment weekday: the brief says Monday, 5 May 2006, but this date was a Friday. The website publishes **5 May 2006** without a weekday.
- Head of school’s approved name, photograph and message.
- Verified parent testimonials and permission to publish. The sample quote is explicitly labelled and has a developer replacement comment in `app/page.js`.
- Event captions, dates, names and achievements: no dated or specific unverified event reports have been published.
- Opening hours and exact Google Maps school pin; current map link searches the general area only.
- Official social profiles: icons are labelled non-link placeholders, not invented accounts.
- School website domain, operational form service and privacy/retention policy.
- Current admission requirements, fees, feeding and payment arrangements: users are directed to the school office; no fee figures appear.
- The 20-year anniversary copy and 2006–2026 artwork are intentional for 2026. Review milestone copy in future years.

## Forms: demonstration and production integration

The forms perform client-side validation, display field-specific accessible errors, focus the first invalid field, provide loading feedback and clearly explain that successful validation **does not send or store data**. No network request, browser storage or email is triggered. All current fields are required.

To make them operational:

1. Add a server-only POST endpoint such as `app/api/enquiry/route.js` or connect to an approved backend.
2. Validate and constrain all inputs again on the server. Add rate limiting, abuse protection and a honeypot or accessible challenge when needed. Accept only the expected fields; do not trust client validation.
3. Store email provider credentials in deployment environment variables without a `NEXT_PUBLIC_` prefix. Use the school-approved recipient and provider; never expose credentials in client code.
4. Replace the mock delay in `components/forms.js` with `fetch('/api/enquiry', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})`.
5. Only show success after a successful server response. Catch failures, retain input, show an accessible error and allow retry. Disable submission while pending.
6. Agree on handling of child information, retention and consent with the school. Update consent copy, add the approved privacy notice and remove demo notices only after end-to-end delivery is verified.
7. Test delivery and failures using synthetic information before accepting real enquiries.

## SEO and deployment

Copy `.env.example` to `.env.local` and replace the example with the confirmed public origin (no trailing slash), e.g. `NEXT_PUBLIC_SITE_URL=https://<confirmed-domain>`.

The public origin controls metadata and sitemap URLs. Until it is configured, robots disallows crawling and the sitemap is empty to avoid publishing a guessed domain. Configure a real domain before production. Keep preview deployments non-indexable; do not set the production origin on public previews without also blocking indexing through the host.

Deploy to a Next.js-compatible Node host or Vercel. Install dependencies, set the environment variable, run `npm run build`, and serve with `npm start`. HTTPS should be enabled by the hosting provider. This is a standard Next.js deployment, not a static-export configuration. The current school pages are prerendered.

## Verification

`npm run lint` and `npm run build` are the standard checks. Browser regression coverage is in `tests/site.spec.js`. The tests use synthetic data with the local mock handler only; no messages are sent.

```bash
npx playwright install chromium
npm run test:e2e
```

If Chrome is already installed, set `PLAYWRIGHT_CHANNEL=chrome` to avoid downloading Chromium. The test configuration starts the production server, so build first. Screenshots for desktop/mobile page review are written to `test-results/` (ignored by git).

Confirm all real uploaded assets on both desktop and mobile after replacement. Assets unavailable during development cannot be visually verified.
