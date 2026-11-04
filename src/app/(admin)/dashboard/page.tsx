import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

// The dashboard is a modal over the site (src/components/admin-dialogs.tsx).
// This address opens it on the home page, for bookmarks and old links.
export default function DashboardPage() {
  redirect('/?dashboard')
}
