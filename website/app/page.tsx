'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,MoveUpRight} from 'lucide-react';
import {NativeSelect,NativeSelectOption} from '@/components/ui/native-select';
import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@/components/ui/table';
import data from '@/lib/records.json';
import {selectRecords,averages} from '@/lib/study.mjs';
const source='https://github.com/ashishoutlier/Iris_Analysis';
const features={sepal_length:'Sepal length',sepal_width:'Sepal width',petal_length:'Petal length',petal_width:'Petal width'};
type Feature=keyof typeof features;
const species=['setosa','versicolor','virginica'];
const colors:Record<string,string>={setosa:'#176657',versicolor:'#af751e',virginica:'#6b648e'};
const pretty=(s:string)=>s.charAt(0).toUpperCase()+s.slice(1);
const bounds=(key:Feature)=>[Math.floor(Math.min(...data.map(r=>r[key]))*2)/2-.2,Math.ceil(Math.max(...data.map(r=>r[key]))*2)/2+.2];
function Axis({label,value,onChange}:{label:string;value:Feature;onChange:(value:Feature)=>void}) {
 return <label className="axis-control"><span>{label}</span><NativeSelect value={value} onChange={e=>onChange(e.target.value as Feature)} className="field-select">{Object.entries(features).map(([key,label])=><NativeSelectOption value={key} key={key}>{label}</NativeSelectOption>)}</NativeSelect></label>;
}
export default function Home() {
 const [active,setActive]=useState('All'),[x,setX]=useState<Feature>('petal_length'),[y,setY]=useState<Feature>('petal_width'),[selectedId,setSelectedId]=useState(1),[page,setPage]=useState(0);
 const rows=useMemo(()=>selectRecords(data,active),[active]);
 const means=useMemo(()=>averages(rows,Object.keys(features)),[rows]);
 const selected=rows.find(r=>r.id===selectedId)||rows[0];
 const [xmin,xmax]=bounds(x),[ymin,ymax]=bounds(y);
 const cx=(v:number)=>70+(v-xmin)/(xmax-xmin)*646,cy=(v:number)=>342-(v-ymin)/(ymax-ymin)*286;
 const pageCount=Math.ceil(rows.length/10);
 const changeSpecies=(s:string)=>{setActive(s);setPage(0);};
 return <><a href="#measurements" className="skip">Skip to measurements</a><header><a href="./" className="brand">Iris <span>field notes</span></a><nav><a href="#specimens">The specimens</a><a href={source}>The notebook <ArrowUpRight size={15}/></a></nav></header>
 <main><section className="intro"><div><p className="byline">A botanical data study by Ashish</p><h1>Small differences.<br/><em>Distinct species.</em></h1></div><p>Four measurements reveal the shape of three iris species. Look closely at 150 flowers, one specimen at a time.</p></section>
 <div className="specimen-nav" role="group" aria-label="Filter species">{['All',...species].map(s=><button key={s} onClick={()=>changeSpecies(s)} aria-pressed={active===s} className={active===s?'active':''}>{s!=='All'&&<i style={{background:colors[s]}}/>}{s==='All'?'All species':pretty(s)}<span>{s==='All'?150:50}</span></button>)}</div>
 <section className="measurement-layout" id="measurements"><div className="plot-section"><div className="section-heading"><div><p className="overline">Patterns in the measurements</p><h2>Where the species meet</h2></div><span className="unit">Centimetres</span></div><div className="axis-controls"><Axis label="Horizontal axis" value={x} onChange={setX}/><Axis label="Vertical axis" value={y} onChange={setY}/></div>
 <svg className="scatter" viewBox="0 0 760 410" role="img" aria-label={`${features[y]} plotted against ${features[x]} for ${rows.length} flowers. Exact measurements and specimen selection are available in the table below.`}>
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="70" x2="716" y1={342-t*286} y2={342-t*286} className="grid"/><text x="54" y={346-t*286} textAnchor="end">{(ymin+t*(ymax-ymin)).toFixed(1)}</text><text x={70+t*646} y="368" textAnchor="middle">{(xmin+t*(xmax-xmin)).toFixed(1)}</text></g>)}
 <text x="394" y="405" textAnchor="middle" className="axis-label">{`${features[x]} (cm)`}</text><text transform="translate(18 203) rotate(-90)" textAnchor="middle" className="axis-label">{`${features[y]} (cm)`}</text>
 {rows.map(r=><circle key={r.id} cx={cx(r[x])} cy={cy(r[y])} r={r.id===selected.id?7:4.3} fill={colors[r.species]} opacity={r.id===selected.id?1:.6} stroke={r.id===selected.id?'#143d33':'#fff'} strokeWidth={r.id===selected.id?2:1} onClick={()=>setSelectedId(r.id)} className="point"><title>{`Specimen ${r.id}, ${r.species}. ${features[x]} ${r[x]} cm; ${features[y]} ${r[y]} cm.`}</title></circle>)}
 </svg><div className="legend">{species.map(s=><span key={s}><i style={{background:colors[s]}}/>{pretty(s)}</span>)}</div><p className="plot-note">Each point is one flower. Overlapping measurements can hide points. Axis ranges stay fixed when you filter a species.</p></div>
 <aside className="specimen"><div className="specimen-title"><span>Selected specimen</span><MoveUpRight size={19}/></div><p className="specimen-id">Iris · {String(selected.id).padStart(3,'0')}</p><h2>{pretty(selected.species)}</h2><p className="latin">Iris {selected.species}</p><dl>{Object.entries(features).map(([key,label])=><div key={key}><dt>{label}</dt><dd>{selected[key as Feature].toFixed(1)} <small>cm</small></dd></div>)}</dl><p className="specimen-note">Choose a point or a specimen in the table to examine its measurements.</p><a href="#specimens">Browse the specimens <ArrowUpRight size={15}/></a></aside></section>
 <section className="means" aria-live="polite"><div><p className="overline">Averages for this selection</p><h2>{active==='All'?'All 150 flowers':`50 ${active} flowers`}</h2></div><dl>{Object.entries(features).map(([key,label])=><div key={key}><dt>{label}</dt><dd>{means[key]?.toFixed(2)}<small>cm</small></dd></div>)}</dl></section>
 <section className="table-section" id="specimens"><div className="section-heading"><div><p className="overline">The observations</p><h2>A closer look</h2></div><span className="table-count">{rows.length} specimens</span></div><Table><TableHeader><TableRow><TableHead>Specimen</TableHead><TableHead>Species</TableHead>{Object.values(features).map(f=><TableHead key={f} className="numeric">{f}<span className="table-unit">cm</span></TableHead>)}</TableRow></TableHeader><TableBody>{rows.slice(page*10,(page+1)*10).map(r=><TableRow key={r.id} data-selected={r.id===selected.id}><TableCell><button onClick={()=>setSelectedId(r.id)} className="specimen-button" aria-pressed={r.id===selected.id}>{String(r.id).padStart(3,'0')}<ArrowUpRight size={13}/></button></TableCell><TableCell><span className="species-cell"><i style={{background:colors[r.species]}}/>{pretty(r.species)}</span></TableCell>{Object.keys(features).map(f=><TableCell key={f} className="numeric">{r[f as Feature].toFixed(1)}</TableCell>)}</TableRow>)}</TableBody></Table><div className="pagination"><p>Showing {page*10+1} to {Math.min((page+1)*10,rows.length)} of {rows.length}</p><div><button aria-label="Previous specimens" onClick={()=>setPage(page-1)} disabled={!page}><ChevronLeft size={18}/></button><span>{page+1} / {pageCount}</span><button aria-label="Next specimens" onClick={()=>setPage(page+1)} disabled={page+1===pageCount}><ChevronRight size={18}/></button></div></div></section>
 <section className="notes"><h2>What these flowers<br/>can tell us.</h2><div><p>The Iris dataset contains 50 observations from each of three species. Sepals are the outer floral parts; petals are the inner parts. Their lengths and widths are measured in centimetres.</p><p>The notebook explores visual patterns and several classification methods. This page stays with the measurements. It does not classify a new flower or claim a model accuracy.</p><a href="https://github.com/mwaskom/seaborn-data/blob/master/iris.csv">Dataset from the Seaborn collection <ArrowUpRight size={15}/></a></div></section>
 </main><footer><span>Field notes by Ashish</span><a href={source}>Explore the full project <ArrowUpRight size={15}/></a></footer></>;
}
