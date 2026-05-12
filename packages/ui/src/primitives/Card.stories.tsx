import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "./Button";

const meta = {
  title: "DoMe UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Projekt-Status</CardTitle>
        <CardDescription>Aktueller Stand der Werkstatt.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Drei Agenten aktiv, eine Aufgabe wartet auf Freigabe.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="gold" size="sm">Details</Button>
        <Button variant="outlineGold" size="sm">Schliessen</Button>
      </CardFooter>
    </Card>
  ),
};

export const Miniapp: Story = {
  render: () => (
    <Card variant="miniapp" className="max-w-md">
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardDescription>5 neue Nachrichten.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Letzter Eingang vor 12 Minuten.</p>
      </CardContent>
    </Card>
  ),
};
