import { useState } from 'react';
import {
  UsersIcon,
  Download,
  FileText,
  Mail,
  Phone,
  MessageCircle,
  User,
  ExternalLink,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { type Curator, useCompanyCurators } from '@/entities/Curators';
import type { Company } from '@/entities/Company/models';
import { type Agreement, useCompanyAgreements } from '@/entities/Agreement';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table.tsx';
import { getDocumentById } from '@/entities/Document/api';
import { AgreementUploadDialog } from '@/pages/CompaniesPage/ui/AgreementUploadDialog';
import { CreateCuratorModal } from '@/pages/CompaniesPage/ui/CreateCuratorDialog/CreateCuratorDialog.tsx';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

interface CompanyDetailsModalProps {
  company: Company;
}

export const CompanyDetailsModal = ({ company }: CompanyDetailsModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    userStore: { roles },
  } = useStores();

  const isDeanMember =
    roles.includes(UserRole.DeanMember) && roles.length === 1;

  const { data: curators, isLoading: curatorsLoading } = useCompanyCurators(
    company.id,
  );

  const { data: agreements, isLoading: agreementsLoading } =
    useCompanyAgreements(company.id);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = async (agreement: Agreement) => {
    await getDocumentById({
      params: { documentId: agreement.documentId },
      filename: agreement.description,
    });
  };

  const handleTelegramClick = (telegram: string) => {
    window.open(`https://t.me/${telegram}`, '_blank');
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setIsModalOpen(true)}
          className='w-full'
        >
          <UsersIcon className='mr-2 h-4 w-4' />
          <span className='truncate'>Подробнее</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-fit flex flex-col'>
        <DialogHeader className='pb-4'>
          <DialogTitle className='text-2xl font-bold'>
            {company.name}
          </DialogTitle>
          {company.description && (
            <p className='text-muted-foreground mt-2 leading-relaxed'>
              {company.description}
            </p>
          )}
        </DialogHeader>

        <div className='flex flex-col gap-5 h-full'>
          {/* Документы */}
          <Card className='flex flex-col shadow-sm h-fit'>
            <CardHeader className=' flex pb-4 justify-between items-center'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  <FileText className='h-5 w-5 text-blue-600' />
                </div>
                Документы
                {agreements && agreements.length > 0 && (
                  <Badge variant='secondary' className='ml-auto'>
                    {agreements.length}
                  </Badge>
                )}
              </CardTitle>
              <AgreementUploadDialog companyId={company.id} />
            </CardHeader>
            <CardContent className='h-fit'>
              {agreementsLoading ? (
                <div className='flex items-center justify-center h-40'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
                  <span className='ml-3 text-muted-foreground'>
                    Загрузка документов...
                  </span>
                </div>
              ) : !agreements || agreements.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-40 text-muted-foreground'>
                  <FileText className='h-12 w-12 mb-3 opacity-50' />
                  <p className='text-center'>Документы отсутствуют</p>
                </div>
              ) : (
                <div className='h-fit max-h-40 overflow-y-scroll pr-4'>
                  <div className='space-y-2'>
                    {agreements.map((agreement: Agreement) => (
                      <div
                        key={agreement.documentId}
                        className='group flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 hover:border-muted-foreground/20 transition-all duration-200'
                      >
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                          <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors'>
                            <FileText className='h-4 w-4 text-gray-600' />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <p className='text-sm font-medium truncate text-foreground'>
                              {agreement.description}
                            </p>
                            <p className='text-xs text-muted-foreground mt-1'>
                              Документ компании
                            </p>
                          </div>
                        </div>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => handleDownload(agreement)}
                          className='flex-shrink-0 hover:bg-blue-50 hover:text-blue-600'
                        >
                          <Download className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Кураторы */}
          <Card className='flex flex-col shadow-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg mb-2'>
                <div className='p-2 bg-green-100 rounded-lg'>
                  <User className='h-5 w-5 text-green-600' />
                </div>
                Кураторы
                {curators && curators.length > 0 && (
                  <Badge variant='secondary' className='ml-auto'>
                    {curators.length}
                  </Badge>
                )}
              </CardTitle>
              {isDeanMember && <CreateCuratorModal company={company} />}
            </CardHeader>
            <CardContent className='flex-1 min-h-0 pt-0'>
              {curatorsLoading ? (
                <div className='flex items-center justify-center h-40'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600' />
                  <span className='ml-3 text-muted-foreground'>
                    Загрузка кураторов...
                  </span>
                </div>
              ) : !curators || curators.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-40 text-muted-foreground'>
                  <User className='h-12 w-12 mb-3 opacity-50' />
                  <p className='text-center'>Кураторы не назначены</p>
                </div>
              ) : (
                <ScrollArea className='h-38'>
                  <div className='border rounded-xl overflow-hidden'>
                    <Table>
                      <TableHeader>
                        <TableRow className='bg-muted/50'>
                          <TableHead className='font-semibold'>ФИО</TableHead>
                          <TableHead className='font-semibold'>
                            Контакты
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {curators.map((curator: Curator) => (
                          <TableRow
                            key={curator.id}
                            className='hover:bg-muted/30'
                          >
                            <TableCell className='py-4'>
                              <div className='font-medium text-foreground'>
                                {curator.surname} {curator.name}
                              </div>
                            </TableCell>
                            <TableCell className='py-4'>
                              <div className='space-y-2'>
                                <div className='flex items-center gap-2'>
                                  <Mail className='h-4 w-4 text-muted-foreground' />
                                  {curator.email}
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Phone className='h-4 w-4 text-muted-foreground' />
                                  {curator.phone}
                                </div>
                                {curator.telegram && (
                                  <div className='flex items-center gap-2'>
                                    <MessageCircle className='h-4 w-4 text-muted-foreground' />
                                    <button
                                      onClick={() =>
                                        handleTelegramClick(curator.telegram)
                                      }
                                      className='text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                                    >
                                      @{curator.telegram}
                                    </button>
                                    <ExternalLink className='h-3 w-3 text-muted-foreground' />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
