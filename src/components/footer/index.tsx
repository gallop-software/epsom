import { DateTime } from 'luxon'
import Link from 'next/link'
import { CalendlyButton } from '@/components/calendly-button'
import {
  contact,
  footerGallery,
  footerMenu,
  socialLinks,
} from '@/components/footer/config'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { recentPosts } from '@/utils/blog'

const widget =
  'mb-15 flow-root lg:mb-10 lg:w-[calc(25%_+_20px)] lg:shrink-0 lg:px-10 [&_p:last-child]:mb-0'

function WidgetTitle({ children }: { children: string }) {
  return (
    <Heading
      as="h3"
      fontFamily="font-body"
      fontSize="text-sm"
      letterSpacing="tracking-normal"
      color="text-accent2"
      margin="mb-[35px]"
    >
      {children}
    </Heading>
  )
}

export function Footer({
  gallery = true,
}: {
  /** The strip of project photos above the footer (off for "no CTA" pages). */
  gallery?: boolean
}) {
  return (
    <footer>
      {/* Above-footer gallery: six square project photos edge to edge. */}
      {gallery && (
        <div className="flex">
          {footerGallery.map((image, i) => (
            <figure
              key={`${image.src}-${i}`}
              className="w-1/6 text-center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                sizes="17vw"
                aspect="aspect-square"
                className="w-full max-w-full object-cover"
              />
            </figure>
          ))}
        </div>
      )}

      <div className="pt-5 text-[15px] leading-normal">
        <div className="px-[5%] pt-10 lg:mx-2.5 lg:flex lg:px-0">
          <section className={widget}>
            <WidgetTitle>Reach Us</WidgetTitle>
            <Heading
              as="h4"
              fontSize="text-lg"
              margin="mb-2.5"
            >
              {contact.name}
            </Heading>
            <Paragraph>
              {contact.location}
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={contact.phoneHref}>{contact.phone}</a>
            </Paragraph>
            <List
              bullets={false}
              margin="mb-0"
            >
              {socialLinks.map((link) => (
                <Li
                  key={link.label}
                  className="mb-0 inline-block pr-2.5 text-lg leading-none last:pr-0"
                >
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="transition-all duration-400 hover:text-accent2-light"
                  >
                    <Icon
                      icon={link.icon}
                      className="inline-block h-5 w-5"
                    />
                  </a>
                </Li>
              ))}
            </List>
          </section>

          <section className={widget}>
            <WidgetTitle>Get a Free Estimate</WidgetTitle>
            <Paragraph>
              Tell us about your floor and we will set up a free visit and
              quote. It only takes a few minutes to get on our calendar.
            </Paragraph>
            <Paragraph>
              <CalendlyButton>Pick a Time to Meet</CalendlyButton>
            </Paragraph>
            <Paragraph>
              Still wondering? Read through our <Link href="/faq/">FAQs</Link>.
            </Paragraph>
          </section>

          <section className="mb-15 flow-root lg:mb-10 lg:flex-1 lg:px-10">
            <WidgetTitle>Latest Jobs</WidgetTitle>
            {recentPosts(4).map((post) => (
              <article
                key={post.href}
                className="relative z-1 mb-7.5 flex min-h-12 flex-col bg-body"
              >
                <Link
                  href={post.href}
                  className="absolute top-0 left-0 block h-12 w-12"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    srcSet={false}
                    size="small"
                    className="h-12 w-12 object-cover"
                    rounded="rounded-full"
                  />
                </Link>
                <div className="pl-17 text-left">
                  <Paragraph
                    fontSize="text-2xs"
                    color="text-muted"
                    margin="mb-0"
                  >
                    <time className="leading-[1.3] font-bold">{post.date}</time>
                  </Paragraph>
                  <Heading
                    as="h4"
                    fontFamily="font-body"
                    fontSize="text-sm"
                    letterSpacing="tracking-normal"
                    uppercase={false}
                    color="text-contrast"
                    lineHeight="leading-normal"
                    margin="mb-0"
                  >
                    <Link
                      href={post.href}
                      className="transition-all duration-400 hover:text-accent2-light"
                    >
                      {post.title}
                    </Link>
                  </Heading>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>

      <div className="py-15 text-xs">
        <div className="flex flex-col items-center px-[5%] text-center lg:mx-12.5 lg:flex-row lg:flex-wrap lg:px-0 lg:text-left">
          <nav
            aria-label="Secondary"
            className="mb-7.5 w-full lg:mb-0"
          >
            <ul className="pb-7.5 font-heading text-sm leading-none font-light tracking-button">
              {footerMenu.map((item) => [
                ' ',
                <li
                  key={item.href}
                  className="relative inline-block text-left"
                >
                  <Link
                    href={item.href}
                    className="block px-2.5 pb-2.5 text-[18px] leading-[18px] transition-all duration-400 lg:pr-5 lg:pl-0"
                  >
                    {item.label}
                  </Link>
                </li>,
              ])}
            </ul>
          </nav>
          <Paragraph
            margin="mb-0"
            className="w-full"
          >
            Copyright &copy;&nbsp;{DateTime.now().year} &middot; All Rights
            Reserved &middot; crafted by{' '}
            <a
              href="https://webplant.media"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              webplant.media
            </a>
          </Paragraph>
        </div>
      </div>
    </footer>
  )
}
