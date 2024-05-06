'use client';

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { AnimatedDiv } from '@/components/animated-div/animated-div'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {

	const renderParagraphs = (content:string) => (
		<p>{content}</p>
	)

	const paragraphs = [
		`I’ve loved making things for as long as I can remember, and
		wrote my first program when I was 14 years old, when I had
		access to internet and started to build a few tools in visual
		basic.`,
		`Since I was I child, I've been passionate about video games and
		technology, I remember that I used to play a lot of video games
		and I always wanted to know how they were made, so I started to
		learn how to make them.`,
		`My first access to the internet was in 2008, and I started to
		learn about web development, I learned HTML, CSS, JavaScript, it
		was a different world, I was amazed by the things that I could do
		with it. However, I didn't have a computer, so I had to go to an
		internet cafe to learn and practice. It was back a few years ago,
		that I found out about Platzi, an online education platform, where
		I could learn about web development, and I started to learn about
		web development and I fell in love with it. I cemented my knowledge
		by building projects, and I started to work as a freelance web
		developer, and I've been working as a web developer since then.`,
		`I'm a self-taught developer, I've learned a lot from the internet,
		and I've learned a lot from the people that I've worked with. I'm
		always looking for new challenges and new things to learn.`
	];

  return (
    <AnimatedDiv
		key='about'
	>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
		  <AnimatedDiv
				key='title'
				index={0}
			>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              I’m Ramón Pocón. I live in Guatemala City, where I joy developing
              tools.
            </h1>
			</AnimatedDiv>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              {paragraphs.map(renderParagraphs).map((paragraph, index) => (
				<AnimatedDiv
					key={`paragraph-${index}`}
					index={index + 1}
				>
					{paragraph}
				</AnimatedDiv>
			  ))}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://twitter.com/kaozgt" icon={XIcon}>
                Follow on X
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/kaozgt/"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/poconri"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/ramon-ignacio-poc%C3%B3n-elias-23331738/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:pocon.ri@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                pocon.ri@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </AnimatedDiv>
  )
}
