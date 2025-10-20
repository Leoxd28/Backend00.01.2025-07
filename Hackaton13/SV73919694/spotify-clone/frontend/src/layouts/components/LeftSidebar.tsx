import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <div className='h-full flex flex-col gap-2 pr-2'>

        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='space-y-2'>
                <Link to='/' className={cn(
                    buttonVariants({
                        variant: 'ghost',
                        className: 'w-full justify-start text-white hover:bg-zinc-800 hover:text-white' 
                    })
                )}>
                    <HomeIcon className='mr-2 size-5' />
                    <span className='hidden md:inline'>Home</span>
                </Link>

                {/*  */}

                <Link to='/' className={cn(
                    buttonVariants({
                        variant: 'ghost',
                        className: 'w-full justify-start text-white hover:bg-zinc-800 hover:text-white' 
                    })
                )}>
                    <MessageCircle className='mr-2 size-5' />
                    <span className='hidden md:inline'>Messages</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar