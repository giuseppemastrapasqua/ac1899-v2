const fs=require('fs'),vm=require('vm'),ts=require('typescript'),assert=require('node:assert/strict');
const source=ts.transpileModule(fs.readFileSync('lib/news-editorial-delivery.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
async function run({key=true,fail=false,duplicate=false,sent=false}={}) {
 const row={id:'candidate',candidate:{story:{id:'candidate',title:'Milan nuova notizia',date:'2026-11-19',source:'Sky Sport',coverSource:'https://sport.sky.it/article',body:[]},context:'x'.repeat(600),...(sent?{editorial:{status:'ready',title:'Testo',body:['Testo articolo verificato'],version:'abc',sentAt:'2026-11-19'}}:{})}};
 let emails=0,writes=[];
 function query(table){return {select(){return this},order(){return this},limit(){return Promise.resolve({data:table==='ac1899_news_queue'?[row]:[],error:null})},update(payload){return {eq:async()=>{writes.push(payload);return {error:null}}}}}}
 const exports={};vm.runInNewContext(source,{exports,require:n=>n==='@supabase/supabase-js'?{createClient:()=>({from:query})}:n==='./local-news'?{articleContext:async(u,c)=>c,generateBrief:async()=>duplicate?{duplicateOf:'existing'}:{title:'Titolo originale',body:['Paragrafo originale sufficientemente completo.']}}:require(n),process:{env:{NEXT_PUBLIC_SUPABASE_URL:'https://test.invalid',SUPABASE_SERVICE_ROLE_KEY:'test',AC1899_EDITORIAL_EMAIL:'editor@example.com',...(key?{RESEND_API_KEY:'test'}:{})}},console:{error(){}},AbortSignal,fetch:async(url,init)=>{emails++;assert.ok(init.headers['Idempotency-Key']);assert.equal(JSON.parse(init.body).to[0],'editor@example.com');return {ok:!fail,status:fail?500:200}}});
 const result=await exports.deliverEditorialDrafts();return {result,emails,writes,row};
}
(async()=>{
 let r=await run();assert.equal(r.result.sent,1);assert.ok(r.row.candidate.editorial.sentAt);
 r=await run({fail:true});assert.equal(r.result.sent,0);assert.equal(r.result.failed,1);assert.equal(r.row.candidate.editorial.sentAt,undefined);
 r=await run({key:false});assert.equal(r.emails,0);assert.equal(r.result.mailConfigured,false);
 r=await run({duplicate:true});assert.equal(r.emails,0);assert.equal(r.result.duplicates,1);
 r=await run({sent:true});assert.equal(r.emails,0);
 console.log('5 checks passed: delivery, retry, missing key, duplicates, already sent; no archive writes.');
})().catch(e=>{console.error(e);process.exit(1)});
