import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
const mediaConfig = {
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}

//https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const matchMedia = window.matchMedia
const theme = {
  breakpoints: {
    up: (v: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => matchMedia(`(min-width: ${mediaConfig.theme.screens[v]})`),
    down: (v: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => matchMedia(`(max-width: ${mediaConfig.theme.screens[v]})`)
  }
}

export const useMediaQuery = (query) => {
  if(typeof query === 'function') {
    return query(theme).matches
  }
}