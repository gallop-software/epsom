import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

// Sign-in is a modal over the site (src/components/admin-dialogs.tsx). The
// address still works, for bookmarks and old links: it opens the modal on the
// home page, with a sign-in link's error if it came with one.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  redirect(
    error
      ? `/?login&error=${encodeURIComponent(error.slice(0, 40))}`
      : '/?login'
  )
}
