export const school = { name: 'Eunivans Educational Centre', email: 'eunivanseduk2@gmail.com', phone: '024 467 4934', phoneHref: '+233244674934', alternate: '024 437 6748', alternateHref: '+233244376748', whatsapp: 'https://wa.me/233244674934', location: 'UN City, Kasoa, Ghana' };
export const links = [['Home','/'],['About','/about'],['Academics','/academics'],['Admissions','/admissions'],['Student Life','/student-life'],['Gallery','/gallery'],['Contact','/contact']];
export const programmes = [
 { title:'Creche & Kindergarten', slug:'early-years', icon:'Sprout', ages:'A joyful beginning', description:'Little discoveries. Lifelong foundations. A nurturing space where curiosity grows and every child feels at home.', areas:['Phonics & numeracy','Creativity & communication','Social skills & confidence'] },
 { title:'Primary School', slug:'primary', icon:'BookOpen', ages:'Classes 1–6', description:'Building strong academic and moral foundations through purposeful learning, encouragement and discovery.', areas:['GES-approved curriculum','Academic & moral foundations','Disciplined, supportive learning'] },
 { title:'Junior High School', slug:'jhs', icon:'GraduationCap', ages:'JHS 1–3', description:'Preparing confident young people for their next chapter, with focused teaching and guidance for the BECE.', areas:['Subject-focused teaching','Mock examinations','Guidance & counselling'] }
];
export const values = ['Integrity','Excellence','Hard work','Discipline','Teamwork'];
export const vision = 'To be a leading centre of excellence, raising children with integrity, knowledge, and confidence.';
export const mission = 'To provide holistic, quality, and affordable education through dedicated teaching, moral discipline, and a safe learning environment.';
// Replace these illustration records with inspected school photographs when supplied.
export const gallery = [
 {id:1,title:'Internal spelling competition',category:'Academics',src:'/images/learning-placeholder.svg',alt:'Illustrated books and academic motifs; spelling competition photograph pending'},
 {id:2,title:'Graduation & prize-giving',category:'Events',src:'/images/celebration-placeholder.svg',alt:'Illustrated graduation cap; graduation photograph pending'},
 {id:3,title:'Student recognition & awards',category:'Achievements',src:'/images/awards-placeholder.svg',alt:'Illustrated award; student recognition photograph pending'},
 {id:4,title:'School leadership & public events',category:'Events',src:'/images/celebration-placeholder.svg',alt:'Academic celebration illustration; leadership event photograph pending'},
 {id:5,title:'Growing together',category:'School Life',src:'/images/learning-placeholder.svg',alt:'Learning illustration; school life photograph pending'}
];
export function pageMetadata(title, description) { return {title, description, openGraph:{title:`${title} | Eunivans Educational Centre`,description},twitter:{card:'summary_large_image',title,description}}; }
