import { getAwardRows } from "@/lib/googleSheets";

export async function AwardsShelf() {
  const awards = await getAwardRows();

  return (
    <section id="Awards">
      <h1>Awards</h1>
      <div className="awards-shelf">
        {awards.map((award, index) => (
          <article key={`${award.date}-${index}`} className="award-frame">
            <div className="award-image-wrapper">
              {/* 画像URLはスプレッドシートから取得 */}
              <img
                src={award.imageUrl}
                alt={award.title}
                className="award-image"
                loading="lazy"
              />
            </div>
            <div className="award-meta">
              <div className="award-date">{award.date}</div>
              {award.linkUrl ? (
                <a
                  href={award.linkUrl}
                  className="award-title"
                  target="_blank"
                  rel="noreferrer"
                >
                  {award.title}
                </a>
              ) : (
                <div className="award-title">{award.title}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

