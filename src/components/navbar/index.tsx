'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Image } from '@/components/image'
import { mainMenu, siteLogo } from '@/components/navbar/config'

/**
 * Site header. From 1024px it is fixed and transparent over the page, turning
 * white with a shadow once the page scrolls past 10px; below 1024px it is a
 * white bar with a menu toggle. `transparent` (home) shows the white logo and
 * white links until the header turns white.
 */
export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const [sticky, setSticky] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // White logo and links over the hero (desktop, before scrolling).
  const light = transparent && !sticky

  return (
    <header
      className={clsx(
        'site-header relative z-99 min-h-header w-full bg-body transition-all duration-400',
        'lg:fixed lg:top-(--admin-bar) lg:h-header',
        open && 'shadow-header',
        sticky
          ? 'lg:bg-body lg:shadow-header'
          : 'lg:bg-transparent lg:shadow-none'
      )}
    >
      <div className="flow-root px-[5%] lg:mx-12.5 lg:px-0">
        <div className="float-left w-27.5 text-center">
          <Link
            href="/"
            className="block max-w-[110px]"
          >
            <Image
              src={light ? siteLogo.light : siteLogo.dark}
              alt={siteLogo.alt}
              width={siteLogo.width}
              height={siteLogo.height}
              srcSet={false}
              lazy={false}
              className={clsx(
                'block h-auto max-w-full pt-5 pb-[21px]',
                light && 'max-lg:hidden'
              )}
            />
            {light && (
              <Image
                src={siteLogo.dark}
                alt={siteLogo.alt}
                width={siteLogo.width}
                height={siteLogo.height}
                srcSet={false}
                lazy={false}
                className="block h-auto max-w-full pt-5 pb-[21px] lg:hidden"
              />
            )}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={clsx(
            'relative z-1000 float-right block h-header w-13 cursor-pointer text-right transition-all duration-400 lg:hidden',
            open ? 'text-accent' : 'text-contrast-light'
          )}
        >
          <span className="relative z-1 flex h-header w-13 flex-col justify-between py-[35px] pl-5">
            {[
              ['w-8', open && 'translate-y-6'],
              ['ml-2 w-6', open && 'rotate-180'],
              ['ml-4 w-4', open && '-translate-y-6'],
            ].map(([size, state], i) => (
              <span
                key={i}
                className={clsx(
                  'block h-px bg-contrast-light transition-[transform,opacity,width] duration-150',
                  size,
                  state
                )}
              />
            ))}
          </span>
        </button>

        <nav
          aria-label="Main"
          className={clsx(
            // padding, not margin: a top margin would be absorbed by the float clearance
            'clear-both mb-7.5 pt-2.5 lg:float-right lg:clear-none lg:m-0 lg:block lg:pt-0',
            open ? 'block' : 'hidden'
          )}
        >
          <ul className="flow-root text-center font-heading text-sm leading-none font-light tracking-button lg:flex lg:h-header lg:items-center lg:gap-1">
            {mainMenu.map((item) => {
              const current = pathname === item.href
              return (
                <li
                  key={item.href}
                  className="relative block text-left lg:inline-block"
                >
                  <Link
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    className={clsx(
                      'relative block text-center transition-all duration-400',
                      item.highlight
                        ? [
                            'my-2.5 bg-accent py-[15px] font-normal text-accent-contrast lg:my-0 lg:ml-4 lg:flex lg:items-center lg:px-7.5 lg:py-3',
                            "after:absolute after:top-1 after:left-1 after:z-1 after:h-full after:w-full after:border after:border-solid after:transition-all after:duration-300 after:content-[''] hover:bg-accent-light hover:after:top-0 hover:after:left-0 hover:after:border-transparent",
                            'after:border-contrast-dark',
                            light && 'lg:after:border-body',
                          ]
                        : [
                            'mb-px py-[15px] text-contrast-light lg:mx-4 lg:mb-0 lg:flex lg:h-header lg:items-center lg:py-0',
                            "lg:after:absolute lg:after:top-[91px] lg:after:left-0 lg:after:h-[3px] lg:after:bg-accent lg:after:transition-[width] lg:after:duration-200 lg:after:content-[''] lg:hover:after:w-full",
                            current ? 'lg:after:w-full' : 'lg:after:w-0',
                            light && 'lg:text-overlay-text',
                          ]
                    )}
                  >
                    <span className="lg:block">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
