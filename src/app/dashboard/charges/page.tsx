'use client';

import { ChargeStatusBadge } from '@/components/Badge';
import { ChargeStatusActions } from '@/components/ChargeStatusActions';
import { ConfirmDeletionDialog } from '@/components/ConfirmDeletionDialog';
import { ResponsivePagination } from '@/components/ResponsivePagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCharge } from '@/hooks/charge/useCharge';
import { formatCurrencyBR, formatDateBR } from '@/utils/formatters';
import { paymentMethodLabels } from '@/utils/labels';
import {
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react';

export default function PageClients() {
  const {
    charges,
    isLoading,
    chargesToView,
    setChargesToView,
    isLoadingService,
    search,
    isConfirmDeletionOpen,
    setConfirmDeletionOpen,
    removeCharges,
    isChargesFormDialogOpen,
    setChargesFormDialogOpen,

    updateChargeStatus,
    handleSearchChange,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    getPageNumbers,
  } = useCharge();

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmDeletionDialog
        itemName={chargesToView?.customer.name}
        itemId={chargesToView?.id}
        entityName="Cobrança"
        isLoading={isLoadingService}
        deleteFn={removeCharges}
        onOpenChange={setConfirmDeletionOpen}
        isOpen={isConfirmDeletionOpen}
      />
      {/* <ChargeFormDialog
        onOpenChange={setChargesFormDialogOpen}
        open={isChargesFormDialogOpen}
      /> */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Cobranças </h1>
        <p className="text-muted-foreground">
          Gerencie as cobranças do seus clientes
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou documento..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setChargesFormDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email do cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Pago em</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : charges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                charges.map((charge) => (
                  <TableRow key={charge.id}>
                    <TableCell>{charge.customer.name}</TableCell>
                    <TableCell>{charge.customer.email}</TableCell>
                    <TableCell>
                      {formatCurrencyBR(charge.amount, charge.currency)}
                    </TableCell>
                    <TableCell>
                      <ChargeStatusBadge status={charge.status} />
                    </TableCell>
                    <TableCell>
                      {paymentMethodLabels[charge.paymentMethod]}
                    </TableCell>
                    <TableCell>{formatDateBR(charge.dueDate)}</TableCell>
                    <TableCell>{formatDateBR(charge.paidAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <ChargeStatusActions
                          onChangeStatus={(status) =>
                            updateChargeStatus(charge.id, status)
                          }
                          status={charge.status}
                          isLoading={isLoadingService}
                        />

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full"
                            >
                              <MoreVerticalIcon className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className="w-48">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => {
                                setChargesToView(charge);
                                setConfirmDeletionOpen(true);
                              }}
                              className="flex items-center gap-2"
                            >
                              <Trash2Icon className="h-4 w-4 text-destructive" />
                              Excluir
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setChargesToView(charge);
                                setChargesFormDialogOpen(true);
                              }}
                              className="flex items-center gap-2"
                            >
                              <PencilIcon className="h-4 w-4 text-yellow-600" />
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <ResponsivePagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => setItemsPerPage(value)}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            getPageNumbers={getPageNumbers}
          />
        </CardContent>
      </Card>
    </div>
  );
}
