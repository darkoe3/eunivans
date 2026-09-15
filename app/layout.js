import './globals.css';
import { AnnouncementBar, Navbar, FloatingActions } from '../components/navigation';
import Footer from '../components/footer';
import { school } from '../lib/content';

const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const description = 'Eunivans Educational Centre provides holistic education for Creche, Kindergarten, Primary and Junior High School learners at UN City, Kasoa.';

export const metadata = {
	metadataBase: new URL(origin),
	title: {
		default: 'Eunivans Educational Centre | Integrity and Excellence',
		template: '%s | Eunivans Educational Centre',
	},
	description,
	openGraph: {
		type: 'website',
		locale: 'en_GH',
		siteName: school.name,
		title: 'Eunivans Educational Centre | Integrity and Excellence',
		description,
	},
	twitter: {
		card: 'summary_large_image',
		title: school.name,
		description,
	},
};

export default function RootLayout({ children }) {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'EducationalOrganization',
		name: school.name,
		description,
		foundingDate: '2006-05-05',
		telephone: school.phoneHref,
		email: school.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'UN City',
			addressLocality: 'Kasoa',
			addressCountry: 'GH',
		},
		...(process.env.NEXT_PUBLIC_SITE_URL ? { url: origin } : {}),
	};

	return (
		<html lang="en">
			<body>
				<a className="skip-link" href="#main">Skip to content</a>
				<AnnouncementBar />
				<Navbar />
				<main id="main">{children}</main>
				<Footer />
				<FloatingActions />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
				/>
			</body>
		</html>
	);
}
