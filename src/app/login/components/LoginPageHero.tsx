import Image from "next/image";

export default function LoginPageHero() {
    return (
        <div className="hidden lg:flex lg:flex-1 lg:relative">
            <Image src="public/appimage.jpg" alt="Login Hero Image"
                className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
    )
}