import Link from "next/link";
import NewsAutoRefresh from "../components/NewsAutoRefresh";
import NewsCover from "../components/NewsCover";
import MatchThreeNumbers from "../components/MatchThreeNumbers";
import UpcomingMatchCards from "../components/UpcomingMatchCards";
import ItalianTeamOfWeek from "../components/ItalianTeamOfWeek";
import NewsletterBox from "../components/NewsletterBox";
import { getOfficialMilanCover } from "../lib/acmilan-news";
import { getLocalNews, localNewsHref } from "../lib/local-news";
import { serieA, europaLeague } from "../lib/home-standings";
import { italianWonderkids } from "../lib/italian-wonderkids";
import { milanSquad } from "../lib/milan-squad";
import { sectionMetadata } from "../lib/site-seo";
import { supabase } from "../lib/supabase";
import styles from "./home.module.css";

export const metadata = sectionMetadata("/");

type Story = { title: string; source: string; date: string; category?: string; href: string; image?: string; coverSource?: string };
function dateLabel(date: string) {
  const hasTime = /T\d{2}:\d{2}/.test(date);
  return new Intl.DateTimeFormat("it-IT", { timeZone: "Europe/Rome", day: "numeric", month: "short", ...(hasTime ? { hour: "2-digit", minute: "2-digit" } : {}) }).format(new Date(date));
}
function StoryMeta({ story }: { story: Story }) {
  return <p className={styles.meta}><time dateTime={story.date}>{dateLabel(story.date)}</time><span>{story.source}</span></p>;
}
function SectionHeading({ title, href, label = "Vedi tutto" }: { title: string; href: string; label?: string }) {
  return <header className={styles.sectionHeading}><h2>{title}</h2><Link href={href}>{label}</Link></header>;
}

