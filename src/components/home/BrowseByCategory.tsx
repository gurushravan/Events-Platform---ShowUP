import Link from 'next/link'
import {
  Laugh,
  Music,
  Paintbrush,
  Theater,
  Baby,
  Mic
} from 'lucide-react'

const categories = [
  {
    name: 'Comedy',
    icon: Laugh,
    slug: 'comedy'
  },
  {
    name: 'Music',
    icon: Music,
    slug: 'music'
  },
  {
    name: 'Workshops',
    icon: Paintbrush,
    slug: 'workshops'
  },
  {
    name: 'Theatre',
    icon: Theater,
    slug: 'theatre'
  },
  {
    name: 'Kids',
    icon: Baby,
    slug: 'kids'
  },
  {
    name: 'Open Mics',
    icon: Mic,
    slug: 'open-mics'
  }
]

export default function BrowseByCategory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Browse by Category</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ name, icon: Icon, slug }) => (
          <Link
            key={slug}
            href={`/explore?category=${slug}`}
            className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-sm transition hover:bg-gray-50"
          >
            <Icon size={24} className="mb-2" />
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
