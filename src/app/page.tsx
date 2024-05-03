// pages/index.js
'use client';
import LeftNav from '@/components/leftnav';
import UpNav from '@/components/upnav';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Triangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import HeroSectionWithEmailInput from '@/components/ui/HeroToolkit';
export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    
    return (
      
        <TooltipProvider>
          <div className="grid h-screen w-full pl-[53px]">
            <div className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
              <div className="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                  <Triangle className="size-5 fill-foreground" />
                </Button>
              </div>
              <LeftNav />
            </div>
            <div className="flex flex-col">
              <UpNav />
              <main className=" flex justify-center">
                <div className=''>
                <HeroSectionWithEmailInput/>

                </div>
              </main>
            </div>
          </div>
        </TooltipProvider>
    );
  }

  return(
    <>
    
  <div className='basiccenter'>
  <Link href="/api/auth/login"><button className='basicbutton'>Login</button></Link>
</div>
</>);
}