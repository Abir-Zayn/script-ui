import { ArrowRight } from 'lucide-react'
import React from 'react'

function landingPageCard() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-coral-500 to-coral-600">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to organize your thoughts?
                </h2>
                <p className="text-xl text-coral-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who have transformed their note-taking experience. Start your journey to better organization today.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="bg-white text-coral-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg font-medium">
                    Start free trial
                    <ArrowRight size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-coral-600 transition-all text-lg font-medium">
                    View pricing
                </button>
            </div>

        </section>
    )
}

export default landingPageCard