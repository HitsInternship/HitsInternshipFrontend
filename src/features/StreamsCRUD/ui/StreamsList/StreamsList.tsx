import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Stream, StreamSemesterLink } from '@/features/StreamsCRUD/model';
import { useSemesters } from '@/features/SemesterCRUD';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { StreamItem } from '@/features/StreamsCRUD/ui/StreamItem';
import { StreamDialog } from '@/features/StreamsCRUD/ui/StreamDialog';
import { StreamSemesterDialog } from '@/features/StreamsCRUD/ui/StreamSemesterDialog';
import { LinkedSemestersDialog } from '@/features/StreamsCRUD/ui/LinkedSemestersDialog';
import { useStreams } from '@/features/StreamsCRUD/hooks';

export const StreamsList = () => {
  const { data: semesters = [] } = useSemesters(false);
  const { data: streams = [] } = useStreams();

  const [isStreamDialogOpen, setIsStreamDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);
  const [isLinkedSemestersDialogOpen, setIsLinkedSemestersDialogOpen] =
    useState(false);

  const [linkStreamId, setLinkStreamId] = useState('');
  const [currentLinkId, setCurrentLinkId] = useState<string | null>(null);

  const handleAddStream = () => {
    setCurrentStream(null);
    setIsStreamDialogOpen(true);
  };

  const handleEditStream = (stream: Stream) => {
    setCurrentStream(stream);
    setIsStreamDialogOpen(true);
  };

  const handleAddLink = (streamId: string) => {
    setLinkStreamId(streamId);
    setCurrentLinkId(null);
    setIsLinkDialogOpen(true);
  };

  const handleEditLink = (link: StreamSemesterLink) => {
    setLinkStreamId(link.streamId);
    setCurrentLinkId(link.id);
    setIsLinkDialogOpen(true);
  };

  const handleViewLinkedSemesters = (streamId: string) => {
    setSelectedStreamId(streamId);
    setIsLinkedSemestersDialogOpen(true);
  };

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Потоки</CardTitle>
            <CardDescription>Управление учебными потоками</CardDescription>
          </div>
          <Button onClick={handleAddStream}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Добавить поток
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер потока</TableHead>
                <TableHead>Год</TableHead>
                <TableHead>Курс</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Связи</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streams.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-center py-10 text-muted-foreground'
                  >
                    Потоки не найдены
                  </TableCell>
                </TableRow>
              ) : (
                streams.map((stream) => (
                  <StreamItem
                    key={stream.id}
                    stream={stream}
                    handleViewLinkedSemesters={handleViewLinkedSemesters}
                    handleEditStream={handleEditStream}
                    handleAddLink={handleAddLink}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <StreamDialog
        isStreamDialogOpen={isStreamDialogOpen}
        setIsStreamDialogOpen={setIsStreamDialogOpen}
        currentStream={currentStream}
      />

      <StreamSemesterDialog
        isLinkDialogOpen={isLinkDialogOpen}
        setIsLinkDialogOpen={setIsLinkDialogOpen}
        currentLinkId={currentLinkId}
        semesters={semesters}
        linkStreamId={linkStreamId}
      />

      <LinkedSemestersDialog
        isLinkedSemestersDialogOpen={isLinkedSemestersDialogOpen}
        setIsLinkedSemestersDialogOpen={setIsLinkedSemestersDialogOpen}
        streams={streams}
        selectedStreamId={selectedStreamId}
        handleEditLink={handleEditLink}
        handleAddLink={handleAddLink}
      />
    </div>
  );
};
