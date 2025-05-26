import { Stream } from '@/features/StreamsCRUD/model';

export interface StreamItemProps {
  stream: Stream;
  handleViewLinkedSemesters: (streamId: string) => void;
  handleEditStream: (stream: Stream) => void;
  handleAddLink: (streamId: string) => void;
}
