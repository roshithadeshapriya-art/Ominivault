export interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const FALLBACK_ARTICLES: Article[] = [
  {
    title: "The Silicon Era 2.0: How 2026 is Redefining Personal Privacy.",
    description: "A deep dive into encrypted browsing and the new standards protecting user data across the global web.",
    url: "#",
    image: "https://picsum.photos/seed/privacy2026/800/600?grayscale&blur=2",
    publishedAt: new Date().toISOString(),
    source: { name: "Temporary Editorial" }
  },
  {
    title: "Quantum Leap: Why Electronics Engineering is the Most Vital Career of the Decade.",
    description: "As hardware complexity scales, electronics engineers are at the forefront of the next monumental shift in computing architecture.",
    url: "#",
    image: "https://picsum.photos/seed/engineering/800/600?grayscale&blur=2",
    publishedAt: new Date().toISOString(),
    source: { name: "Temporary Editorial" }
  },
  {
    title: "The Death of Spam: How Temporary Emails Became a Global Standard for Digital Security.",
    description: "Disposable inboxes have shifted from niche tools to essential utilities for navigating the modern internet without compromising primary contact details.",
    url: "#",
    image: "https://picsum.photos/seed/spam/800/600?grayscale&blur=2",
    publishedAt: new Date().toISOString(),
    source: { name: "Temporary Editorial" }
  }
];

export const fetchNews = async (cacheBuster?: string): Promise<Article[]> => {
  try {
    const rssUrl = `https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRFdvSkwyMHZNR1p4WkRsWlowSnJlR2RKU2pRekVnUm9iU2d%E7%8B%AC%E7%AB%8B?hl=en-US&gl=US&ceid=US:en${cacheBuster ? `&cb=${cacheBuster}` : ''}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await res.json();
    
    if (!data.contents) {
      throw new Error("No contents returned from proxy");
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    const items = Array.from(xmlDoc.querySelectorAll("item"));

    if (items.length > 0) {
      return items.map((item) => {
        const title = item.querySelector("title")?.textContent || "Untitled";
        const link = item.querySelector("link")?.textContent || "#";
        const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();
        const sourceName = item.querySelector("source")?.textContent || "Google News";
        
        // Google News RSS doesn't reliably provide images in a standard tag, 
        // so we use a placeholder or extract from description if possible.
        // For this implementation, we'll use a placeholder.
        const image = "https://picsum.photos/seed/newspaper/800/600?grayscale&blur=2";
        
        // Extract a clean description if possible, or leave empty
        let description = "";
        const descHtml = item.querySelector("description")?.textContent || "";
        if (descHtml) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = descHtml;
          description = tempDiv.textContent || "";
        }

        return {
          title,
          description,
          url: link,
          image,
          publishedAt: pubDate,
          source: {
            name: sourceName
          }
        };
      });
    }
    
    console.warn("No items found in RSS feed, using fallbacks.");
    return FALLBACK_ARTICLES;
  } catch (error) {
    console.error("News fetch error:", error);
    return FALLBACK_ARTICLES;
  }
};
