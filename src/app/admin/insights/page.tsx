import AdminAppInsights from '@/admin/AdminAppInsights';
import AdminInfoPage from '@/admin/AdminInfoPage';
import GitHubForkStatusBadge from '@/admin/github/GitHubForkStatusBadge';
import { IS_DEVELOPMENT, IS_VERCEL_GIT_PROVIDER_GITHUB } from '@/site/config';

export default async function AdminInsightsPage() {
  return <AdminInfoPage
    title="App Insights"
    accessory={(IS_VERCEL_GIT_PROVIDER_GITHUB || IS_DEVELOPMENT) &&
      <GitHubForkStatusBadge />}
  >
    <AdminAppInsights />
  </AdminInfoPage>;
}
