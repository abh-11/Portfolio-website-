import Image from "next/image";
import Icon from "@/components/Icon";
import Journal from "@/components/Journal";
import Playground from "@/components/Playground";
import Specimen from "@/components/Specimen";
import { getPortfolio } from "@/data/read-portfolio";
import { withBasePath } from "@/lib/site";

const chapters = [
  {id:"about", subject:"sprig", tag:"ABOUT", title:"My story", detail:"A little about the person behind the pages."},
  {id:"journal", subject:"book", tag:"JOURNAL", title:"Field notes", detail:"Learning, projects, and a visual collection."},
  {id:"playground", subject:"butterfly", tag:"PLAYGROUND", title:"The playground", detail:"Small, interactive escapes into nature."},
] as const;

function ChapterIndex() {
  return <section className="index-section wrap" id="index" aria-labelledby="index-title">
    <div className="section-heading"><div><p className="overline"><span/> JOURNAL INDEX</p>
      <h2 id="index-title">Choose a <em>path.</em></h2></div>
      <a href="#gallery" className="index-aside">View nature gallery <Icon name="arrow-up-right" size={15}/></a>
    </div>
    <div className="chapter-grid">{chapters.map((chapter,i)=><a key={chapter.id} href={`#${chapter.id}`} className={`chapter chapter-${chapter.subject}`}>
      <div className="chapter-top"><span>0{i+1} <b>/</b> {chapter.tag}</span><i><Icon name="arrow-up-right" size={15}/></i></div>
      <Specimen subject={chapter.subject}/>
      <div className="chapter-info"><h3>{chapter.title}</h3><p>{chapter.detail}</p></div>
    </a>)}</div>
  </section>;
}

export default function Home() {
  const { profile, links } = getPortfolio();
  return <><main id="main" tabIndex={-1}>
    <section id="home" className="hero" aria-labelledby="hero-name">
      <Image preload src={withBasePath("/images/hero.webp")} alt="" fill sizes="100vw" className="hero-image"/>
      <div className="hero-shade"/>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="overline hero-kicker"><span/> A PERSONAL FIELD JOURNAL</p>
          <h1 id="hero-name">{profile.name}<em aria-hidden="true">.</em></h1>
          <p className="hero-role">{profile.role} <span>·</span> {profile.institution}</p>
          <p className="hero-intro">{profile.intro ?? "A quiet corner of the web for learning, creating, and following curiosity wherever it grows."}</p>
          <div className="hero-actions"><a href="#index" className="button primary"><Icon name="book-open" size={17}/> Explore my journal</a>
            <a href="#contact" className="button secondary">Get in touch <Icon name="arrow-up-right" size={16}/></a></div>
          <div className="hero-social"><a href={links.github}><Icon name="github" size={15}/>GitHub</a><span/><a href={links.linkedin}><Icon name="linkedin" size={15}/>LinkedIn</a></div>
        </div>
        <div className="hero-caption"><span/> <i>Fig. 01</i> &nbsp; Fern study</div>
      </div>
    </section>
    <ChapterIndex/>
    <section className="story-section wrap" id="about" aria-labelledby="story-heading">
      <div className="story-picture"><Image src={withBasePath("/images/fern.webp")} fill sizes="(max-width: 740px) 88vw, 40vw" alt="A close study of fern fronds"/><span className="figure-label">Fig. 02 &nbsp; / &nbsp; Fronds</span></div>
      <div className="story-copy"><p className="overline"><span/> 01 / ABOUT</p><h2 id="story-heading">My <em>story.</em></h2>
      <p className="story-intro">I’m {profile.name}, a computer science and engineering student at {profile.institution}.</p>
      <div className="story-note"><h3>Thoughts &amp; vision</h3><p>{profile.thoughts ?? "This page is open for my first reflection."}</p></div>
      <div className="story-note"><h3>Life philosophy</h3><p>{profile.philosophy ?? "A personal note to come."}</p></div></div>
    </section>
    <Journal/>
    <section id="playground" className="playground-section wrap" aria-labelledby="play-title">
      <p className="overline"><span/> 03 / PLAYGROUND</p><div className="section-heading"><h2 id="play-title">The <em>playground.</em></h2></div>
      <Playground/>
    </section>
    <section id="contact" className="contact-block"><div className="wrap contact-inner">
      <div><p className="overline"><span/> CONTACT</p><h2>Let’s <em>connect.</em></h2><p>Find me on GitHub or reach out on LinkedIn.</p></div>
      <div className="contact-links">{links.email && <a href={`mailto:${links.email}`}><Icon name="mail"/>Email <Icon name="arrow-up-right"/></a>}
        <a href={links.linkedin}><Icon name="linkedin"/>LinkedIn <Icon name="arrow-up-right"/></a><a href={links.github}><Icon name="github"/>GitHub <Icon name="arrow-up-right"/></a>
        {links.instagram && <a href={links.instagram}><Icon name="camera"/>Instagram <Icon name="arrow-up-right"/></a>}</div>
    </div></section>
    </main><footer className="wrap site-footer"><span><Icon name="sprout" size={19}/> {profile.name}</span><a href="#home">Back to top <Icon name="arrow-down" size={14}/></a></footer></>;
}
