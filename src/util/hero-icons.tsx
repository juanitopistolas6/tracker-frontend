import * as OutlineIcons from '@heroicons/react/24/outline'

export type IconName = keyof typeof OutlineIcons

interface HeroIconsProps {
  name: IconName
  className?: string
  stroke?: number
}

export const HeroIcons = ({ name, className, stroke }: HeroIconsProps) => {
  const Icon = OutlineIcons[name]
  return <Icon className={className ?? 'w-6 h-6'} strokeWidth={stroke ?? 1} />
}
