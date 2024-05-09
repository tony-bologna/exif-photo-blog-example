import { parseAiAutoGeneratedFieldsText } from '@/photo/ai';
import type { StorageType } from '@/services/storage';
import { makeUrlAbsolute, shortenUrl } from '@/utility/url';

// HARD-CODED GLOBAL CONFIGURATION

export const SHOULD_PREFETCH_ALL_LINKS: boolean | undefined = undefined;
export const SHOULD_DEBUG_SQL = false;

// META / DOMAINS

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  'Photo Blog';

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const VERCEL_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const VERCEL_DEPLOYMENT_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_BRANCH_URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
const VERCEL_BRANCH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
// Last resort: cannot be used reliably
const VERCEL_PROJECT_URL = VERCEL_BRANCH_URL && VERCEL_BRANCH
  ? `${VERCEL_BRANCH_URL.split(`-git-${VERCEL_BRANCH}-`)[0]}.vercel.app`
  : undefined;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production' && (
  // Make environment checks resilient to non-Vercel deployments
  VERCEL_ENV === 'production' ||
  !VERCEL_ENV
);

// User-facing domain, potential site title
const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN ||
  VERCEL_PRODUCTION_URL ||
  VERCEL_PROJECT_URL ||
  VERCEL_DEPLOYMENT_URL;

// Used primarily for absolute references such as OG images
export const BASE_URL = makeUrlAbsolute((
  process.env.NODE_ENV === 'production' &&
  VERCEL_ENV !== 'preview'
) ? SITE_DOMAIN
  : VERCEL_ENV === 'preview'
    ? VERCEL_BRANCH_URL || VERCEL_DEPLOYMENT_URL
    : 'http://localhost:3000')?.toLocaleLowerCase();

const SITE_DOMAIN_SHORT = shortenUrl(SITE_DOMAIN);

export const SITE_DOMAIN_OR_TITLE =
  SITE_DOMAIN_SHORT ||
  SITE_TITLE;

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  SITE_DOMAIN;

// STORAGE: DATABASE
export const HAS_DATABASE =
  (process.env.POSTGRES_URL ?? '').length > 0;
export const POSTGRES_SSL_ENABLED =
  process.env.DISABLE_POSTGRES_SSL === '1' ? false : true;
// STORAGE: VERCEL KV
export const HAS_VERCEL_KV =
  (process.env.KV_URL ?? '').length > 0;

// STORAGE: VERCEL BLOB
export const HAS_VERCEL_BLOB_STORAGE =
  (process.env.BLOB_READ_WRITE_TOKEN ?? '').length > 0;

// STORAGE: Cloudflare R2
// Includes separate check for client-side usage, i.e., url construction
export const HAS_CLOUDFLARE_R2_STORAGE_CLIENT =
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN ?? '').length > 0;
export const HAS_CLOUDFLARE_R2_STORAGE =
  HAS_CLOUDFLARE_R2_STORAGE_CLIENT &&
  (process.env.CLOUDFLARE_R2_ACCESS_KEY ?? '').length > 0 &&
  (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '').length > 0;

// STORAGE: AWS S3
// Includes separate check for client-side usage, i.e., url construction
export const HAS_AWS_S3_STORAGE_CLIENT =
  (process.env.NEXT_PUBLIC_AWS_S3_BUCKET ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_AWS_S3_REGION ?? '').length > 0;
export const HAS_AWS_S3_STORAGE =
  HAS_AWS_S3_STORAGE_CLIENT &&
  (process.env.AWS_S3_ACCESS_KEY ?? '').length > 0 &&
  (process.env.AWS_S3_SECRET_ACCESS_KEY ?? '').length > 0;

export const HAS_MULTIPLE_STORAGE_PROVIDERS = [
  HAS_VERCEL_BLOB_STORAGE,
  HAS_CLOUDFLARE_R2_STORAGE,
  HAS_AWS_S3_STORAGE,
].filter(Boolean).length > 1;

// Storage preference requires client-available keys
// so it can be reached in the browser when uploading
export const CURRENT_STORAGE: StorageType =
  (process.env.NEXT_PUBLIC_STORAGE_PREFERENCE as StorageType | undefined) || (
    HAS_CLOUDFLARE_R2_STORAGE_CLIENT
      ? 'cloudflare-r2'
      : HAS_AWS_S3_STORAGE_CLIENT
        ? 'aws-s3'
        : 'vercel-blob'
  );

// SETTINGS

export const PRO_MODE_ENABLED =
  process.env.NEXT_PUBLIC_PRO_MODE === '1';
export const STATICALLY_OPTIMIZED_PAGES =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PAGES === '1';
export const STATICALLY_OPTIMIZED_OG_IMAGES =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_OG_IMAGES === '1';
export const BLUR_ENABLED =
  process.env.NEXT_PUBLIC_BLUR_DISABLED !== '1';
export const GEO_PRIVACY_ENABLED =
  process.env.NEXT_PUBLIC_GEO_PRIVACY === '1';
export const AI_TEXT_GENERATION_ENABLED =
  Boolean(process.env.OPENAI_SECRET_KEY);
