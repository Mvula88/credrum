"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  Database,
  Lock
} from "lucide-react";

export default function DemoPage() {
  const [activeFeature, setActiveFeature] = useState("analytics");

  const features = {
    analytics: {
      title: "Advanced Analytics",
      description: "Track and analyze your data in real-time with powerful insights",
      icon: BarChart3,
      demo: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Total Users</p>
              <p className="text-2xl font-bold">12,543</p>
              <p className="text-xs text-green-600">+12.5% from last month</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Active Sessions</p>
              <p className="text-2xl font-bold">3,291</p>
              <p className="text-xs text-green-600">+8.3% from last week</p>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Performance Metrics</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-bold">45%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    security: {
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption",
      icon: Shield,
      demo: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900 dark:text-green-100">Security Status</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">All systems operational and secure</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">Two-Factor Authentication</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">SSL Certificate</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Valid</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">Data Encryption</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">AES-256</span>
            </div>
          </div>
        </div>
      )
    },
    performance: {
      title: "Lightning Fast",
      description: "Optimized for speed and efficiency",
      icon: Zap,
      demo: (
        <div className="space-y-4">
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-3xl font-bold mb-2">0.023s</p>
            <p className="text-sm text-muted-foreground">Average Response Time</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xl font-bold">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xl font-bold">50ms</p>
              <p className="text-xs text-muted-foreground">Latency</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xl font-bold">1M+</p>
              <p className="text-xs text-muted-foreground">Requests/day</p>
            </div>
          </div>
        </div>
      )
    },
    collaboration: {
      title: "Team Collaboration",
      description: "Work together seamlessly with your team",
      icon: Users,
      demo: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold">AS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Alice Smith</p>
                <p className="text-xs text-muted-foreground">Last seen 5 mins ago</p>
              </div>
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold">BJ</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Bob Johnson</p>
                <p className="text-xs text-muted-foreground">In a meeting</p>
              </div>
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Invite Team Members
          </Button>
        </div>
      )
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
          <p className="text-xl text-muted-foreground">
            Explore CREDRUM features in action. No signup required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            {Object.entries(features).map(([key, feature]) => {
              const Icon = feature.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeFeature === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className={`text-xs ${
                        activeFeature === key 
                          ? "text-primary-foreground/80" 
                          : "text-muted-foreground"
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {features[activeFeature as keyof typeof features].title}
                </h3>
                <p className="text-muted-foreground">
                  {features[activeFeature as keyof typeof features].description}
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6">
                {features[activeFeature as keyof typeof features].demo}
              </div>
            </div>

            <div className="mt-8 bg-primary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Try it yourself</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="demo-input">Sample Input</Label>
                  <Input 
                    id="demo-input" 
                    placeholder="Enter test data..."
                    className="mt-1"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Run Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                This is a simulated demo. Sign up for full access to all features.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users already using CREDRUM
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth/signup">Start Free Trial</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/pricing">View Pricing</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}