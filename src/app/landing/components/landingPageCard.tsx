import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function LandingPageCard() {
    return (
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to organize your thoughts?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who have transformed their note-taking experience.
                    Start your journey to better organization today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link href="/signup">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg font-medium">
                            Start free trial
                            <ArrowRight size={20} />
                        </button>
                    </Link>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all text-lg font-medium">
                        View pricing
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LandingPageCard