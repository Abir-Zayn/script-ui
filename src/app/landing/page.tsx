import Header from '@/components/Header'
import Hero from '@/app/landing/components/LandingPageHero'
import Features from '@/app/landing/components/LandingPageFeatures'
import LandingPageCard from '@/app/landing/components/landingPageCard'
import Footer from '@/app/landing/components/LandingPageFooter'
import { getUser } from '@/auth/server'

//Landing page anatomy
export default async function LandingPage() {
    const user = await getUser()

    return (
        <div className="min-h-screen">
            <Header user={user} />
            <main>
                <Hero />
                <Features />
                <LandingPageCard />
            </main>
            <Footer />
        </div>
    )
}