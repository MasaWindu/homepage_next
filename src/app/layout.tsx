import type { Metadata } from "next";
import "./globals.css";
import { getImageMap } from "@/lib/googleSheets";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateMetadata(): Promise<Metadata> {
  const images = await getImageMap();
  const ogImageUrl =
    images["og_image"] ?? "https://masatohci.com/img/profile.jpg";

  return {
    title: "山岸真人 | Masato Yamagishi",
    description:
      "神戸市立工業高等専門学校 専攻科 電気電子工学専攻 2年 SAI（髙田研究室）",
    keywords: [
      "山岸真人",
      "ヤマギシマサト",
      "山岸",
      "真人",
      "Masato",
      "Yamagishi",
      "まさと",
      "やまぎし",
      "マサト",
      "ヤマギシ"
    ],
    openGraph: {
      title: "山岸真人 | Masato Yamagishi",
      description:
        "神戸市立工業高等専門学校 専攻科 電気電子工学専攻 2年 SAI（髙田研究室）",
      url: "https://masatohci.com/",
      type: "website",
      images: [
        {
          url: ogImageUrl
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      site: "@Masato_HCI",
      title: "山岸真人 | Masato Yamagishi",
      description:
        "神戸市立工業高等専門学校 専攻科 電気電子工学専攻 2年 SAI（髙田研究室）",
      images: [ogImageUrl]
    },
    // 画像検索には出さない
    other: {
      robots: "noimageindex"
    }
  };
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
