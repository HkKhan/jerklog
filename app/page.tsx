import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, CheckCircle, Clock, BarChart, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="bg-background/60 backdrop-blur-sm border-b fixed w-full z-50">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <span className="text-lg font-bold text-primary">Jerklog</span>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium hover:text-primary transition-colors">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="mb-4 animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Take Control of Your Habits
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-fade-in-up animation-delay-100">
              Your Personal Journey to{" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Self-Discovery
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[0.2em]"
                  viewBox="0 0 300 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1,5 C50,0 100,7 300,3"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
              A private, supportive, and personalized approach to understanding your patterns and building healthier
              habits. Join a community of individuals on their path to wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
              <Button size="lg" asChild className="btn-shine group">
                <Link href="/register" className="space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="inline-block h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="mt-16 p-6 rounded-2xl glass-panel max-w-4xl mx-auto animate-fade-in animation-delay-800">
              <p className="text-center text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Completely private & confidential.</span> This application
                is designed to be a safe space for your personal journey. Your privacy is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Features
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tools for Your Journey</h2>

            <p className="text-muted-foreground text-lg">
              Designed with care to support your progress without feeling clinical or judgmental. Every feature serves
              your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Track Your Journey",
                description:
                  "Monitor your progress with intuitive tools designed to help you understand your personal patterns with clarity and compassion.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Privacy-First Design",
                description:
                  "Your data is completely anonymous and protected. We prioritize your privacy above all else in this research environment.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Set Personal Goals",
                description:
                  "Create meaningful benchmarks that help you build better habits and take control of your personal journey.",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Mindful Reminders",
                description:
                  "Optional notifications to keep you accountable to your goals without feeling intrusive or clinical.",
              },
              {
                icon: <BarChart className="h-8 w-8" />,
                title: "Insight Reports",
                description:
                  "Gain valuable understanding about your habits and triggers through beautifully designed visual reports.",
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Supportive Resources",
                description:
                  "Access a curated library of helpful content to support your personal growth and wellbeing journey.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card p-6 md:p-8 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-5 p-3 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Success Stories
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join thousands who have transformed their habits</h2>

            <p className="text-muted-foreground text-lg">
              Our community members report an average 67% reduction in unwanted behaviors within the first 3 months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This app has completely changed my relationship with my habits. The non-judgmental approach made all the difference.",
                author: "Alex K.",
              },
              {
                quote:
                  "I've tried many tools before, but the insights and tracking here helped me understand my patterns in a whole new way.",
                author: "Jamie T.",
              },
              {
                quote:
                  "The accountability features helped me stay on track without feeling shame. It's been transformative for my wellbeing.",
                author: "Sam R.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-sm border">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-accent">
                    <svg width="45" height="36" className="fill-current">
                      <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                    </svg>
                  </div>
                  <p className="flex-1 text-lg mb-4">{testimonial.quote}</p>
                  <p className="font-medium">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-lg font-bold text-primary">Jerklog</span>
              <p className="mt-4 text-sm text-muted-foreground">
                Your personal journey to better habits and greater self-awareness.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Jerklog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

