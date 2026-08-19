import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LeadMessageCard({ message }: { message: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}