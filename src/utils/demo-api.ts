// The admin toolbar's demo: every route the toolbar's screens call, answered
// in the browser from made-up data, for a visitor who is not signed in. Nothing
// here reads the real visit log or any other private table: the only real things
// in it are the site's own pages and posts, from the generated JSON. The one
// thing asked of the server is a test report on a made-up visit, to an address
// the visitor gives (/api/demo/email).
//
// The data is made up from a fixed seed, so it is the same on every visit and
// every page, and each past day keeps its numbers: tomorrow is today with one
// more day added, never a different history. The numbers follow the same shapes
// as the real routes (src/utils/page-views.ts, flow-trace-store.ts).
//
// The file is fetched only when the demo starts (src/components/analytics/call.ts).

import { DateTime } from 'luxon'
import blogData from '@/data/_blog.json'
import pagesData from '@/data/_pages.json'
import { flowTraceConfig } from '@/utils/flow-trace-config'
import { periodOf, periodRange } from '@/utils/flow-trace-periods'
import {
  FT_CONVERSIONS,
  type FtConversion,
  type FtCounts,
  type FtEmailMode,
  type FtEvent,
  type FtListRow,
  type FtSummary,
  type FtVisit,
  type FtVisitPage,
  type FtVisitReport,
} from '@/utils/flow-trace-types'
import type {
  LiveCounts,
  PageViewReport,
  ViewBucket,
  ViewCount,
  ViewListRow,
  ViewPeriod,
  VisitLogPage,
  VisitRow,
} from '@/utils/page-view-types'

const ZONE = flowTraceConfig.zone
const PER_PAGE = 50
const LIST_LENGTH = 10

// The day the made-up site began. Fixed, so every past day keeps its numbers.
const LAUNCH = DateTime.fromISO('2024-03-01', { zone: ZONE })

const DEMO_REFUSAL = 'This is the demo: settings cannot be changed here.'

// --- Randomness, the same every time ---

function hash(...parts: (string | number)[]): number {
  let h = 2166136261
  for (const part of parts) {
    const text = String(part)
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    h ^= 0x9e3779b9
  }
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return h >>> 0
}

// A number from 0 to 1, fixed for its parts.
function chance(...parts: (string | number)[]): number {
  return hash(...parts) / 4294967296
}

function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// One of the choices, each as likely as its weight.
function weighted<T>(
  choices: readonly (readonly [T, number])[],
  roll: number
): T {
  const total = choices.reduce((sum, [, weight]) => sum + weight, 0)
  let left = roll * total
  for (const [value, weight] of choices) {
    left -= weight
    if (left < 0) return value
  }
  return choices[choices.length - 1]![0]
}

function pick<T>(list: readonly T[], roll: number): T {
  return list[Math.min(list.length - 1, Math.floor(roll * list.length))]!
}

// A page's path as the lists keep it: no slash at the end, except home's.
function pathKey(path: string): string {
  return path.replace(/\/+$/, '').toLowerCase() || '/'
}

function now(): DateTime {
  return DateTime.now().setZone(ZONE)
}

