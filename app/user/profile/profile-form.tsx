'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile } from "@/lib/actions/user.actions";
import { updateProfileSchema } from "@/tests/schema/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";


const ProfileForm = () => {
  const { data: session, update } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      email: session?.user?.email ?? ''
    }
  });

  const onSubmit:SubmitHandler<z.infer<typeof updateProfileSchema>> = async (values) => {
    const res = await updateUserProfile(values);

    if(!res.success) {
      return toast({
        variant: 'destructive',
        description: res.message,
      });
    }
    
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name
      }
    };

    await update(newSession);

    return toast({
      variant: 'default',
      description: res.message,
    });
  };
  
  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name='name'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof updateProfileSchema>, "name">}) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="input-field" placeholder="Update your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof updateProfileSchema>, "email">}) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="input-field" placeholder="Update your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
             />
          </div>
          <Button type="submit" size='lg' className="button col-span-2 w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Update profile'}
          </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;