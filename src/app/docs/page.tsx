export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to CREDRUM documentation. Learn how to integrate and use our platform effectively.
            </p>
            <div className="bg-secondary/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Create your account</li>
                <li>Set up your first project</li>
                <li>Configure your settings</li>
                <li>Start using CREDRUM features</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="text-muted-foreground mb-4">
              Comprehensive API documentation for developers.
            </p>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground">Learn about API authentication and security</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Endpoints</h3>
                <p className="text-sm text-muted-foreground">Explore available API endpoints</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <p className="text-sm text-muted-foreground">Understanding rate limits and quotas</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Guides</h2>
            <p className="text-muted-foreground mb-4">
              Step-by-step guides for common use cases.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">→</span>
                Setting up your first integration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">→</span>
                Best practices for security
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">→</span>
                Troubleshooting common issues
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}