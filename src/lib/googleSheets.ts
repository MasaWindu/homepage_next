type RawRow = string[];

function parseCsv(text: string): RawRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(","));
}

async function fetchSheet(envKey: string): Promise<RawRow[]> {
  const url = process.env[envKey];
  if (!url) {
    throw new Error(`環境変数 ${envKey} が設定されていません。`);
  }

  const separator = url.includes("?") ? "&" : "?";
  const bustUrl = `${url}${separator}_t=${Date.now()}`;

  const res = await fetch(bustUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Google Sheets の取得に失敗しました: ${envKey}`);
  }

  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length <= 1) return [];
  return rows.slice(1);
}

export type BiographyRow = {
  date: string;
  text: string;
};

export async function getBiographyRows(): Promise<BiographyRow[]> {
  const rows = await fetchSheet("BIOGRAPHY_SHEET_URL");
  return rows.map(([date, text = ""]) => ({ date, text }));
}

export type QualificationRow = {
  date: string;
  text: string;
};

export async function getQualificationRows(): Promise<QualificationRow[]> {
  const rows = await fetchSheet("QUALIFICATIONS_SHEET_URL");
  return rows.map(([date, text = ""]) => ({ date, text }));
}

export type PublicationRow = {
  category: string;
  authors: string;
  title: string;
  detail: string;
  linkUrl?: string;
};

export async function getPublicationRows(): Promise<PublicationRow[]> {
  const rows = await fetchSheet("PUBLICATIONS_SHEET_URL");
  return rows.map(
    ([
      category = "",
      authors = "",
      title = "",
      detail = "",
      linkUrl = ""
    ]) => ({
      category,
      authors,
      title,
      detail,
      linkUrl: linkUrl || undefined
    })
  );
}

export type AwardRow = {
  date: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
};

export async function getAwardRows(): Promise<AwardRow[]> {
  const rows = await fetchSheet("AWARDS_SHEET_URL");
  return rows.map(([date = "", title = "", imageUrl = "", linkUrl = ""]) => ({
    date,
    title,
    imageUrl,
    linkUrl: linkUrl || undefined
  }));
}

export type SimpleRow = {
  date: string;
  text: string;
};

export async function getVolunteerRows(): Promise<SimpleRow[]> {
  const rows = await fetchSheet("VOLUNTEER_SHEET_URL");
  return rows.map(([date = "", text = ""]) => ({ date, text }));
}

export async function getInternshipRows(): Promise<SimpleRow[]> {
  const rows = await fetchSheet("INTERNSHIP_SHEET_URL");
  return rows.map(([date = "", text = ""]) => ({ date, text }));
}

export type ImageRow = {
  key: string;
  url: string;
};

export async function getImageRows(): Promise<ImageRow[]> {
  const rows = await fetchSheet("IMAGES_SHEET_URL");
  return rows.map(([key = "", url = ""]) => ({ key: key.trim(), url: url.trim() }));
}

export async function getImageMap(): Promise<Record<string, string>> {
  const rows = await getImageRows();
  return rows.reduce<Record<string, string>>((acc, { key, url }) => {
    if (key) acc[key] = url;
    return acc;
  }, {});
}

