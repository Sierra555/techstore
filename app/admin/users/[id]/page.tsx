import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: 'Update user profile'
};

type AdminUserProfileParams = {
  params: Promise<{id: string}>
};

const AdminUserProfile = async ({ params }: AdminUserProfileParams) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) notFound();

  return (
      <div className="max-w-lg mx-auto space-y-8">
        <h2 className="h2-bold">Update User</h2>
        <UpdateUserForm user={user} />
      </div>
  );
};

export default AdminUserProfile;