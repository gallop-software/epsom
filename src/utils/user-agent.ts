// What a visitor's user agent says: whether it is a bot, and the device,
// browser and system it names. Shared by FlowTrace and the page-view counts.
// No server-only import: the scheduled job in worker.ts uses FlowTrace's.

const BOT =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|scrape|curl|wget|python|httpclient|facebookexternalhit|whatsapp/i

/** A search engine, a link previewer or a script: they run pages too. */
export function isBot(userAgent: string): boolean {
  return !userAgent.trim() || BOT.test(userAgent)
}

/** The device, browser and system a user agent names. */
export function parseUserAgent(ua: string): {
  device: string
  browser: string
  os: string
} {
  const os = /iPhone|iPad|iPod/.test(ua)
    ? 'iOS'
    : /Android/.test(ua)
      ? 'Android'
      : /Windows/.test(ua)
        ? 'Windows'
        : /Macintosh|Mac OS X/.test(ua)
          ? 'macOS'
          : /CrOS/.test(ua)
            ? 'ChromeOS'
            : /Linux/.test(ua)
              ? 'Linux'
              : 'Other'
  // Most browsers name others as well as themselves, so the order matters:
  // Edge says Chrome and Safari, Chrome says Safari.
  const browser = /Edg(e|A|iOS)?\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /SamsungBrowser\//.test(ua)
        ? 'Samsung Internet'
        : /Firefox\/|FxiOS\//.test(ua)
          ? 'Firefox'
          : /Chrome\/|CriOS\//.test(ua)
            ? 'Chrome'
            : /Safari\//.test(ua)
              ? 'Safari'
              : 'Other'
  const device =
    /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))
      ? 'tablet'
      : /Mobi|iPhone|iPod|Android/.test(ua)
        ? 'mobile'
        : 'desktop'
  return { device, browser, os }
}