export default async function Home() {
  const [local, editorialResult, videoResult] = await Promise.all([
    getLocalNews(),
    supabase.from("news").select("id,title,category,image_url,created_at").order("created_at", { ascending: false }).limit(24).abortSignal(AbortSignal.timeout(5000)),
    supabase.from("creator_videos").select("id,title,creator,youtube_url,published_at").order("published_at", { ascending: false }).limit(3).abortSignal(AbortSignal.timeout(5000)),
  ]);
  const all: Story[] = [
    ...local.map(story => ({ ...story, href: localNewsHref(story.id) })),
    ...(editorialResult.data ?? []).map(story => ({ title: story.title, source: "Redazione AC1899", date: story.created_at, category: story.category, image: story.image_url, href: `/news/${story.id}` })),
  ];
  const seen = new Set<string>();
  const sorted = all.filter(story => Number.isFinite(Date.parse(story.date)) && Date.parse(story.date) <= Date.now())
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.href.localeCompare(b.href))
    .filter(story => { const key = story.title.toLocaleLowerCase("it").replace(/[^\p{L}\p{N}]/gu, ""); if (seen.has(key)) return false; seen.add(key); return true; });
  const featured = await Promise.all(sorted.slice(0, 12).map(async story => ({ ...story,
    image: story.image || (story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined),
  })));
  const [lead, ...others] = featured;
  const side = others.slice(0, 2);
  const more = others.slice(2, 11);
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("it").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const squadNames = milanSquad.flatMap(group => group.players.map(player => normalize(player[1].split(" ").slice(1).join(" ")))).filter(name => name.length > 3);
  const medicalPlayers = new Set<string>();
  const medical = sorted.filter(story => {
    if (!/infortun|rientr|recuper|esami|precauz|risonanza|maignan/i.test(story.title) || story.category === "Interviste") return false;
    const title = ` ${normalize(story.title)} `;
    const players = squadNames.filter(name => title.includes(` ${name} `));
    if (!players.some(name => !medicalPlayers.has(name))) return false;
    players.forEach(name => medicalPlayers.add(name));
    return true;
  }).slice(0, 2);
  const topics = [
    { title: "Mercato", query: "", category: "Mercato", pattern: /mercato|endrick|tresoldi|prestito|rinnovo/i },
    { title: "Nazionali", query: "", category: "Nazionali", pattern: /nazional|francia|portogallo|pulisic|belgio|azzurr/i },
    { title: "Milan Femminile", query: "femminile", category: "", pattern: /femminil|women|rossoner[e]/i },
  ];
  const milan = serieA.find(row => row[1] === "AC Milan");
  const europeanMilan = europaLeague.find(row => row[1] === "AC Milan");
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" }).format(new Date());
  return <main className={`ac1899-home ${styles.home}`}>
    <NewsAutoRefresh />
    <div className={styles.masthead}><div className={styles.wrap}>
      <p>IL MILAN, OGNI GIORNO. <strong>CON RABDO.</strong></p>
      <nav aria-label="Accesso rapido"><Link href="#ultime-notizie">Ultime notizie</Link><Link href="#punto-rabdo">Il punto di Rabdo</Link><Link href="/campionato/analisi">Verso la prossima</Link></nav>
    </div></div>
    <div className={styles.wrap}>
      {lead && <div className={styles.latestStrip}><span>ULTIMA PUBBLICAZIONE</span><time dateTime={lead.date}>{dateLabel(lead.date)}</time><Link href={lead.href}>{lead.title}</Link></div>}
      <section className={styles.opening} aria-label="Notizie in primo piano">
        {lead ? <article className={styles.lead}>
          <Link href={lead.href} aria-label={`Leggi: ${lead.title}`}><NewsCover image={lead.image} title={lead.title} category={lead.category} /></Link>
          <div className={styles.leadCopy}><span className={styles.eyebrow}>{lead.category || "Primo piano"}</span><h1><Link href={lead.href}>{lead.title}</Link></h1><StoryMeta story={lead} /><Link className={styles.readLink} href={lead.href}>Leggi l’articolo</Link></div>
        </article> : <div className={styles.panel}><h1>Il tuo quotidiano rossonero</h1><Link href="/news">Apri l’archivio notizie</Link></div>}
        <div className={styles.sideNews}>{side.map(story => <article key={story.href}>
          <Link href={story.href} tabIndex={-1} aria-hidden="true"><NewsCover image={story.image} title={story.title} category={story.category} /></Link>
          <div><span className={styles.eyebrow}>{story.category || "Notizie"}</span><h2><Link href={story.href}>{story.title}</Link></h2><StoryMeta story={story} /></div>
        </article>)}</div>
      </section>
      <div className={styles.newsLayout}>
        <section id="ultime-notizie" className={styles.newsSection}>
          <SectionHeading title="Il filo rossonero" href="/news" label="Tutte le notizie" />
          <p className={styles.intro}>Le ultime pubblicazioni, dalla più recente. L’orario è quello dell’articolo.</p>
          <div className={styles.newsGrid}>{more.map(story => <article className={styles.newsCard} key={story.href}>
            <Link href={story.href} tabIndex={-1} aria-hidden="true"><NewsCover image={story.image} title={story.title} category={story.category} /></Link>
            <div className={styles.cardCopy}><span className={styles.eyebrow}>{story.category || "Notizie"}</span><h3><Link href={story.href}>{story.title}</Link></h3><StoryMeta story={story} /></div>
          </article>)}</div>
          <Link className={styles.archiveLink} href="/news">Esplora l’archivio completo</Link>
        </section>
        <aside className={styles.sidebar} aria-label="La voce di Rabdo e aggiornamenti Milan">
          <section id="punto-rabdo" className={styles.rabdo} aria-labelledby="rabdo-title">
            <div className={styles.rabdoTop}><span className={styles.eyebrow}>LA MIA OPINIONE</span><span className={styles.signature} aria-hidden="true">R.</span></div>
            <h2 id="rabdo-title">Il punto<br />di Rabdo<span>.</span></h2>
            <p className={styles.rabdoClaim}>La mia lettura del Milan.<br />Ogni mattina, senza giri di parole.</p>
            <div className={styles.launch}>DA LUNEDÌ 23 NOVEMBRE 2026</div>
            <p>Qui leggerai il mio editoriale del mattino: una posizione, i fatti e le ragioni per discuterne insieme.</p>
            <p className={styles.byline}>Rabdo <span>· AC1899</span></p>
          </section>
          <section className={styles.panel} aria-labelledby="situation-title"><span className={styles.eyebrow}>IL PUNTO SULLA SQUADRA</span><h2 id="situation-title">Situazione Milan</h2>
            {medical.length ? medical.map(story => <Link key={story.href} className={styles.updateLink} href={story.href}><time dateTime={story.date}>{dateLabel(story.date)}</time><strong>{story.title}</strong><span>{story.source}</span></Link>) : <p>Notizie e aggiornamenti della prima squadra nell’archivio.</p>}
            <Link className={styles.readLink} href="/milan">Rosa e statistiche giocatori</Link>
          </section>
          <section className={styles.panel}><span className={styles.eyebrow}>CERCA IL TUO ARGOMENTO</span><h2>Dentro la notizia</h2>
            <form action="/news" className={styles.search}><label htmlFor="home-search">Giocatore o argomento</label><div><input id="home-search" name="q" placeholder="Maignan, mercato…" /><button type="submit">Cerca</button></div></form>
            <div className={styles.chips}>{["Maignan", "Pulisic", "Ramos", "Rinnovo"].map(name => <Link key={name} href={name === "Rinnovo" ? "/news?q=Rinnovo" : `/dossier/${name.toLowerCase()}`}>{name}</Link>)}</div>
          </section>
        </aside>
      </div>
    </div>
    <section className={styles.videoBand}><div className={styles.wrap}>
      <div className={styles.videoIntro}><span className={styles.eyebrow}>LA VOCE DI AC1899</span><h2>Rabdo, a tutto Milan.</h2><p>Il programma da lunedì: un video al giorno durante la settimana, il prepartita e il commento dopo il fischio finale.</p><Link href="/creator-video">Entra nella Creator Room</Link></div>
      <div className={styles.videoSchedule}>{[["OGNI MATTINA", "L’editoriale", "Il tema del giorno, la mia opinione."], ["PRIMA E DOPO LA GARA", "Dentro la partita", "Attese, scelte e commento a caldo."], ["DURANTE LA SETTIMANA", "Un video al giorno", "I temi li scegliamo insieme."]].map(([label, title, text]) => <div key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      {!!videoResult.data?.length && <div className={styles.publishedVideos}><h3>Già nella Creator Room</h3>{videoResult.data.filter(video => /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(video.youtube_url || "")).map(video => <a key={video.id} href={video.youtube_url} target="_blank" rel="noopener noreferrer"><span>VIDEO · {video.creator}</span><strong>{video.title}</strong></a>)}</div>}
    </div></section>
    <div className={styles.sportBand} id="ai-room"><div className={styles.wrap}>
      <UpcomingMatchCards today={today} />
      <SectionHeading title="Il campo, in breve" href="/campionato/analisi" label="Analisi e grafici completi" />
      <div className={styles.matchLayout}><MatchThreeNumbers /><div className={styles.competitions}>
        <section className={styles.leagueCard}><span className={styles.eyebrow}>SERIE A · 2026/27</span><h3>La corsa in campionato</h3>{milan && <div className={styles.stats}><div><strong>{milan[0]}°</strong><span>Posizione</span></div><div><strong>{milan[2]}</strong><span>Punti</span></div><div><strong>{milan[3]}</strong><span>Partite</span></div></div>}<p>Dati presenti al 15 novembre 2026.</p><Link href="/campionato">Classifica e statistiche</Link></section>
        <section id="europa" className={styles.europeCard}><span className={styles.eyebrow}>EUROPA LEAGUE · 2026/27</span><h3>Il cammino europeo</h3>{europeanMilan && <div className={styles.stats}><div><strong>{europeanMilan[0]}°</strong><span>Posizione</span></div><div><strong>{europeanMilan[2]}</strong><span>Punti</span></div><div><strong>{europeanMilan[3]}</strong><span>Partite</span></div></div>}<p>Situazione dopo quattro giornate.</p><Link href="/europa-league">Risultati e prossimo avversario</Link></section>
      </div></div>
    </div></div>
    <div className={styles.wrap}>
      <section className={styles.topicSection} aria-label="Notizie per argomento">{topics.map(topic => {
        const stories = sorted.filter(story => topic.pattern.test(story.title + " " + story.category)).slice(0, 3);
        return <div key={topic.title} className={styles.topicCard}><SectionHeading title={topic.title} href={topic.title === "Milan Femminile" ? "/milan-femminile" : `/news?categoria=${encodeURIComponent(topic.category)}`} label="Esplora" />{stories.length ? stories.map(story => <Link className={styles.topicStory} href={story.href} key={story.href}><time dateTime={story.date}>{dateLabel(story.date)}</time><strong>{story.title}</strong></Link>) : <p>Scopri le notizie e gli approfondimenti della sezione.</p>}</div>;
      })}</section>
    </div>
    <div className={styles.youthBand}><div className={styles.wrap}>
      <SectionHeading title="Il futuro è già qui" href="/wonderkids" label="Tutti i Wonderkids" />
      <p className={styles.intro}>Talenti italiani Under 18, in Serie A, B, C e all’estero. Selezione editoriale e rendimento documentato.</p>
      <div className={styles.youngGrid}>{italianWonderkids.slice(0, 3).map(player => <Link key={player.name} className={styles.youngCard} href="/wonderkids"><span>{player.role} · {player.national}</span><h3>{player.name}</h3><p>{player.club}</p><p>{player.evidence}</p></Link>)}</div>
      <details className={styles.lineup}><summary>Scopri l’undici italiano Under 18 della settimana</summary><ItalianTeamOfWeek /></details>
    </div></div>
    <div className={styles.wrap}><div className={styles.bottomLinks}><Link href="/mvp-del-mese"><span>I PROTAGONISTI</span><strong>MVP, mese dopo mese</strong><p>L’archivio dei premi e dei giocatori decisivi.</p></Link><Link href="/community"><span>LA COMMUNITY</span><strong>Il Milan si vive insieme</strong><p>Entra nello spazio dei tifosi rossoneri.</p></Link></div><NewsletterBox /></div>
  </main>;
}
