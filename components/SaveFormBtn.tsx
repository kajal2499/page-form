import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi';
import useDesigner from './hooks/useDesigner';
import { id } from 'date-fns/locale';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';
import { UpdateFormContent } from '@/actions/form';

function SaveFormBtn({id}: {id: number}) {
  const {elements} = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Success",
        description: "your form has been saved",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong ",
        variant: "destructive",
      })
    }
  };
  return (
    <Button variant={"outline"} className="gap-2" disabled={loading} onClick={() => {
      startTransition(updateFormContent);
    }}>
        <HiSaveAs className="h-4 w-4" />
        Save
        {loading && <FaSpinner className="animate-spin" />}
    </Button>
  )
}

export default SaveFormBtn;