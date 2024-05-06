import { type Metadata } from 'next'
import { Providers } from '@/app/providers/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%R - Ramón Pocón',
    default:
      'Ramón Pocón - Software Developer and Entrepreneur based in Guatemala City',
  },
  description:
    'I’m Ramón, a software developer and entrepreneur based in Guatemala City. I’m passionate about building tools that empower people to explore the universe.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
