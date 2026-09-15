import { ImageResponse } from 'next/og';
export const alt='Eunivans Educational Centre — Integrity and Excellence';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{height:'100%',width:'100%',background:'#260B64',color:'white',display:'flex',flexDirection:'column',justifyContent:'center',padding:'80px',borderBottom:'14px solid #F4B400'}}><div style={{color:'#FFD45C',fontSize:22,letterSpacing:5,marginBottom:35}}>UN CITY, KASOA · ESTABLISHED 2006</div><div style={{fontSize:72,lineHeight:1.1,display:'flex',flexDirection:'column'}}>Eunivans<br/>Educational Centre</div><div style={{fontSize:32,marginTop:35,color:'#FFD45C'}}>Integrity and Excellence</div></div>,size)}

