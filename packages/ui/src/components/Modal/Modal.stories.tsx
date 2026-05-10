import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import { Modal } from "./Modal";

const meta = {
  title: "DoMe UI/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Modal öffnen</Button>
      <Modal open={open} onOpenChange={setOpen} title="Projekt veröffentlichen">
        <Stack gap="md">
          <p>
            Diese Demo zeigt ein einfaches, tastaturfreundliches Modal mit Escape-Schließen und
            Fokus-Restore.
          </p>
          <Stack direction="row" gap="sm" justify="flex-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setOpen(false)}>Veröffentlichen</Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};
