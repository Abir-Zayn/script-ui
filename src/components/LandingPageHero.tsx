import { ArrowRight, FileText, Zap } from "lucide-react";

const Hero = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left animate-fade-in">
                        <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                            Transform your
                            <span className="text-gray-600 block">chaotic thoughts</span>
                            into organized notes
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                            QuickNotes helps you capture, organize, and find your ideas effortlessly.
                            Say goodbye to scattered thoughts and hello to clarity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg font-medium">
                                Start organizing now
                                <ArrowRight size={20} />
                            </button>
                            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-black transition-colors text-lg font-medium">
                                Watch demo
                            </button>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-black" />
                                <span>Lightning fast</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-black" />
                                <span>Rich formatting</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-scale-in">
                        <div className="relative">
                            {/* Floating note cards */}
                            <div className="absolute top-10 left-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform rotate-12 hover:rotate-6 transition-transform">
                                <div className="w-32 h-20">
                                    <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
                                    <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <div className="absolute top-32 right-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform -rotate-6 hover:rotate-0 transition-transform">
                                <div className="w-28 h-16">
                                    <div className="w-full h-2 bg-gray-400 rounded mb-2"></div>
                                    <div className="w-2/3 h-1 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-16 left-16 bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform rotate-6 hover:rotate-12 transition-transform">
                                <div className="w-36 h-24">
                                    <div className="w-full h-2 bg-gray-500 rounded mb-2"></div>
                                    <div className="w-5/6 h-1 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            {/* Central illustration */}
                            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 mx-auto max-w-md">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                                        <div className="w-4/5 h-2 bg-gray-100 rounded"></div>
                                        <div className="w-full h-2 bg-gray-100 rounded"></div>
                                        <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                                        <div className="w-full h-2 bg-gray-100 rounded"></div>
                                        <div className="w-2/3 h-2 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-6 bg-gray-200 rounded"></div>
                                            <div className="w-8 h-6 bg-gray-300 rounded"></div>
                                            <div className="w-8 h-6 bg-gray-400 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;