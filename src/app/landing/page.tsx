import Header from '@/components/Header'
import Hero from '@/components/LandingPageHero'
import Features from '@/components/LandingPageFeatures'
import LandingPageCard from '@/components/landingPageCard'
import Footer from '@/components/LandingPageFooter'
import { getUser } from '@/auth/server'

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