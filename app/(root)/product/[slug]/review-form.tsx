'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createUpdateReview, getReviewByProductId } from "@/lib/actions/review.actions";
import { reviewsFormDefaulValues } from "@/lib/constansts";
import { insertReviewSchema } from "@/tests/schema/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, StarIcon } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ReviewForm = ({ userId, productId, onReviewSubmitted }:
  {
    userId: string;
    productId: string; 
    onReviewSubmitted: () => void;
  }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof insertReviewSchema>>({
      resolver: zodResolver(insertReviewSchema),
      defaultValues: reviewsFormDefaulValues,
    });

    const handleOpenForm = async () => {
      form.setValue('userId', userId);
      form.setValue('productId', productId);

      const review = await getReviewByProductId({ productId });
      
      if (review) {
        form.setValue('title', review.title);
        form.setValue('description', review.description);
        form.setValue('rating', review.rating);
      };

      setOpen(true);
    };

    const onSubmit:SubmitHandler<z.infer<typeof insertReviewSchema>> = async(values) => {
      const res = await createUpdateReview({...values, productId});

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message
        });
      }

      setOpen(false);
      onReviewSubmitted();

      toast({
        description: res.message
      });
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant='default' size='lg' onClick={handleOpenForm}>
              Write a review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
             <DialogTitle>Leave a review</DialogTitle>
             <DialogDescription>Share your thoughts with other customers</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField 
              control={form.control}
              name='title'
              render={({ field }: {field: ControllerRenderProps<z.infer<typeof insertReviewSchema>, 'title'>}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='description'
              render={({ field }: {field: ControllerRenderProps<z.infer<typeof insertReviewSchema>, 'description'>}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='rating'
              render={({ field }: {field: ControllerRenderProps<z.infer<typeof insertReviewSchema>, 'rating'>}) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a rating' className="flex items-center" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({length: 5}).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          { index + 1 } <StarIcon className="inline w-4 h-4"/>
                        </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                 <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type='submit'
              size='lg'
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 
              (<>
                <Loader className="w-4 h-4 animate-spin"/> Submitting 
              </>): 
              'Leave your feedback'}
           </Button>
          </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  
  );
};

export default ReviewForm;