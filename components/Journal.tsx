import { getPortfolio } from "@/data/read-portfolio";
import type { ChapterId } from "@/data/portfolio";
import Gallery from "./Gallery";
import { Icon, type IconName } from "./Icon";
import "./journal.css";

const chapters: { id: ChapterId; title: string; icon: IconName; empty: string }[] = [
  { id: "education", title: "Education", icon: "graduation-cap", empty: "Education details have yet to be published." },
  { id: "skills", title: "Skills", icon: "code", empty: "A skills list has yet to be published." },
  { id: "projects", title: "Projects", icon: "layers", empty: "Project notes have yet to be published." },
  { id: "courses", title: "Courses", icon: "book-open", empty: "Course entries have yet to be published." },
  { id: "certificates", title: "Certificates", icon: "award", empty: "Certificate links have yet to be published." },
];

export default function Journal() {
  const { journal, gallery } = getPortfolio();
  return (
    <section id="journal" className="journal-section" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="journal-index">
          <div className="journal-intro">
            <Icon name="notebook" size={29} />
            <h2 id="journal-title">The learning journal</h2>
            <p>Education, coursework, and project notes, gathered in one place.</p>
          </div>
          <div className="journal-records">
            {chapters.map(({ id, title, icon, empty }) => (
              <details key={id} id={id} open={id === "education"}>
                <summary>
                  <h3>
                    <Icon name={icon} size={21} />{title}
                    <Icon name="chevron-down" size={17} className="journal-chevron" />
                  </h3>
                </summary>
                {journal[id].length ? (
                  <ul className="journal-entries">
                    {journal[id].map((entry) => (
                      <li key={entry.title}>
                        {entry.url ? <a href={entry.url}>{entry.title} <Icon name="arrow-up-right" size={14} /></a> : entry.title}
                        {entry.description && <span>{entry.description}</span>}
                      </li>
                    ))}
                  </ul>
                ) : <p className="journal-empty">{empty}</p>}
              </details>
            ))}
          </div>
        </div>
        <section id="gallery" className="journal-gallery" aria-labelledby="gallery-title">
          <div className="journal-gallery-heading">
            <h2 id="gallery-title">Nature gallery</h2>
            <p>Select an image to look closer.</p>
          </div>
          <Gallery images={gallery}/>
        </section>
      </div>
    </section>
  );
}
