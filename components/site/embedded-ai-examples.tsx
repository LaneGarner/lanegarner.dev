import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  ConfidenceIndicator,
  Label,
  Progress,
  Select,
} from "@/components/tutti";

/**
 * Static tutti-ui vignettes for the "AI without the chat box" section: the
 * three shapes embedded AI takes when it isn't a conversation. Canned data,
 * no model anywhere; the point is the interface, not the inference.
 */

const ExampleCard = ({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) => (
  <Card className="h-full">
    <CardContent className="flex h-full flex-col gap-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {caption}
      </p>
      {children}
    </CardContent>
  </Card>
);

export const EmbeddedAIExamples = () => {
  return (
    <div className="mx-auto grid max-w-4xl auto-rows-fr gap-6 md:grid-cols-3">
      <ExampleCard caption="A survey becomes a plan">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ai-example-goal">Goal</Label>
          <Select id="ai-example-goal" size="sm" defaultValue="strength">
            <option value="strength">Build strength</option>
            <option value="endurance">Endurance</option>
          </Select>
          <Label htmlFor="ai-example-equipment">Equipment</Label>
          <Select id="ai-example-equipment" size="sm" defaultValue="dumbbells">
            <option value="dumbbells">Dumbbells only</option>
            <option value="full">Full gym</option>
          </Select>
        </div>
        <Progress value={100} variant="success" aria-label="Plan generated" />
        <p className="mt-auto text-sm text-ink-muted">
          Three weeks of workouts land on the calendar. No chat involved.
        </p>
      </ExampleCard>

      <ExampleCard caption="Coaching that speaks up">
        <Alert variant="info">
          <AlertTitle>Bench press has stalled</AlertTitle>
          <AlertDescription>
            Three weeks without progress. Try a 5% deload on Friday.
          </AlertDescription>
        </Alert>
        <ConfidenceIndicator value={86} label="Confidence" size="sm" />
        <p className="mt-auto text-sm text-ink-muted">
          The model reads your training data and raises its hand first.
        </p>
      </ExampleCard>

      <ExampleCard caption="Digests where you already are">
        <div className="flex items-start gap-3">
          <Avatar size="sm">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <p className="rounded-md rounded-tl-none bg-surface px-3 py-2 text-sm leading-relaxed dark:bg-chrome dark:text-chrome-ink">
            Weekly recap: 4 of 5 kept their streak. Sarah leads by 12
            points, closable in 3 days.
          </p>
        </div>
        <p className="mt-auto text-sm text-ink-muted">
          Posted by a cron job, straight into the group chat.
        </p>
      </ExampleCard>
    </div>
  );
};
