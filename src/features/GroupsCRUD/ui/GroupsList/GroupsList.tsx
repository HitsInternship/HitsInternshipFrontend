import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { useGroups } from '@/features/GroupsCRUD/hooks';
import { Group } from '@/features/StreamsCRUD/model/types';
import { GroupDialog } from '@/features/GroupsCRUD/ui/GroupDialog';
import { useStreams } from '@/features/StreamsCRUD/hooks';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { GroupItem } from '@/features/GroupsCRUD/ui/GroupItem';

export const GroupsList = () => {
  const { data: groups = [] } = useGroups();
  const { data: streams = [] } = useStreams();

  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const getStreamInfo = (streamId: string) => {
    return streams.find((s) => s.id === streamId);
  };

  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleEditGroup = (group: Group) => {
    setCurrentGroup(group);
    setIsGroupDialogOpen(true);
  };

  const handleAddGroup = () => {
    setCurrentGroup(null);
    setIsGroupDialogOpen(true);
  };

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Группы</CardTitle>
            <CardDescription>
              Управление учебными группами и студентами
            </CardDescription>
          </div>
          <Button onClick={handleAddGroup}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Добавить группу
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {groups.length === 0 ? (
              <div className='text-center py-10 text-muted-foreground'>
                Группы не найдены
              </div>
            ) : (
              groups.map((group) => {
                const streamInfo = getStreamInfo(group.streamId);
                const isExpanded = expandedGroups.has(group.id);
                const headMan = group.students.find((s) => s.isHeadMan);

                return (
                  <GroupItem
                    key={group.id}
                    group={group}
                    headMan={headMan}
                    streamInfo={streamInfo}
                    isExpanded={isExpanded}
                    toggleGroupExpansion={toggleGroupExpansion}
                    handleEditGroup={handleEditGroup}
                  />
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <GroupDialog
        isGroupDialogOpen={isGroupDialogOpen}
        setIsGroupDialogOpen={setIsGroupDialogOpen}
        currentGroup={currentGroup}
        streams={streams}
      />
    </div>
  );
};
