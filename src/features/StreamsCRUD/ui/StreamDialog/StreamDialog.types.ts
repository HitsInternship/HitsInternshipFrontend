import { Stream } from '@/features/StreamsCRUD/model';

export interface StreamDialogProps {
  isStreamDialogOpen: boolean;
  setIsStreamDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentStream: Stream | null;
}
