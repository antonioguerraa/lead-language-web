import * as cheerio from "cheerio";

export interface ScrapedData {
  title: string;
  description: string;
  headings: string[];
  bodyText: string;
  links: string[];
}

export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  const response = await fetch(normalizedUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; LeadLanguageBot/1.0; +https://leadlanguage.com)",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${normalizedUrl}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove scripts, styles, and nav/footer noise
  $("script, style, noscript, nav, footer, header").remove();

  const title = $("title").text().trim();
  const description =
    $('meta[name="description"]').attr("content")?.trim() || "";

  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000);

  const links: string[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
      links.push(href);
    }
  });

  return {
    title,
    description,
    headings: headings.slice(0, 20),
    bodyText,
    links: links.slice(0, 30),
  };
}
