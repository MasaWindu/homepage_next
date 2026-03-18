import {
  getBiographyRows,
  getPublicationRows,
  getQualificationRows,
  getVolunteerRows,
  getInternshipRows,
  getImageMap
} from "@/lib/googleSheets";
import { Header } from "@/components/Header";
import { AwardsShelf } from "@/components/AwardsShelf";

export default async function HomePage() {
  const [
    biography,
    publications,
    qualifications,
    volunteers,
    internships,
    images
  ] = await Promise.all([
    getBiographyRows(),
    getPublicationRows(),
    getQualificationRows(),
    getVolunteerRows(),
    getInternshipRows(),
    getImageMap()
  ]);

  const groupedPublications = publications.reduce<
    Record<string, typeof publications>
  >((acc, pub) => {
    if (!acc[pub.category]) acc[pub.category] = [];
    acc[pub.category].push(pub);
    return acc;
  }, {});

  return (
    <>
      <Header logoUrl={images["header_logo"] ?? "/img/icon-removebg-preview.png"} />
      <main className="contents">
        <section className="hero">
          <img
            src={images["profile"] ?? "/img/profile.jpg"}
            alt="Masato Yamagishi"
            className="thisisme"
          />
          <div id="myname">
            <img src={images["myname"] ?? "/img/myname.png"} alt="Masato Yamagishi Identification" />
            <hr className="name-separator" />
            <p>
              神戸市立工業高等専門学校<br />
              専攻科 電気電子工学専攻 2年<br />
              SAI（高田研究室）
            </p>
            <b>興味のある分野</b>
            <div className="interest-list">
              Human-Computer Interaction (HCI)<br />
              Sensing Interface<br />
              Wearable Computing<br />
              Augmented Human<br />
              Internet of Things (IoT)
            </div>
            <div id="icon">
              <a href="https://x.com/masato_yamagis" target="_blank" rel="noreferrer"><img src={images["icon_x"] ?? "/img/X.jpg"} alt="Twitter" /></a>
              <a href="https://github.com/MasaWindu" target="_blank" rel="noreferrer"><img src={images["icon_github"] ?? "/img/github.png"} alt="GitHub" /></a>
              <a href="https://sai.ac/project/WISS2024_yamagishi" target="_blank" rel="noreferrer"><img src={images["icon_sai"] ?? "/img/SAI.png"} alt="SAI" /></a>
            </div>
          </div>
        </section>

        <section id="Biography">
          <h1>Biography</h1>
          <div className="list-container">
            <table>
              <tbody>
                {biography.map((row, index) => (
                  <tr key={`${row.startDate}-${index}`}>
                    <td className="date-column">
                      <div className="date-range">
                        <div className="start-date">{row.startDate}</div>
                        {row.endDate && (
                          <>
                            <div className="date-separator">|</div>
                            <div className="end-date">{row.endDate}</div>
                          </>
                        )}
                      </div>
                    </td>
                    <td>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="Publications">
          <h1>Publication</h1>
          {Object.entries(groupedPublications).map(([category, items]) => (
            <div key={category} className="category-group">
              <h2>{category}</h2>
              {items.map((pub) => {
                const CardContent = (
                  <>
                    <div className="pub-authors">{pub.authors}</div>
                    <div className="pub-title"><strong>{pub.title}</strong></div>
                    <div className="pub-detail">{pub.detail}</div>
                  </>
                );

                return pub.linkUrl ? (
                  <a
                    href={pub.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="publication clickable"
                    key={`${pub.category}-${pub.title}-${pub.detail}`}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div
                    className="publication"
                    key={`${pub.category}-${pub.title}-${pub.detail}`}
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          ))}
        </section>

        <section id="Qualifications">
          <h1>Qualifications</h1>
          <div className="list-container">
            <table>
              <tbody>
                {qualifications.map((row) => (
                  <tr key={`${row.date}-${row.text}`}>
                    <td className="date-column">
                      <div className="single-date">{row.date}</div>
                    </td>
                    <td>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AwardsShelf />

        <section id="Volunteer">
          <h1>Volunteer</h1>
          <div className="list-container">
            <table>
              <tbody>
                {volunteers.map((row) => (
                  <tr key={`${row.date}-${row.text}`}>
                    <td className="date-column">
                      <div className="single-date">{row.date}</div>
                    </td>
                    <td>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="Internship">
          <h1>Internship</h1>
          <div className="list-container">
            <table>
              <tbody>
                {internships.map((row, index) => (
                  <tr key={`${row.startDate}-${index}`}>
                    <td className="date-column">
                      <div className="date-range">
                        <div className="start-date">{row.startDate}</div>
                        {row.endDate && (
                          <>
                            <div className="date-separator">|</div>
                            <div className="end-date">{row.endDate}</div>
                          </>
                        )}
                      </div>
                    </td>
                    <td>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer id="footer">
          <small>© Masato Yamagishi 2025</small>
        </footer>
      </main>
    </>
  );
}
