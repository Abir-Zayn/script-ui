import { ArrowRight, FileText, Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left animate-fade-in">
                        <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                            Transform your
                            <span className="text-orange-400 block">chaotic thoughts</span>
                            into organized notes
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                            QuickNotes helps you capture, organize, and find your ideas effortlessly.
                            Say goodbye to scattered thoughts and hello to clarity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="hover:scale-105 transition-transform">
                                <Link href="/signup" className="flex items-center gap-2">
                                    Start organizing
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="hover:scale-105 transition-transform"
                            >
                                Watch demo
                            </Button>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-primary" />
                                <span>Lightning fast</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-primary" />
                                <span>Rich formatting</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-scale-in">
                        <div className="relative">
                            {/* Floating note cards - Dark mode compatible */}
                            <div className="absolute top-10 left-10 bg-card border border-border p-4 rounded-lg shadow-lg transform rotate-12 hover:rotate-6 transition-transform">
                                <div className="w-32 h-20">
                                    <div className="w-full h-2 bg-muted rounded mb-2"></div>
                                    <div className="w-3/4 h-1 bg-muted-foreground/20 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-muted-foreground/20 rounded mb-1"></div>
                                    <div className="w-1/2 h-1 bg-muted-foreground/20 rounded"></div>
                                </div>
                            </div>

                            <div className="absolute top-32 right-8 bg-card border border-border p-4 rounded-lg shadow-lg transform -rotate-6 hover:rotate-0 transition-transform">
                                <div className="w-28 h-16">
                                    <div className="w-full h-2 bg-muted rounded mb-2"></div>
                                    <div className="w-2/3 h-1 bg-muted-foreground/20 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-muted-foreground/20 rounded"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-16 left-16 bg-card border border-border p-4 rounded-lg shadow-lg transform rotate-6 hover:rotate-12 transition-transform">
                                <div className="w-36 h-24">
                                    <div className="w-full h-2 bg-muted rounded mb-2"></div>
                                    <div className="w-5/6 h-1 bg-muted-foreground/20 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-muted-foreground/20 rounded mb-1"></div>
                                    <div className="w-3/4 h-1 bg-muted-foreground/20 rounded"></div>
                                </div>
                            </div>

                            {/* Central illustration - Dark mode compatible */}
                            <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 mx-auto max-w-md">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-full h-3 bg-muted rounded"></div>
                                        <div className="w-4/5 h-2 bg-muted-foreground/20 rounded"></div>
                                        <div className="w-full h-2 bg-muted-foreground/20 rounded"></div>
                                        <div className="w-3/4 h-2 bg-muted-foreground/20 rounded"></div>
                                        <div className="w-full h-2 bg-muted-foreground/20 rounded"></div>
                                        <div className="w-2/3 h-2 bg-muted-foreground/20 rounded"></div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-border">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-6 bg-muted rounded"></div>
                                            <div className="w-8 h-6 bg-muted-foreground/30 rounded"></div>
                                            <div className="w-8 h-6 bg-muted-foreground/40 rounded"></div>
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