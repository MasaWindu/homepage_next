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
            <img src={images["myname"] ?? "/img/myname.png"} alt="name" />
            <p>
              神戸市立工業高等専門学校
              <br />
              専攻科　電気電子工学専攻　2年
              <br />
              SAI（髙田研究室）
              <br />
              <br />
              <b>興味のある分野</b>
              <br />
              Human-Computer Interaction(HCI)
              <br />
              Sensing Interface
              <br />
              Wearable Computing
              <br />
              Augmented Human
              <br />
              Internet of Things(IoT)
              <br />
            </p>
            <div id="icon">
              <a href="https://x.com/Masato_HCI">
                <img src={images["icon_x"] ?? "/img/X.jpg"} id="icon" alt="X" />
              </a>
              <a href="https://github.com/MasaWindu">
                <img src={images["icon_github"] ?? "/img/github.png"} id="icon" alt="GitHub" />
              </a>
              <a href="https://sai.ac/">
                <img src={images["icon_sai"] ?? "/img/SAI.png"} id="icon" alt="SAI" />
              </a>
            </div>
          </div>
        </section>

        <section id="Biography">
          <h1>Biography</h1>
          <table>
            <tbody>
              {biography.map((row) => (
                <tr key={`${row.date}-${row.text}`}>
                  <td>{row.date}</td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="Publications">
          <h1>Publication</h1>
          {Object.entries(groupedPublications).map(([category, items]) => (
            <div key={category}>
              <h2>{category}</h2>
              {items.map((pub) => (
                <div
                  className="publication"
                  key={`${pub.category}-${pub.title}-${pub.detail}`}
                >
                  {pub.authors}
                  <br />
                  {pub.title}
                  <br />
                  {pub.detail}
                  {pub.linkUrl && (
                    <a href={pub.linkUrl} target="_blank" rel="noreferrer">
                      <img src={images["icon_link"] ?? "/img/link.png"} alt="link" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>

        <section id="Qualifications">
          <h1>Qualifications</h1>
          <table>
            <tbody>
              {qualifications.map((row) => (
                <tr key={`${row.date}-${row.text}`}>
                  <td>{row.date}</td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <AwardsShelf />

        <section id="Volunteer">
          <h1>Volunteer</h1>
          <table>
            <tbody>
              {volunteers.map((row) => (
                <tr key={`${row.date}-${row.text}`}>
                  <td>{row.date}</td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="Internship">
          <h1>Internship</h1>
          <table>
            <tbody>
              {internships.map((row) => (
                <tr key={`${row.date}-${row.text}`}>
                  <td>{row.date}</td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer id="footer">
          <small>© Masato Yamagishi 2025</small>
        </footer>
      </main>
    </>
  );
}
