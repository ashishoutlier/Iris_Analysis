export function selectRecords(records,species) {
 return species==='All'?records:records.filter(r=>r.species===species);
}
export function averages(records,features) {
 return Object.fromEntries(features.map(feature=>{
  const values=records.map(r=>r[feature]).filter(Number.isFinite);
  return [feature,values.length?values.reduce((a,b)=>a+b,0)/values.length:null];
 }));
}
