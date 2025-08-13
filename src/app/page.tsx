"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Layers, Globe, Code2, Database, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">NexForge AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/docs">
              <Button variant="ghost">Documentation</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Zap className="mr-1 h-3 w-3" />
              AI-Powered App Builder
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400 md:text-7xl">
              Build Apps 10x Faster
              <br />
              with AI & No-Code
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
              Create production-ready applications with natural language, visual editing, and
              powerful backend capabilities. More flexible than Lovable.dev, more powerful than
              traditional no-code tools.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Link href="/auth/signup">
                <Button size="lg" className="group">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="AI-First Development"
              description="Describe your app in natural language and watch it come to life"
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Visual Builder"
              description="Drag-and-drop components with real-time preview and editing"
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="Full-Stack Ready"
              description="Built-in database, auth, and API management with Supabase"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6" />}
              title="Deploy Anywhere"
              description="One-click deployment to Vercel, Cloudflare, or self-host"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">Everything You Need to Build Modern Apps</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              From ideation to production in minutes, not months
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <CapabilityCard
              icon={<Code2 className="h-8 w-8" />}
              title="Smart Code Generation"
              description="Generate TypeScript, React components, API routes, and database schemas with AI"
              features={[
                "Component generation from prompts",
                "Smart API endpoint creation",
                "Database schema auto-design",
                "Code optimization suggestions",
              ]}
            />
            <CapabilityCard
              icon={<Palette className="h-8 w-8" />}
              title="Advanced UI Builder"
              description="Design beautiful, responsive interfaces with our visual editor"
              features={[
                "Drag-and-drop interface",
                "Component library",
                "Theme customization",
                "Responsive design tools",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-900"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

function CapabilityCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl border bg-white p-8 dark:bg-gray-900"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-3 text-2xl font-bold">{title}</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
