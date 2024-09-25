export function Body({ children, className="" }: { children?: any, className?: string }) {
    return (
      <div className={`flex ${className}`}>{children}</div>
    )
}

export function Left({ children }: { children?: any }) {
    return (
      <div className='hidden lg:block w-full lg:w-1/4'>
        <div className='fixed w-full lg:w-1/4'>
          {children}
        </div>
      </div>
    )
}

export function Mid({ children, className="" }: { children?: any, className?: string }) {
    return (
      <div className={`w-screen lg:w-1/2 flex justify-center ${className}`}>
        <div className="flex-1 max-w-[740px]">
          {children}
        </div>
      </div>
    )
}

export function Right({ children }: { children?: any }) {
    return (
        <div className='hidden lg:block w-full lg:w-1/4'>
          {children}
        </div>
    )
}