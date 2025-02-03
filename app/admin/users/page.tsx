import { Metadata } from "next";
import { deleteUser, getAllUser } from "@/lib/actions/user.actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from "next/link";
import Pagination from '@/components/shared/pagination';
import { formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata={
  title: "Admin Users"
};

type AdminUserPageParams = {
  searchParams: Promise<{page: string,  query: string}>
}

const AdminUserPage = async ({ searchParams }: AdminUserPageParams ) => {
  const {page = '1', query:searchText} = await searchParams;

  const users = await getAllUser({ page: Number(page), query: searchText });

  return (
    <div className='space-y-2'>
    <div className='flex items-center gap-5'>
            <h1 className='h2-bold'>Users</h1>
            {searchText && (
              <div className="space-x-5">
                Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                <Link href='/admin/users'>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
         </div>      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{formatId(user.id)}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.role === 'user' ? (
                      <Badge variant='secondary'>User</Badge>
                    ) : (
                      <Badge variant='default'>Admin</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/admin/users/${user.id}`}> 
                        Edit
                      </Link>
                    </Button>
                   <DeleteDialog id={user.id} action={deleteUser} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        { users.totalPages > 1 && (
          <Pagination 
            page={Number(page) || 1} 
            totalPages={users.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;