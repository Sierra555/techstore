'use client';

import { useToast } from '@/hooks/use-toast';
import { updateUserSchema } from '@/tests/schema/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER_ROLES } from '@/lib/constansts';
import { updateUser } from '@/lib/actions/user.actions';


const UpdateUserForm = ({ user }: { user: z.infer<typeof updateUserSchema>}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit:SubmitHandler<z.infer<typeof updateUserSchema>> = async (values) => {
    const res = await updateUser({...values, id: user.id});

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    }

    toast({
      description: res.message,
    });
    form.reset();
    router.push('/admin/users');
  };

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name='name'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "name">}) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="input-field" placeholder="Update user name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "email">}) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="input-field" placeholder="Enter user email" disabled={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
             />
             <FormField
              control={form.control}
              name='role'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "role">}) => (
                <FormItem className="w-full">
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger> 
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {USER_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
             />
          
          <Button type="submit" size='lg' className="button col-span-2 w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Updatting...' : 'Update user'}
          </Button>
          </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;