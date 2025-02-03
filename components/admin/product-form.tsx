'use client';

import { useToast } from '@/hooks/use-toast';
import { productDefaultValues } from '@/lib/constansts';
import { insertProductSchema, updateProductSchema } from '@/tests/schema/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import slugify from 'slugify'; 
import { z } from 'zod';
import { Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { UploadButton } from '@/lib/uploadthing';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';

const ProductForm = ({ type, product, productId }: {
  type: 'Create' | 'Update';
  product?: Product,
  productId?: string,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: type === 'Create' ? zodResolver(insertProductSchema) : zodResolver(updateProductSchema),
    defaultValues: product && type === 'Update' ? product : productDefaultValues
  });

  const handleResponse = (res: {success: boolean, message: string}) => {
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message
      });
    } else {
      toast({
        description: res.message
      });

      router.push('admin/products');
    };
 
  }
  const onSubmit:SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
    if (type === 'Create') {
      const res = await createProduct(values);

      handleResponse(res);
    }

    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }
      const res = await updateProduct({ ...values, id: productId });

      handleResponse(res);
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form method="POST" className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField 
          control={form.control}
          name='name'
          render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>}) => (
            <FormItem className='w-full'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter product name'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
            <FormField 
            control={form.control}
            name='slug'
            render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>}) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative space-y-2">
                  <Input {...field} placeholder='Enter product slug'/>
                  <Button type='button' className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2'
                   onClick={() =>  form.setValue('slug', slugify(form.getValues('name'), { lower: true }))}
                   disabled={!form.getValues('name')}>
                    Generate slug
                  </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
        <FormField 
          control={form.control}
          name='category'
          render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'>}) => (
            <FormItem className='w-full'>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter product category'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
           <FormField 
            control={form.control}
            name='brand'
            render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'>}) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter product brand'/>
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField 
            control={form.control}
            name='price'
            render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'>}) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
              control={form.control}
              name='stock'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'>}) => (
                <FormItem className='w-full'>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div>
        <FormField 
          control={form.control}
          name='description'
          render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>}) => (
            <FormItem className='w-full'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Enter product description' className='resize-none'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
        <FormField 
          control={form.control}
          name='images'
          render={() => (
            <FormItem className='w-full'>
              <FormLabel>Images</FormLabel>
              <Card>
                <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className="flex-start space-x-2">
                      {images.map((img: string) => (
                        <Image
                          key={img}
                          src={img}
                          alt="Product image"
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                         />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: {
                            url: string;
                          }[]) => {form.setValue('images', [...images, res[0].url])}}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: `Error! ${error}`
                            })
                          }}
                         />
                      </FormControl>
                    </div>
                </CardContent>
              </Card>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="upload-field">
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
            <FormField 
              control={form.control}
              name='isFeatured'
              render={({ field }:{field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'isFeatured'>}) => (
                <FormItem className='space-x-2 itemd-center'>
                  <FormControl>
                    <Checkbox 
                      checked={ field.value } 
                      onCheckedChange={
                      field.onChange} />
                  </FormControl>
                  <FormLabel>If Featured</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isFeatured && banner && (
              <Image 
                src={banner} 
                alt='Porduct banner' 
                className='w-full object-cover object-center rounded-sm'
                width={1920}
                height={680}
               />
            )}
            {isFeatured && !banner && (
               <UploadButton
               endpoint='imageUploader'
               onClientUploadComplete={(res: {
                 url: string;
               }[]) => {form.setValue('banner', res[0].url)}}
               onUploadError={(error: Error) => {
                 toast({
                   variant: 'destructive',
                   description: `Error! ${error}`
                 })
               } }
              />
            )}
            </CardContent>
          </Card>
        </div>
        <Button 
          type='submit' 
          size='lg' 
          disabled={form.formState.isSubmitting}
          >
          {form.formState.isSubmitting ? (
            <>
              <Loader className='w-4 h-4 animate-spin'/> 
              `{type === 'Update' ? 'Updating' : 'Creating' }
            </>
          ) : (
            `${ type === 'Update' ? 'Update' : 'Create' } Product`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;