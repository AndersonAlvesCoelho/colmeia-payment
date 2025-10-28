import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type ConfirmDeletionDialogProps = {
  itemName?: string;
  itemId?: string;
  entityName: string;
  isLoading?: boolean;
  deleteFn: (id: string) => Promise<boolean>;
  onOpenChange: (value: boolean) => void;
  isOpen?: boolean;
  warningText?: string;
};

export function ConfirmDeletionDialog({
  itemName,
  itemId,
  entityName,
  warningText,
  isLoading = false,
  deleteFn,
  isOpen,
  onOpenChange,
}: ConfirmDeletionDialogProps) {
  if (!itemId) return null;

  const handleConfirmDeletion = async () => {
    if (itemId) {
      const success = await deleteFn(itemId);
      if (success) onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash className="h-5 w-5 text-red-500" />
            Deletar {entityName}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2">
              <p className='font-medium '>
                Você tem certeza que deseja deletar {entityName.toLowerCase()}
                {itemName && ` "${itemName}"`}? Esta ação é irreversível.
              </p>

              {warningText && (
                <div className="flex items-start gap-3 rounded-md bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm text-yellow-800 shadow-sm">
                  <AlertTriangleIcon className="h-5 w-5 mt-0.5 text-yellow-500" />
                  <span>{warningText}</span>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleConfirmDeletion}
            disabled={isLoading}
          >
            Confirmar Deleção
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
