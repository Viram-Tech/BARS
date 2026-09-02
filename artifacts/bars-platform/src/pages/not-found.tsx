import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from '@/components/hugeicons';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex-1 w-full flex items-center justify-center bg-background px-5 py-16">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-3 items-start">
            <AlertCircle className="h-8 w-8 text-destructive shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                404 — page not found
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                This route is not on the BARS platform. Return home, or open the national intelligence dashboard.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="focus-ring inline-flex h-10 items-center rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground">
              Back to home
            </Link>
            <Link href="/dashboard" className="focus-ring inline-flex h-10 items-center rounded-md border border-border px-4 text-xs font-semibold text-foreground">
              Open dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
