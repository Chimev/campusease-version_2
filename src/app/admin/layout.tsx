import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800  p-4">
        <nav>
          <ul>
            <li><Link href="/admin/schools">schools</Link></li>
            <li><Link href="/admin/users">Manage Users</Link></li>
            <li><Link href="/admin/listings">Manage Listings</Link></li>
            <li><Link href="/admin/services">Manage Services</Link></li>
            <li><Link href="/admin/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
