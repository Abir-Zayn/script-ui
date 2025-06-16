import Image from "next/image";

export default function LoginPageHero() {
    return (
        <div className="hidden lg:flex lg:flex-1 lg:relative lg:min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/app_auth_img.jpg"
                    alt="Login Hero Image"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
                <div className="max-w-md space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">
                        Organize Your Thoughts
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                        Join thousands of users who have transformed their note-taking experience with Script Universe.
                    </p>
                    <div className="flex items-center justify-center space-x-8 pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">10K+</div>
                            <div className="text-sm text-white/80">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">500K+</div>
                            <div className="text-sm text-white/80">Notes Created</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}