function seconds(time: DateTime): number {
  return Math.floor(time.toSeconds())
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function dayKey(day: DateTime) {
  return day.toFormat('yyyy-MM-dd')
}

// --- The site's real pages and posts ---

type Page = {
  path: string
  title: string
  weight: (day: DateTime) => number
}

type Post = { path: string; title: string; date: DateTime; pull: number }

type PagesFile = { uri: string; title?: string }[]
type BlogFile = {
  slug: string
  metadata?: { title?: string; date?: string; categories?: string[] }
}[]

// How much each page is read against the others; any other page is a small one.
const PAGE_WEIGHTS: Record<string, number> = {
  '/': 30,
  '/commercial-concrete-flooring': 9,
  '/residential-concrete-flooring': 11,
  '/industrial-flooring': 6,
  '/food-service-flooring': 4,
  '/contact': 8,
  '/gallery': 7,
  '/about': 5,
  '/blog': 4,
  '/faq': 3,
  '/careers': 1.5,
}

const POSTS: Post[] = (blogData as BlogFile)
  .map((post) => ({
    path: `/${post.slug}`.toLowerCase(),
    title: post.metadata?.title ?? post.slug,
    date: DateTime.fromISO(post.metadata?.date ?? '', { zone: ZONE }),
    pull: 0.2 + chance('pull', post.slug) ** 2 * 1.1,
  }))
  .filter((post) => post.date.isValid)

// A day as a whole number, in the site's own time: cheap to compare, where a
// Luxon diff on every page of every made-up view would freeze the screen.
function dayNumber(day: DateTime): number {
  return Math.floor((day.toMillis() + day.offset * 60000) / 86400000)
}

function makePages(): Page[] {
  const posts = new Set(POSTS.map((post) => post.path))
  const pages: Page[] = (pagesData as PagesFile)
    .filter((page) => !posts.has(pathKey(page.uri)))
    .map((page) => {
      const path = pathKey(page.uri)
      const weight = PAGE_WEIGHTS[path] ?? 0.2 + chance('page', path) * 0.5
      return {
        path,
        title: (page.title ?? path).split(/ [|-] /)[0]?.trim() ?? path,
        weight: () => weight,
      }
    })
  for (const post of POSTS) {
    const published = dayNumber(post.date)
    pages.push({
      path: post.path,
      title: post.title,
      weight: (day) => {
        const after = dayNumber(day) - published
        if (after < 0) return 0
        return (
          post.pull *
          (after < 7 ? 3.4 - after * 0.38 : 0.55 + 0.9 / Math.sqrt(after / 7))
        )
      },
    })
  }
  const categories = new Set(
    (blogData as BlogFile).flatMap((post) => post.metadata?.categories ?? [])
  )
  for (const category of categories) {
    const slug = category
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const weight = 0.25 + chance('category', slug) * 0.5
    pages.push({
      path: `/category/${slug}`,
      title: `Category: ${category.trim()}`,
      weight: () => weight,
    })
  }
  return pages
}

let pagesMade: Page[] | null = null

function pagesOf(): Page[] {
  pagesMade ??= makePages()
  return pagesMade
}

// --- Where visitors come from: a local contractor's mix ---

const REFERRERS = [
  ['google.com', 52],
  ['com.google.android.googlequicksearchbox', 3.2],
  ['facebook.com', 5.5],
  ['bing.com', 3.5],
  ['yelp.com', 3.2],
  ['nextdoor.com', 2.4],
  ['angi.com', 2.2],
  ['houzz.com', 1.8],
  ['chatgpt.com', 1.4],
  ['instagram.com', 1.2],
  ['duckduckgo.com', 1],
  ['thumbtack.com', 0.9],
  ['yahoo.com', 0.8],
  ['bbb.org', 0.5],
  ['perplexity.ai', 0.4],
] as const

const CAMPAIGNS = [
  ['google', 'cpc', 'concrete-floors-red-mesa', 4],
  ['google', 'cpc', 'garage-floor-coating', 3],
  ['gbp', 'organic', 'profile', 2.6],
  ['facebook', 'social', 'before-and-after', 1.5],
  ['yard-signs', 'print', 'job-site', 0.6],
] as const

const COUNTRIES = [
  ['US', 92],
  ['CA', 1.8],
  ['MX', 1.6],
  ['GB', 0.8],
  ['IN', 0.5],
  ['DE', 0.3],
  ['PH', 0.3],
] as const

// Region, its towns (likeliest first), and its share of the country.
const PLACES: Record<string, [string, string[], number][]> = {
  US: [
    [
      'Texas',
      [
        'Red Mesa',
        'Midland',
        'Odessa',
        'Lubbock',
        'Abilene',
        'San Angelo',
        'Amarillo',
        'Dallas',
        'Fort Worth',
        'Austin',
      ],
      78,
    ],
    ['New Mexico', ['Hobbs', 'Roswell', 'Carlsbad', 'Clovis'], 7],
    ['Oklahoma', ['Oklahoma City', 'Lawton', 'Tulsa'], 5],
    ['Colorado', ['Denver', 'Colorado Springs'], 2],
    ['California', ['Los Angeles', 'San Jose'], 2],
    ['Florida', ['Tampa', 'Orlando'], 1.5],
    ['Arizona', ['Phoenix'], 1.5],
  ],
  CA: [['Ontario', ['Toronto'], 1]],
  MX: [['Chihuahua', ['Ciudad Juárez'], 1]],
  GB: [['England', ['London'], 1]],
  IN: [['Maharashtra', ['Mumbai'], 1]],
  DE: [['Hesse', ['Frankfurt am Main'], 1]],
  PH: [['Metro Manila', ['Quezon City'], 1]],
}

const DEVICES = [
  ['Safari', 'iOS', 'mobile', 31],
  ['Chrome', 'Android', 'mobile', 19],
  ['Chrome', 'Windows', 'desktop', 18],
  ['Safari', 'macOS', 'desktop', 7],
  ['Chrome', 'macOS', 'desktop', 7],
  ['Edge', 'Windows', 'desktop', 7],
  ['Samsung Internet', 'Android', 'mobile', 3],
  ['Chrome', 'iOS', 'mobile', 2.5],
  ['Safari', 'iOS', 'tablet', 2.2],
  ['Firefox', 'Windows', 'desktop', 1.3],
  ['Chrome', 'Android', 'tablet', 0.6],
] as const

const VIEW_WEEKDAYS = [1.18, 1.16, 1.1, 1.06, 0.98, 0.68, 0.62] // Monday first
// The share of a day's views in each hour, by the site's clock: working hours.
const HOUR_SHAPE = [
  0.8, 0.5, 0.4, 0.4, 0.5, 1.0, 2.2, 3.9, 5.8, 7.0, 7.3, 6.9, 6.4, 6.6, 6.8,
  6.4, 5.7, 5.0, 4.6, 4.6, 4.6, 3.8, 2.6, 1.5,
]
const HOUR_TOTAL = HOUR_SHAPE.reduce((a, b) => a + b, 0)

// --- Page views ---

const dayCache = new Map<string, ViewCount>()

// The site's views on one day: a steady climb, quiet weekends, a small lift
// after each post, and now and then a day a post is passed around.
function siteDay(day: DateTime): ViewCount {
  const key = dayKey(day)
  const known = dayCache.get(key)
  if (known) return known
  if (day < LAUNCH) return { views: 0, visits: 0, visitors: 0 }

  const months = day.diff(LAUNCH, 'months').months
  const trend = 14 + months * 2.4 + Math.pow(Math.max(0, months), 1.4) * 0.35
  let level = trend * VIEW_WEEKDAYS[day.weekday - 1]!
  const today = dayNumber(day)
  for (const post of POSTS) {
    const after = today - dayNumber(post.date)
    if (after >= 0 && after < 6)
      level += trend * post.pull * [0.5, 0.6, 0.3, 0.15, 0.08, 0.04][after]!
  }
  if (chance('busy', key) < 0.012) level *= 1.6 + chance('busy-size', key) * 1.4
  level *= 0.86 + chance('noise', key) * 0.28

  const views = Math.round(level)
  const visits = Math.round(views * (0.58 + chance('v', key) * 0.08))
  const visitors = Math.round(visits * (0.84 + chance('u', key) * 0.08))
  const count = { views, visits, visitors }
  dayCache.set(key, count)
  return count
}

function scaled(count: ViewCount, share: number): ViewCount {
  return {
    views: Math.round(count.views * share),
    visits: Math.round(count.visits * share),
    visitors: Math.round(count.visitors * share),
  }
}

function summed(counts: ViewCount[]): ViewCount {
  return counts.reduce(
    (sum, c) => ({
      views: sum.views + c.views,
      visits: sum.visits + c.visits,
      visitors: sum.visitors + c.visitors,
    }),
    { views: 0, visits: 0, visitors: 0 }
  )
}

// A list made by sharing views out by weight, with a little noise for the
// period so lists do not look printed from one template.
function shared<T extends string>(
  total: number,
  choices: readonly (readonly [T, number])[],
  salt: string,
  limit = LIST_LENGTH
): [T, number][] {
  const noisy = choices.map(
    ([key, weight]) => [key, weight * (0.75 + chance(salt, key) * 0.5)] as const
  )
  const sum = noisy.reduce((s, [, weight]) => s + weight, 0) || 1
  return noisy
    .map(
      ([key, weight]) =>
        [key, Math.round((total * weight) / sum)] as [T, number]
    )
    .filter(([, views]) => views > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

function rows(list: [string, number][]): ViewListRow[] {
  return list.map(([key, views]) => ({ key, label: key, views }))
}

function placesFor(total: number, salt: string) {
  const countries = shared(total, COUNTRIES, `${salt}c`)
  const regions: [string, number][] = []
  const cities: [string, number][] = []
  for (const [country, views] of countries) {
    const places = PLACES[country]
    if (!places) continue
    for (const [region, views2] of shared(
      views * 0.93,
      places.map(([r, , w]) => [r, w] as const),
      `${salt}${country}`
    )) {
      regions.push([`${region}|${country}`, views2])
      const towns = places.find(([r]) => r === region)![1]
      for (const [city, views3] of shared(
        views2 * 0.95,
        towns.map((t, i) => [t, 1 / (i + 1)] as const),
        `${salt}${region}`
      )) {
        cities.push([`${city}|${region}|${country}`, views3])
      }
    }
  }
  const most = (list: [string, number][]) =>
    list.sort((a, b) => b[1] - a[1]).slice(0, LIST_LENGTH)
  return {
    countries: countries.map(([key, views]) => ({
      key,
      label: key,
      country: key,
      views,
    })),
    regions: most(regions).map(([key, views]) => {
      const [label, country] = key.split('|')
      return { key, label: label!, country: country!, views }
    }),
    cities: most(cities).map(([key, views]) => {
      const [city, region, country] = key.split('|')
      return { key, label: `${city}, ${region}`, country: country!, views }
    }),
  }
}

const DAYS_BACK: Partial<Record<ViewPeriod, number>> = {
  '7d': 6,
  '30d': 29,
  '90d': 89,
}

function pageViews(params: URLSearchParams): PageViewReport {
  const period = periodOf(params.get('period'), '30d')
  const rawPath = params.get('path') ? pathKey(params.get('path')!) : ''
  const bucketKey = params.get('bucket') ?? ''
  const pages = pagesOf()
  const page = rawPath ? pages.find((p) => p.path === rawPath) : null
  const moment = now()
  const today = moment.startOf('day')

  // The page's share of the site on a day.
  const share = (day: DateTime) => {
    if (!rawPath) return 1
    if (!page) return 0
    const all = pages.reduce((sum, p) => sum + p.weight(day), 0)
    return all ? page.weight(day) / all : 0
  }
  const dayCount = (day: DateTime) => scaled(siteDay(day), share(day))

  const hourly = period === 'today' || period === 'yesterday'
  const daysBack = DAYS_BACK[period]
  const unit: PageViewReport['unit'] = hourly
    ? 'hour'
    : daysBack === undefined
      ? 'month'
      : 'day'

  let from: DateTime
  let before: DateTime | null
  if (hourly) {
    from = period === 'today' ? today : today.minus({ days: 1 })
    before = from.minus({ days: 1 })
  } else if (daysBack !== undefined) {
    from = today.minus({ days: daysBack })
    before = from.minus({ days: daysBack + 1 })
  } else if (period === '12m') {
    from = today.startOf('month').minus({ months: 11 })
    before = from.minus({ months: 12 })
  } else {
    from = LAUNCH
    before = null
  }

  // A day's views up to this moment of the day: the hours that have passed,
  // and the part of this one. The chart's bars add up to the same.
  const soFar = (count: ViewCount) => {
    const part =
      (HOUR_SHAPE.slice(0, moment.hour).reduce((a, b) => a + b, 0) +
        (HOUR_SHAPE[moment.hour]! * moment.minute) / 60) /
      HOUR_TOTAL
    return scaled(count, part)
  }
  const hourCount = (day: DateTime, hour: number) =>
    scaled(dayCount(day), HOUR_SHAPE[hour]! / HOUR_TOTAL)
  // Today so far, hour by hour as the chart counts it, so every number for
  // today agrees.
  const todaySoFar = () => {
    const hours: ViewCount[] = []
    for (let hour = 0; hour < moment.hour; hour++)
      hours.push(hourCount(today, hour))
    hours.push(scaled(hourCount(today, moment.hour), moment.minute / 60))
    return summed(hours)
  }

  const published = new Map<string, string[]>()
  if (!rawPath && unit !== 'month') {
    for (const post of POSTS) {
      const key =
        unit === 'hour'
          ? post.date.toFormat("yyyy-MM-dd'T'HH")
          : dayKey(post.date)
      published.set(key, [...(published.get(key) ?? []), post.title])
    }
  }
  const titlesAt = (key: string) => {
    const titles = published.get(key)
    return titles ? { published: titles } : {}
  }

  const buckets: ViewBucket[] = []
  if (hourly) {
    const last = period === 'today' ? moment.hour : 23
    for (let hour = 0; hour <= last; hour++) {
      // Counted on from midnight, so the hour the clocks skip is not two.
      const at = from.plus({ hours: hour })
      const key = at.toFormat("yyyy-MM-dd'T'HH")
      let count = hourCount(from, hour)
      if (period === 'today' && hour === last)
        count = scaled(count, moment.minute / 60)
      buckets.push({ key, ...count, ...titlesAt(key) })
    }
  } else {
    for (
      let at = from;
      at <= today;
      at = at.plus(unit === 'day' ? { days: 1 } : { months: 1 })
    ) {
      if (unit === 'day') {
        const key = dayKey(at)
        const count = at.hasSame(today, 'day') ? todaySoFar() : dayCount(at)
        buckets.push({ key, ...count, ...titlesAt(key) })
      } else {
        const days: ViewCount[] = []
        for (
          let d = at.startOf('month');
          d <= at.endOf('month') && d <= today;
          d = d.plus({ days: 1 })
        ) {
          days.push(d.hasSame(today, 'day') ? todaySoFar() : dayCount(d))
        }
        buckets.push({ key: at.toFormat('yyyy-MM'), ...summed(days) })
      }
    }
  }

  const inPeriod = summed(buckets)
  const todayCount = todaySoFar()

  let previous: ViewCount | null = null
  if (before) {
    if (hourly) {
      previous = period === 'today' ? soFar(dayCount(before)) : dayCount(before)
    } else {
      const days: ViewCount[] = []
      for (let d = before; d < from; d = d.plus({ days: 1 }))
        days.push(dayCount(d))
      previous = summed(days)
    }
  }

  const everyDay: [DateTime, ViewCount][] = []
  for (let d = LAUNCH; d <= today; d = d.plus({ days: 1 })) {
    everyDay.push([d, d.hasSame(today, 'day') ? todayCount : dayCount(d)])
  }
  const allTime = summed(everyDay.map(([, c]) => c))
  const best = everyDay.reduce(
    (top, item) => (item[1].views > top[1].views ? item : top),
    everyDay[0]!
  )

  // The lists cover the bar pressed, or the whole period.
  const pressed = buckets.find((b) => b.key === bucketKey)
  const listTotal = (pressed ?? inPeriod).views
  const salt = `${period}|${bucketKey}|${rawPath}`
  const listDay = hourly
    ? from
    : today.minus({ days: Math.floor((daysBack ?? 30) / 2) })

  const pageList = rawPath
    ? []
    : shared(
        listTotal,
        pages.map((p) => [p.path, p.weight(listDay)] as const),
        salt
      ).map(([key, views]) => ({
        key,
        label: pages.find((p) => p.path === key)!.title,
        href: key,
        views,
      }))

  const places = placesFor(listTotal * 0.97, salt)
  return {
    period,
    unit,
    buckets,
    today: todayCount,
    inPeriod,
    previous,
    allTime,
    bestDay:
      best && best[1].views > 0
        ? { day: dayKey(best[0]), views: best[1].views }
        : null,
    pages: pageList,
    archives: [],
    referrers: rows(shared(listTotal * 0.46, REFERRERS, `${salt}ref`)),
    campaigns: rows(
      shared(
        listTotal * 0.08,
        CAMPAIGNS.map(
          ([source, medium, campaign, weight]) =>
            [`${source} / ${medium} / ${campaign}`, weight] as const
        ),
        `${salt}utm`
      )
    ),
    countries: places.countries,
    regions: places.regions,
    cities: places.cities,
    devices: rows(
      shared(
        listTotal,
        DEVICES.map(
          ([browser, os, device, weight]) =>
            [`${browser} on ${os} · ${device}`, weight] as const
        ),
        `${salt}dev`
      )
    ),
    logCutShort: false,
  }
}

function liveCounts(params: URLSearchParams): LiveCounts {
  const report = pageViews(new URLSearchParams({ period: 'today' }))
  const path = pathKey(params.get('path') ?? '/')
  const known = pagesOf().some((p) => p.path === path)
  const day = dayKey(now())
  return {
    from: day,
    to: day,
    site: report.today,
    page: known
      ? pageViews(new URLSearchParams({ period: 'all', path })).allTime
      : null,
  }
}

// --- The visit log ---

function ipFor(visitor: number): string {
  const r = (n: number) => chance('ip', visitor, n)
  if (r(0) < 0.18) {
    const groups = Array.from({ length: 4 }, (_, i) =>
      Math.floor(r(i + 1) * 65535).toString(16)
    )
    return `2${Math.floor(r(9) * 3) + 6}0${Math.floor(r(8) * 9)}:${groups.join(':')}::${Math.floor(r(7) * 255).toString(16)}`
  }
  const first = pick(
    [24, 47, 50, 63, 67, 68, 71, 73, 76, 98, 99, 104, 107, 108, 136, 162, 172],
    r(1)
  )
  return `${first}.${Math.floor(r(2) * 254) + 1}.${Math.floor(r(3) * 254) + 1}.${Math.floor(r(4) * 253) + 1}`
}

const VISIT_DAYS = 120

function visitLog(params: URLSearchParams): VisitLogPage {
  const page = Math.max(1, Number(params.get('page')) || 1)
  const ip = params.get('ip') ?? ''
  const path = params.get('path') ? pathKey(params.get('path')!) : ''
  const search = (params.get('search') ?? '').trim().toLowerCase()
  const pages = pagesOf()
  const moment = now()

  // Views counted back from now, hour by hour, so each row has its time.
  const all: VisitRow[] = []
  const filtered = Boolean(ip || path || search)
  const wanted = filtered ? Infinity : page * PER_PAGE
  let id = 0
  const total = summed(
    Array.from({ length: VISIT_DAYS }, (_, i) =>
      siteDay(moment.startOf('day').minus({ days: i }))
    )
  ).views

  outer: for (let back = 0; back < VISIT_DAYS * 24; back++) {
    const hourStart = moment.startOf('hour').minus({ hours: back })
    const day = hourStart.startOf('day')
    let count = Math.round(
      (siteDay(day).views * HOUR_SHAPE[hourStart.hour]!) / HOUR_TOTAL
    )
    if (back === 0) count = Math.round((count * moment.minute) / 60)
    const weightAll = pages.reduce((s, p) => s + p.weight(day), 0)
    // People read a few pages each: a visitor's views come together.
    let visitor = 0
    let left = 0
    for (let n = 0; n < count; n++) {
      id++
      const r = (what: string) => chance(what, hourStart.toMillis(), n)
      // The first view of a visitor's few is how they arrived.
      const arrived = left <= 0
      if (arrived) {
        visitor = hash('visitor', hourStart.toMillis(), n) % 900000
        left = 1 + Math.floor(r('depth') ** 2 * 4)
      }
      const first = arrived && r('entry') < 0.9
      left--
      const at =
        seconds(hourStart) +
        Math.floor((1 - (n + r('t') * 0.9) / Math.max(1, count)) * 3600)
      if (at > seconds(moment)) continue
      let roll = r('page') * weightAll
      let chosen = pages[0]!
      for (const candidate of pages) {
        roll -= candidate.weight(day)
        if (roll < 0) {
          chosen = candidate
          break
        }
      }
      const v = (what: string) => chance(what, visitor)
      const where = placeOf(v('country'), v('region'), v('city'))
      const [browser, os, device] = deviceOf(v('device'))
      const referrer =
        first && r('ref') < 0.62 ? weighted(REFERRERS, r('refwho')) : ''
      const campaign =
        first && !referrer && r('utm') < 0.2
          ? weighted(
              CAMPAIGNS.map((c) => [c, c[3]] as const),
              r('which')
            )
          : undefined
      const row: VisitRow = {
        id: 5000000 - id,
        at,
        path: chosen.path,
        title: chosen.title,
        isVisit: first,
        referrer,
        utmSource: campaign?.[0] ?? '',
        utmMedium: campaign?.[1] ?? '',
        utmCampaign: campaign?.[2] ?? '',
        ...where,
        device,
        browser,
        os,
        ip: ipFor(visitor),
        readerEmail: '',
        userEmail: '',
      }
      if (ip && row.ip !== ip) continue
      if (path && row.path !== path) continue
      if (
        search &&
        ![
          row.path,
          row.title,
          row.referrer,
          row.city,
          row.region,
          row.country,
          row.ip,
          row.browser,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search)
      ) {
        continue
      }
      all.push(row)
      if (all.length >= wanted) break outer
    }
    // A search reads back two weeks at the most, so it answers at once.
    if (filtered && back > 14 * 24) break
  }

  const count = filtered ? all.length : total
  return {
    rows: all.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    total: count,
    page,
    pages: Math.max(1, Math.ceil(count / PER_PAGE)),
  }
}

function placeOf(countryRoll: number, regionRoll: number, cityRoll: number) {
  const country = weighted(COUNTRIES, countryRoll)
  const places = PLACES[country]
  const region = places
    ? weighted(
        places.map(([r, , weight]) => [r, weight] as const),
        regionRoll
      )
    : ''
  const city =
    places && region
      ? pick(places.find(([r]) => r === region)![1], cityRoll ** 1.5)
      : ''
  return { country, region, city }
}

function deviceOf(roll: number): readonly [string, string, string] {
  return weighted(
    DEVICES.map(([b, o, d, weight]) => [[b, o, d] as const, weight] as const),
    roll
  )
}

// --- FlowTrace ---

// The demo's converted visits: a small share of each day's made-up visits (the
// same visits the demo's Analytics counts), each with the pages read before and
// what they did. Made the same way every time from the day's own seed, so a
// visit keeps its id and its story.

const FT_KINDS: readonly (readonly [FtConversion, number])[] = [
  ['call', 44],
  ['form', 30],
  ['email', 12],
  ['text', 8],
  ['click', 6],
]

// Example.com and the 555 number: the site's own made-up contact details.
const FT_LABELS: Record<FtConversion, [string, string][]> = {
  call: [['5555550142', 'tel:5555550142']],
  text: [['5555550142', 'sms:5555550142']],
  email: [['hello@example.com', 'mailto:hello@example.com']],
  form: [
    ['Contact Form', ''],
    ['Industrial Flooring Form', ''],
  ],
  click: [
    ['Schedule a Free Estimate', ''],
    ['Pick a Time to Meet', ''],
  ],
}

// Who the demo's reports go to: made-up addresses only.
const FT_TEAM: { email: string; mode: FtEmailMode }[] = [
  { email: 'owner@example.com', mode: 'instant' },
  { email: 'office@example.com', mode: 'daily' },
]

type FtItem = { visit: FtVisit; events: FtEvent[] }

const ftDayCache = new Map<string, FtItem[]>()

function ftDay(day: DateTime): FtItem[] {
  const key = dayKey(day)
  const known = ftDayCache.get(key)
  if (known) return known
  const out: FtItem[] = []
  if (day < LAUNCH) return out

  const roll = seeded(hash('flowtrace', key))
  const visits = siteDay(day).visits
  const rate = 0.03 + roll() * 0.03
  const count = Math.round(visits * rate + roll() * 0.6)
  const pages = pagesOf()
  const weightAll = pages.reduce((sum, page) => sum + page.weight(day), 0) || 1

  for (let n = 0; n < count; n++) {
    // When in the day, by the same hours the views follow
    let hourRoll = roll() * HOUR_TOTAL
    let hour = 0
    while (hour < 23 && hourRoll > HOUR_SHAPE[hour]!)
      hourRoll -= HOUR_SHAPE[hour++]!
    const startedAt = seconds(
      day.plus({ hours: hour, minutes: Math.floor(roll() * 60) })
    )
    const id = `demo-${key.replace(/-/g, '')}-${n}-${hash('ft', key, n).toString(36)}`
    const visitor = hash('ft-visitor', key, n) % 900000

    // Where they came from
    const sourceRoll = roll()
    const campaign =
      sourceRoll < 0.14
        ? weighted(
            CAMPAIGNS.map((c) => [c, c[3]] as const),
            roll()
          )
        : undefined
    const referrer =
      !campaign && sourceRoll < 0.78 ? weighted(REFERRERS, roll()) : ''
    const where = placeOf(roll(), roll(), roll())
    const [browser, os, device] = deviceOf(roll())

    // The pages they read, then what they did
    const steps = 1 + Math.floor(roll() ** 1.4 * 6)
    const kind = weighted(FT_KINDS, roll())
    const events: FtEvent[] = []
    let at = startedAt
    let engaged = 0
    for (let step = 0; step < steps; step++) {
      let pageRoll = roll() * weightAll
      let chosen = pages[0]!
      for (const page of pages) {
        pageRoll -= page.weight(day)
        if (pageRoll < 0) {
          chosen = page
          break
        }
      }
      const ms = Math.round((12 + roll() ** 1.8 * 300) * 1000)
      events.push({
        id: hash('ft-event', id, step),
        at,
        type: 'pageview',
        path: chosen.path === '/' ? '/' : `${chosen.path}/`,
        title: chosen.title,
        label: '',
        href: '',
        engagedMs: ms,
      })
      engaged += ms
      at += Math.round(ms / 1000) + Math.floor(roll() * 20)
    }
    const [label, href] = pick(FT_LABELS[kind], roll())
    events.push({
      id: hash('ft-event', id, 'conversion'),
      at,
      type: kind,
      path: kind === 'form' ? '/contact/' : events[events.length - 1]!.path,
      title: '',
      label,
      href,
      engagedMs: 0,
    })

    const visitNumber = roll() < 0.66 ? 1 : 2 + Math.floor(roll() ** 2 * 5)
    out.push({
      visit: {
        id,
        visitorId: `demo-visitor-${visitor}`,
        visitNumber,
        startedAt,
        lastAt: at,
        entryPath: events[0]!.path,
        referrer,
        utmSource: campaign?.[0] ?? '',
        utmMedium: campaign?.[1] ?? '',
        utmCampaign: campaign?.[2] ?? '',
        utmTerm: '',
        utmContent: '',
        ...where,
        device,
        browser,
        os,
        ip: ipFor(visitor),
        pageviews: steps,
        engagedMs: engaged,
        conversions: 1,
        firstConversion: kind,
        reportedAt: at + 3,
        firstSeen:
          visitNumber > 1
            ? startedAt - Math.floor(roll() * 60) * 86400 - 3600
            : startedAt,
        visitorEngagedMs:
          engaged + (visitNumber - 1) * Math.round((40 + roll() * 200) * 1000),
        reader: '',
        readerEmail: '',
        userEmail: '',
      },
      events,
    })
  }
  ftDayCache.set(key, out)
  return out
}

// The converted visits between two times, newest first, up to now.
function ftVisitsBetween(from: number, to: number): FtItem[] {
  const end = Math.min(to, seconds(now()))
  const found: FtItem[] = []
  const first = DateTime.max(
    DateTime.fromSeconds(Math.max(from, 0), { zone: ZONE }).startOf('day'),
    LAUNCH
  )
  for (
    let day = DateTime.fromSeconds(end, { zone: ZONE }).startOf('day');
    day >= first;
    day = day.minus({ days: 1 })
  ) {
    for (const item of ftDay(day)) {
      if (item.visit.startedAt >= from && item.visit.lastAt <= end)
        found.push(item)
    }
  }
  return found.sort((a, b) => b.visit.startedAt - a.visit.startedAt)
}

function ftCounts(items: FtItem[]): FtCounts {
  const conversions = Object.fromEntries(
    FT_CONVERSIONS.map((type) => [type, 0])
  ) as Record<FtConversion, number>
  for (const item of items) {
    for (const event of item.events) {
      if (event.type !== 'pageview') conversions[event.type]++
    }
  }
  return { converted: items.length, conversions }
}

function ftGrouped(items: FtItem[], keyOf: (visit: FtVisit) => string | null) {
  const counts = new Map<string, number>()
  for (const { visit } of items) {
    const key = keyOf(visit)
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, LIST_LENGTH)
}

function ftOverview(params: URLSearchParams): {
  period: ViewPeriod
  summary: FtSummary
  before: FtCounts | null
} {
  const period = periodOf(params.get('period'), '30d')
  const range = periodRange(period)
  const items = ftVisitsBetween(range.from, range.to)
  const pageCounts = new Map<string, number>()
  for (const item of items) {
    for (const event of item.events) {
      if (event.type === 'pageview')
        pageCounts.set(event.path, (pageCounts.get(event.path) ?? 0) + 1)
    }
  }
  const source = (visit: FtVisit) =>
    visit.utmSource || visit.referrer || 'Direct'
  return {
    period,
    summary: {
      from: range.from,
      to: range.to,
      ...ftCounts(items),
      sources: ftGrouped(items, source).map(([key, views]) => ({
        key,
        label: key,
        views,
      })),
      pages: [...pageCounts]
        .sort((a, b) => b[1] - a[1])
        .slice(0, LIST_LENGTH)
        .map(([key, views]): FtListRow => ({
          key,
          label: key,
          href: key,
          views,
        })),
      countries: ftGrouped(items, (visit) => visit.country || null).map(
        ([key, views]) => ({ key, label: key, country: key, views })
      ),
      regions: ftGrouped(items, (visit) =>
        visit.region ? `${visit.region}|${visit.country}` : null
      ).map(([key, views]) => ({
        key,
        label: key.split('|')[0]!,
        country: key.split('|')[1]!,
        views,
      })),
      cities: ftGrouped(items, (visit) =>
        visit.city ? `${visit.city}|${visit.region}|${visit.country}` : null
      ).map(([key, views]) => {
        const [city, region, country] = key.split('|')
        return {
          key,
          label: [city, region].filter(Boolean).join(', '),
          country: country!,
          views,
        }
      }),
      devices: ftGrouped(
        items,
        (visit) => `${visit.browser} on ${visit.os} · ${visit.device}`
      ).map(([key, views]) => ({ key, label: key, views })),
      convertedVisits: items.slice(0, 25).map((item) => item.visit),
    },
    before: range.previous
      ? ftCounts(ftVisitsBetween(range.previous.from, range.previous.to))
      : null,
  }
}

function ftVisitPage(params: URLSearchParams): FtVisitPage {
  const range = periodRange(periodOf(params.get('period'), 'all'))
  const page = Math.max(1, Number(params.get('page')) || 1)
  const ip = params.get('ip') ?? ''
  const search = (params.get('search') ?? '').trim().toLowerCase()
  const rows = ftVisitsBetween(range.from, range.to)
    .filter((item) => !ip || item.visit.ip === ip)
    .filter(
      (item) =>
        !search ||
        item.visit.ip.includes(search) ||
        item.events.some((event) => event.path.toLowerCase().includes(search))
    )
    .map((item) => item.visit)
  return {
    rows: rows.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    total: rows.length,
    page,
    pages: Math.max(1, Math.ceil(rows.length / PER_PAGE)),
  }
}

function ftReport(params: URLSearchParams): FtVisitReport {
  const id = params.get('id') ?? ''
  const day = id.match(/^demo-(\d{4})(\d{2})(\d{2})-/)
  const found = day
    ? ftDay(
        DateTime.fromObject(
          { year: +day[1]!, month: +day[2]!, day: +day[3]! },
          { zone: ZONE }
        )
      ).find((item) => item.visit.id === id)
    : undefined
  if (!found) throw new Error('This visit is no longer available.')
  // The visitor's other converted visits, where the demo made any
  const otherVisits = ftVisitsBetween(
    found.visit.startedAt - 90 * 86400,
    found.visit.startedAt
  )
    .filter(
      (item) =>
        item.visit.visitorId === found.visit.visitorId && item.visit.id !== id
    )
    .map((item) => item.visit)
  return { visit: found.visit, events: found.events, otherVisits }
}

// --- The router ---

/**
 * Answers a read of /api/analytics or /api/flowtrace as the real route would,
 * from the made-up data. The answers take a moment, as the real ones do.
 */
export async function demoCall<T>(url: string): Promise<T> {
  const parsed = new URL(url, window.location.origin)
  const path = parsed.pathname.replace(/\/$/, '')
  const params = parsed.searchParams

  await wait(140 + Math.random() * 260)

  if (path === '/api/analytics/live') return liveCounts(params) as T
  if (path === '/api/analytics') return pageViews(params) as T
  if (path === '/api/analytics/visits') return visitLog(params) as T
  if (path === '/api/flowtrace/summary') return ftOverview(params) as T
  if (path === '/api/flowtrace/visits') return ftVisitPage(params) as T
  if (path === '/api/flowtrace/visit') return ftReport(params) as T
  if (path === '/api/flowtrace/settings') {
    return {
      email: FT_TEAM[0]!.email,
      mode: FT_TEAM[0]!.mode,
      team: FT_TEAM,
    } as T
  }
  throw new Error('This is not part of the demo.')
}

/**
 * A change, which the demo refuses, but for the one real thing it does: a test
 * report on a made-up visit, once per address, limited by the server.
 */
export async function demoPost<T>(url: string, body: unknown): Promise<T> {
  const path = new URL(url, window.location.origin).pathname.replace(/\/$/, '')
  if (path !== '/api/flowtrace/test-report') {
    await wait(200)
    throw new Error(DEMO_REFUSAL)
  }
  const { email } = (body ?? {}) as { email?: string }
  if (!email) throw new Error('Enter the address to send the test report to.')
  const response = await fetch('/api/demo/email/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'flowtrace-test', email }),
  })
  const json = (await response.json().catch(() => ({}))) as {
    message?: string
  }
  if (!response.ok) {
    throw new Error(json.message || `The server answered ${response.status}.`)
  }
  return json as T
}
