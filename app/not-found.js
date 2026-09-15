import Link from 'next/link';

export default function NotFound() {
	return (
		<section className="section not-found container">
			<span className="eyebrow">404 · A little off course</span>
			<h1>
				Let’s get you back
				<br />
				on the learning path.
			</h1>
			<p>The page you’re looking for could not be found.</p>
			<Link href="/" className="button purple-button">
				Back to home
			</Link>
		</section>
	);
}
