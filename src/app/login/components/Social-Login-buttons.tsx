"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SocialLoginButtons() {
    return (
        <div className="space-y-4">
            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-2.5 h-11 hover:bg-muted transition-colors"
                    onClick={() => {
                        // Handle Google login
                        console.log("Google login clicked")
                    }}
                >
                    <Image
                        src="/app_google_logo.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Google</span>
                </Button>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-2.5 h-11 hover:bg-muted transition-colors"
                    onClick={() => {
                        // Handle Facebook login
                        console.log("Facebook login clicked")
                    }}
                >
                    <Image
                        src="/app_facebook_logo.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Facebook</span>
                </Button>
            </div>
        </div>
    )
}