import { getAwardRows } from "@/lib/googleSheets";

export async function AwardsShelf() {
  const awards = await getAwardRows();

  return (
    <section id="Awards">
      <h1>Awards</h1>
      <div className="awards-shelf">
        {awards.map((award, index) => {
          const CardContent = (
            <article className="award-frame">
              <div className="award-image-wrapper">
                <img
                  src={award.imageUrl}
                  alt={award.title}
                  className="award-image"
                  loading="lazy"
                />
              </div>
              <div className="award-meta">
                <div className="award-date">{award.date}</div>
                <div className="award-title">{award.title}</div>
              </div>
            </article>
          );

          return award.linkUrl ? (
            <a
              key={`${award.date}-${index}`}
              href={award.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="award-card-link"
            >
              {CardContent}
            </a>
          ) : (
            <div key={`${award.date}-${index}`}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}

