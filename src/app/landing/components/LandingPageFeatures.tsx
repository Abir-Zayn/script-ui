import { FileText, Search, Shield, Smartphone, Users, Zap } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Zap className="h-8 w-8 text-blue-600" />,
            title: "Lightning Fast",
            description: "Write and access your notes instantly with our optimized performance engine."
        },
        {
            icon: <FileText className="h-8 w-8 text-green-600" />,
            title: "Rich Formatting",
            description: "Format your notes with bold, italic, lists, and more to make them stand out."
        },
        {
            icon: <Search className="h-8 w-8 text-purple-600" />,
            title: "Smart Search",
            description: "Find any note instantly with our powerful search that understands context."
        },
        {
            icon: <Shield className="h-8 w-8 text-red-600" />,
            title: "Secure & Private",
            description: "Your notes are encrypted and protected with enterprise-grade security."
        },
        {
            icon: <Smartphone className="h-8 w-8 text-orange-600" />,
            title: "Cross-Platform",
            description: "Access your notes anywhere - web, mobile, or desktop. Always in sync."
        },
        {
            icon: <Users className="h-8 w-8 text-indigo-600" />,
            title: "Team Collaboration",
            description: "Share and collaborate on notes with your team in real-time."
        }
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Everything you need to stay organized
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Powerful features designed to make note-taking effortless and enjoyable.
                        From simple text to complex formatting, we've got you covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;