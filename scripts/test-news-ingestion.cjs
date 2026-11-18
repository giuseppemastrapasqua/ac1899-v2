const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('lib/local-news.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
let fetches=0, rewrites=0, modelFails=false, saveFails=false;
const tables={ac1899_news_archive:new Map(),ac1899_news_queue:new Map()};
function builder(name){
 let action='read',rows,filter;
 const b={select(){return b},order(){return b},limit(){return b},eq(k,v){filter=[k,v];return b},maybeSingle(){return b},upsert(value){action='insert';rows=Array.isArray(value)?value:[value];return b},update(value){action='update';rows=value;return b},delete(){action='delete';return b},then(resolve,reject){
  try{
   const table=tables[name]; let data=[];
   if(action==='insert'){
    if(saveFails && name==='ac1899_news_archive'){action='read';return Promise.resolve({data:null,error:{code:'storage_failure'}}).then(resolve,reject);}
    for(const row of rows)if(!table.has(row.id)){table.set(row.id,row);data.push({id:row.id})}
   } else if(action==='read') data=[...table.values()];
   else for(const [id,row] of table)if(!filter||row[filter[0]]===filter[1]){if(action==='delete')table.delete(id);else table.set(id,{...row,...rows})}
   action='read';filter=undefined;return Promise.resolve({data,error:null}).then(resolve,reject);
  }catch(e){return Promise.reject(e).then(resolve,reject)}
 }};return b;
}
class FakeOpenAI{static APIError=Error;chat={completions:{create:async()=>{rewrites++;if(modelFails)throw Error('temporary_failure');return {choices:[{message:{content:JSON.stringify({title:'Milan, aggiornamento verificato di prova',body:['Un fatto documentato nel materiale fornito, riscritto senza aggiungere informazioni non presenti nella fonte.']})}}]}}}}}
const moduleObject={exports:{}};
const context={module:moduleObject,exports:moduleObject.exports,process:{env:{NEXT_PUBLIC_SUPABASE_URL:'https://example.supabase.co',SUPABASE_SERVICE_ROLE_KEY:'test',OPENAI_API_KEY:'test'}},console:{info(){},warn(){},error(){}},URL,URLSearchParams,AbortSignal,Buffer,Date,Intl,Set,Map,Promise,
 require(name){if(name==='@supabase/supabase-js')return {createClient:()=>({from:builder})};if(name==='openai')return {__esModule:true,default:FakeOpenAI};if(name==='next/cache')return {unstable_cache:fn=>fn};if(name==='node:crypto')return require(name);if(name==='./api-football')return {getMilanLiveNews:async()=>[]};if(name==='./acmilan-news')return {getOfficialMilanNews:async()=>[]};if(name==='./milan-squad')return {milanSquad:[]};if(name==='./player-news-sources')return {playerNewsSources:[]};throw Error(name)},
 async fetch(url){fetches++;let text='<rss></rss>';if(String(url)==='https://www.pianetamilan.it/feed/'){const item=(slug,age)=>`<item><title>Milan: ${slug}</title><link>https://www.pianetamilan.it/${slug}/</link><pubDate>${new Date(Date.now()-age).toUTCString()}</pubDate><description>${'Fatti documentati della squadra rossonera. '.repeat(8)}</description></item>`;text='<rss>'+item('news-fresca',60000)+item('news-scaduta',11*60000)+'</rss>'}return {ok:true,text:async()=>text}}};
vm.runInNewContext(code,context);
const {getLocalNews}=moduleObject.exports;
(async()=>{
 await getLocalNews();assert.equal(fetches,0,'a page read must not scan feeds');assert.equal(rewrites,0,'a page read must not spend rewrite credits');
 modelFails=true;let report;await getLocalNews({ingest:true,onReport:r=>report=r});assert.equal(report.candidates,1,'exclude publications older than ten minutes');assert.equal(report.failed,1);assert.equal(tables.ac1899_news_queue.size,1,'retain failed rewrites');assert.equal(report.persisted,0);
 modelFails=false;saveFails=true;await getLocalNews({ingest:true,onReport:r=>report=r});assert.equal(report.persisted,0,'never claim publication if the database rejected it');assert.equal(tables.ac1899_news_queue.size,1,'retain a story after storage failure');
 saveFails=false;await getLocalNews({ingest:true,onReport:r=>report=r});assert.equal(report.persisted,1);assert.equal(tables.ac1899_news_archive.size,1);assert.equal(tables.ac1899_news_queue.size,0);
 const calls=rewrites;await getLocalNews({ingest:true,onReport:r=>report=r});assert.equal(report.persisted,0);assert.equal(rewrites,calls,'do not rewrite an already archived story');
 console.log('PASS: read-only pages, freshness window, retry, storage failure and duplicate prevention');
})().catch(e=>{console.error(e);process.exitCode=1});
