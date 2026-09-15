import { PageHero } from '../../components/ui';
import GalleryGrid from '../../components/gallery';
import { pageMetadata } from '../../lib/content';
export const metadata=pageMetadata('Gallery','Explore school life, events, academics and achievements at Eunivans Educational Centre.');
export default function Gallery(){return <><PageHero eyebrow="Our gallery" title="Little moments. Lasting memories.">A window into learning, growing and celebrating together.</PageHero><section className="section"><div className="container"><p className="notice">The school photographs were not available with this project. These labelled illustrations reserve their places; they do not depict Eunivans pupils or events.</p><GalleryGrid/></div></section></>}