export const AI_TEXT_AUTO_GENERATED_FIELDS = parseAiAutoGeneratedFieldsText(
  process.env.AI_TEXT_AUTO_GENERATED_FIELDS);
export const PRIORITY_ORDER_ENABLED =
  process.env.NEXT_PUBLIC_IGNORE_PRIORITY_ORDER !== '1';
export const PUBLIC_API_ENABLED =
  process.env.NEXT_PUBLIC_PUBLIC_API === '1';
export const SHOW_REPO_LINK =
  process.env.NEXT_PUBLIC_HIDE_REPO_LINK !== '1';
export const SHOW_FILM_SIMULATIONS =
  process.env.NEXT_PUBLIC_HIDE_FILM_SIMULATIONS !== '1';
export const SHOW_EXIF_DATA =
  process.env.NEXT_PUBLIC_HIDE_EXIF_DATA !== '1';
export const GRID_ASPECT_RATIO =
  process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO
    ? parseFloat(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO)
    : 1;
export const OG_TEXT_BOTTOM_ALIGNMENT =
  (process.env.NEXT_PUBLIC_OG_TEXT_ALIGNMENT ?? '').toUpperCase() === 'BOTTOM';
export const ADMIN_DEBUG_TOOLS_ENABLED = process.env.ADMIN_DEBUG_TOOLS === '1';

export const HIGH_DENSITY_GRID = GRID_ASPECT_RATIO <= 1;

export const CONFIG_CHECKLIST_STATUS = {
  hasDatabase: HAS_DATABASE,
  isPostgresSSLEnabled: POSTGRES_SSL_ENABLED,
  hasVercelPostgres: (
    /\/verceldb\?/.test(process.env.POSTGRES_URL ?? '') ||
    /\.vercel-storage\.com\//.test(process.env.POSTGRES_URL ?? '')
  ),
  hasVercelKV: HAS_VERCEL_KV,
  hasVercelBlobStorage: HAS_VERCEL_BLOB_STORAGE,
  hasCloudflareR2Storage: HAS_CLOUDFLARE_R2_STORAGE,
  hasAwsS3Storage: HAS_AWS_S3_STORAGE,
  hasStorageProvider: (
    HAS_VERCEL_BLOB_STORAGE ||
    HAS_CLOUDFLARE_R2_STORAGE ||
    HAS_AWS_S3_STORAGE
  ),
  hasMultipleStorageProviders: HAS_MULTIPLE_STORAGE_PROVIDERS,
  currentStorage: CURRENT_STORAGE,
  hasAuthSecret: (process.env.AUTH_SECRET ?? '').length > 0,
  hasAdminUser: (
    (process.env.ADMIN_EMAIL ?? '').length > 0 &&
    (process.env.ADMIN_PASSWORD ?? '').length > 0
  ),
  hasTitle: (process.env.NEXT_PUBLIC_SITE_TITLE ?? '').length > 0,
  hasDomain: (process.env.NEXT_PUBLIC_SITE_DOMAIN ?? '').length > 0,
  showRepoLink: SHOW_REPO_LINK,
  showFilmSimulations: SHOW_FILM_SIMULATIONS,
  showExifInfo: SHOW_EXIF_DATA,
  isProModeEnabled: PRO_MODE_ENABLED,
  isStaticallyOptimized: (
    STATICALLY_OPTIMIZED_PAGES ||
    STATICALLY_OPTIMIZED_OG_IMAGES
  ),
  arePagesStaticallyOptimized: STATICALLY_OPTIMIZED_PAGES,
  areOGImagesStaticallyOptimized: STATICALLY_OPTIMIZED_OG_IMAGES,
  isBlurEnabled: BLUR_ENABLED,
  isGeoPrivacyEnabled: GEO_PRIVACY_ENABLED,
  isAiTextGenerationEnabled: AI_TEXT_GENERATION_ENABLED,
  aiTextAutoGeneratedFields: process.env.AI_TEXT_AUTO_GENERATED_FIELDS
    ? AI_TEXT_AUTO_GENERATED_FIELDS.length === 0
      ? ['none']
      : AI_TEXT_AUTO_GENERATED_FIELDS
    : ['all'],
  hasAiTextAutoGeneratedFields:
    Boolean(process.env.AI_TEXT_AUTO_GENERATED_FIELDS),
  isPriorityOrderEnabled: PRIORITY_ORDER_ENABLED,
  isPublicApiEnabled: PUBLIC_API_ENABLED,
  isOgTextBottomAligned: OG_TEXT_BOTTOM_ALIGNMENT,
  gridAspectRatio: GRID_ASPECT_RATIO,
  hasGridAspectRatio: Boolean(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO),
};

export type ConfigChecklistStatus = typeof CONFIG_CHECKLIST_STATUS;

export const IS_SITE_READY =
  CONFIG_CHECKLIST_STATUS.hasDatabase &&
  CONFIG_CHECKLIST_STATUS.hasStorageProvider &&
  CONFIG_CHECKLIST_STATUS.hasAuthSecret &&
  CONFIG_CHECKLIST_STATUS.hasAdminUser;
  