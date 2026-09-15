import { links } from '../lib/content';
export default function sitemap(){const origin=process.env.NEXT_PUBLIC_SITE_URL;if(!origin)return [];return links.map(([,path])=>({url:`${origin.replace(/\/$/,'')}${path}`,changeFrequency:'monthly',priority:path==='/'?1:0.8}))}
