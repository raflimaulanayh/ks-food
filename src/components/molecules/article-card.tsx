import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'

interface ArticleCardProps {
  image: string
  category: string
  title: string
  slug: string
}

export const ArticleCard = ({ image, category, title, slug: slug }: ArticleCardProps) => {
  return (
    <Link
      href={`/article/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:scale-100"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 p-5">
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-semibold text-primary">{category}</span>
          <h3 className="line-clamp-2 text-lg leading-tight font-semibold text-slate-900">{title}</h3>
        </div>

        <Button variant="secondary" className="mt-auto w-fit">
          Selengkapnya
        </Button>
      </div>
    </Link>
  )
}
