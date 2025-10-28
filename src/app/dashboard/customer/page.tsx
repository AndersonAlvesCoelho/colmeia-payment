'use client';

import { ConfirmDeletionDialog } from '@/components/ConfirmDeletionDialog';
import { CustomerFormDialog } from '@/components/customer/CustomerFormDialog';
import { ResponsivePagination } from '@/components/ResponsivePagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCustomers } from '@/hooks/customer/useCustomers';
import { PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';

export default function PageCharge() {
  const {
    customers,
    isLoading,
    customersToView,
    setCustomersToView,
    isLoadingService,
    search,
    isConfirmDeletionOpen,
    setConfirmDeletionOpen,
    removeCustomer,
    isCustomerFormDialogOpen,
    setCustomerFormDialogOpen,

    handleSearchChange,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    getPageNumbers,
  } = useCustomers();

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmDeletionDialog
        itemName={customersToView?.name}
        itemId={customersToView?.id}
        entityName="Cliente"
        isLoading={isLoadingService}
        deleteFn={removeCustomer}
        onOpenChange={setConfirmDeletionOpen}
        isOpen={isConfirmDeletionOpen}
      />
      <CustomerFormDialog
        onOpenChange={setCustomerFormDialogOpen}
        open={isCustomerFormDialogOpen}
      />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Clientes</h1>
        <p className="text-muted-foreground">Gerencie seus clientes</p>
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
            <Button onClick={() => setCustomerFormDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.document}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCustomersToView(client);
                          setConfirmDeletionOpen(true);
                        }}
                      >
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                          setCustomersToView(client);
                          setCustomerFormDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4 text-yellow-600" />
                        <span className="sr-only">Editar</span>
                      </Button>
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
