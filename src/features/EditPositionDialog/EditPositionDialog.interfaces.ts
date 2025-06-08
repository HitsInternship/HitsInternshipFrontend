export interface EditPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { id: string; name: string; description: string };
}
