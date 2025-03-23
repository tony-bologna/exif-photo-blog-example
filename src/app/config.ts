import { 
  AI_AUTO_GENERATED_FIELDS_DEFAULT,
  parseAiAutoGeneratedFieldsString,
} from '@/photo/ai';
import { getOrderedCategoriesFromString } from '@/category';
import type { StorageType } from '@/platforms/storage';
import { makeUrlAbsolute, shortenUrl } from '@/utility/url';

// HARD-CODED GLOBAL CONFIGURATION

export const SHOULD_PREFETCH_ALL_LINKS: boolean | undefined = undefined;

// TEMPLATE META

export const TEMPLATE_TITLE = 'Photo Blog';
export const TEMPLATE_DESCRIPTION = 'Store photos with original camera data';

// SOURCE CODE

export const TEMPLATE_REPO_OWNER  = 'sambecker';
export const TEMPLATE_REPO_NAME   = 'exif-photo-blog';
export const TEMPLATE_REPO_BRANCH = 'main';
// eslint-disable-next-line max-len
export const TEMPLATE_REPO_URL = `https://github.com/${TEMPLATE_REPO_OWNER}/${TEMPLATE_REPO_NAME}`;
export const TEMPLATE_REPO_URL_FORK = `${TEMPLATE_REPO_URL}/fork`;
// eslint-disable-next-line max-len
export const TEMPLATE_REPO_URL_README = `${TEMPLATE_REPO_URL}?tab=readme-ov-file`;

export const VERCEL_GIT_PROVIDER =
  process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER;
export const VERCEL_GIT_REPO_OWNER =
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER;
export const VERCEL_GIT_REPO_SLUG =
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG;
export const VERCEL_GIT_BRANCH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
export const VERCEL_GIT_COMMIT_MESSAGE =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE;
export const VERCEL_GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
export const VERCEL_GIT_COMMIT_SHA_SHORT = VERCEL_GIT_COMMIT_SHA
  ? VERCEL_GIT_COMMIT_SHA.slice(0, 7)
  : undefined;
export const IS_VERCEL_GIT_PROVIDER_GITHUB = VERCEL_GIT_PROVIDER === 'github';
export const VERCEL_GIT_COMMIT_URL = IS_VERCEL_GIT_PROVIDER_GITHUB
  // eslint-disable-next-line max-len
  ? `https://github.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}/commit/${VERCEL_GIT_COMMIT_SHA}`
  : undefined;

export const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
export const VERCEL_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const VERCEL_DEPLOYMENT_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
export const VERCEL_BRANCH_URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
// Last resort: cannot be used reliably
export const VERCEL_PROJECT_URL = VERCEL_BRANCH_URL && VERCEL_GIT_BRANCH
  ? `${VERCEL_BRANCH_URL.split(`-git-${VERCEL_GIT_BRANCH}-`)[0]}.vercel.app`
  : undefined;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production' && (
  // Make environment checks resilient to non-Vercel deployments
  VERCEL_ENV === 'production' ||
  !VERCEL_ENV
);
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PREVIEW = VERCEL_ENV === 'preview';
export const IS_BUILDING = process.env.NEXT_PHASE === 'phase-production-build';

export const VERCEL_BYPASS_KEY = 'x-vercel-protection-bypass';
export const VERCEL_BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

// SITE META

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  TEMPLATE_TITLE;

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

export const SITE_ABOUT = process.env.NEXT_PUBLIC_SITE_ABOUT;

export const HAS_DEFINED_SITE_DESCRIPTION =
  Boolean(process.env.NEXT_PUBLIC_SITE_DESCRIPTION);

// STORAGE

// STORAGE: DATABASE
export const HAS_DATABASE =
  Boolean(process.env.POSTGRES_URL);
export const POSTGRES_SSL_ENABLED =
  process.env.DISABLE_POSTGRES_SSL === '1' ? false : true;

// STORAGE: REDIS
export const HAS_REDIS_STORAGE =
  Boolean(process.env.KV_URL);

// STORAGE: VERCEL BLOB
export const HAS_VERCEL_BLOB_STORAGE =
  Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// STORAGE: Cloudflare R2
// Includes separate check for client-side usage, i.e., url construction
export const HAS_CLOUDFLARE_R2_STORAGE_CLIENT =
  Boolean(process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET) &&
  Boolean(process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN);
export const HAS_CLOUDFLARE_R2_STORAGE =
  HAS_CLOUDFLARE_R2_STORAGE_CLIENT &&
  Boolean(process.env.CLOUDFLARE_R2_ACCESS_KEY) &&
  Boolean(process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY);

// STORAGE: AWS S3
// Includes separate check for client-side usage, i.e., url construction
export const HAS_AWS_S3_STORAGE_CLIENT =
  Boolean(process.env.NEXT_PUBLIC_AWS_S3_BUCKET) &&
  Boolean(process.env.NEXT_PUBLIC_AWS_S3_REGION);
export const HAS_AWS_S3_STORAGE =
  HAS_AWS_S3_STORAGE_CLIENT &&
  Boolean(process.env.AWS_S3_ACCESS_KEY) &&
  Boolean(process.env.AWS_S3_SECRET_ACCESS_KEY);

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

// AI

export const AI_TEXT_GENERATION_ENABLED =
  Boolean(process.env.OPENAI_SECRET_KEY);
export const AI_TEXT_AUTO_GENERATED_FIELDS = parseAiAutoGeneratedFieldsString(
  process.env.AI_TEXT_AUTO_GENERATED_FIELDS);

// PERFORMANCE

export const STATICALLY_OPTIMIZED_PHOTOS =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTOS === '1' ||
  // Legacy environment variable name
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PAGES === '1';
export const STATICALLY_OPTIMIZED_PHOTO_OG_IMAGES =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_OG_IMAGES === '1' ||
  // Legacy environment variable name
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_OG_IMAGES === '1';
export const STATICALLY_OPTIMIZED_PHOTO_CATEGORIES =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_CATEGORIES === '1';
export const STATICALLY_OPTIMIZED_PHOTO_CATEGORY_OG_IMAGES =
  process.env.NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_CATEGORY_OG_IMAGES === '1';
export const HAS_STATIC_OPTIMIZATION =
  STATICALLY_OPTIMIZED_PHOTOS ||
  STATICALLY_OPTIMIZED_PHOTO_OG_IMAGES ||
  STATICALLY_OPTIMIZED_PHOTO_CATEGORIES ||
  STATICALLY_OPTIMIZED_PHOTO_CATEGORY_OG_IMAGES;

export const PRESERVE_ORIGINAL_UPLOADS =
  process.env.NEXT_PUBLIC_PRESERVE_ORIGINAL_UPLOADS === '1' ||
  // Legacy environment variable name
  process.env.NEXT_PUBLIC_PRO_MODE === '1';
export const IMAGE_QUALITY =
  process.env.NEXT_PUBLIC_IMAGE_QUALITY
    ? parseInt(process.env.NEXT_PUBLIC_IMAGE_QUALITY)
    : 75;
export const BLUR_ENABLED =
  process.env.NEXT_PUBLIC_BLUR_DISABLED !== '1';


// VISUAL

export const DEFAULT_THEME =
  process.env.NEXT_PUBLIC_DEFAULT_THEME === 'dark'
    ? 'dark'
    : process.env.NEXT_PUBLIC_DEFAULT_THEME === 'light'
      ? 'light'
      : 'system';
export const MATTE_PHOTOS =
  process.env.NEXT_PUBLIC_MATTE_PHOTOS === '1';

// DISPLAY

export const CATEGORY_VISIBILITY = getOrderedCategoriesFromString(
  process.env.NEXT_PUBLIC_CATEGORY_VISIBILITY);
export const SHOW_LENSES =
  CATEGORY_VISIBILITY.includes('lenses');
export const SHOW_RECIPES =
  CATEGORY_VISIBILITY.includes('recipes');
export const SHOW_FILM_SIMULATIONS =
  CATEGORY_VISIBILITY.includes('films');
export const SHOW_FOCAL_LENGTHS =
  CATEGORY_VISIBILITY.includes('focal-lengths');
export const COLLAPSE_SIDEBAR_CATEGORIES =
  process.env.NEXT_PUBLIC_EXPAND_SIDEBAR_CATEGORIES !== '1';
export const SHOW_EXIF_DATA =
  process.env.NEXT_PUBLIC_HIDE_EXIF_DATA !== '1';
export const SHOW_ZOOM_CONTROLS =
  process.env.NEXT_PUBLIC_HIDE_ZOOM_CONTROLS !== '1';
export const SHOW_TAKEN_AT_TIME =
  process.env.NEXT_PUBLIC_HIDE_TAKEN_AT_TIME !== '1';
export const SHOW_SOCIAL =
  process.env.NEXT_PUBLIC_HIDE_SOCIAL !== '1';
export const SHOW_REPO_LINK =
  process.env.NEXT_PUBLIC_HIDE_REPO_LINK !== '1';

// GRID

export const GRID_HOMEPAGE_ENABLED =
  process.env.NEXT_PUBLIC_GRID_HOMEPAGE === '1';
export const GRID_ASPECT_RATIO =
  process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO
    ? parseFloat(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO)
    : 1;
export const PREFERS_LOW_DENSITY_GRID =
  process.env.NEXT_PUBLIC_SHOW_LARGE_THUMBNAILS === '1';
export const HIGH_DENSITY_GRID =
  GRID_ASPECT_RATIO <= 1 &&
  !PREFERS_LOW_DENSITY_GRID;

// SETTINGS

export const GEO_PRIVACY_ENABLED =
  process.env.NEXT_PUBLIC_GEO_PRIVACY === '1';
export const ALLOW_PUBLIC_DOWNLOADS = 
  process.env.NEXT_PUBLIC_ALLOW_PUBLIC_DOWNLOADS === '1';
export const PUBLIC_API_ENABLED =
  process.env.NEXT_PUBLIC_PUBLIC_API === '1';
export const PRIORITY_ORDER_ENABLED =
  process.env.NEXT_PUBLIC_IGNORE_PRIORITY_ORDER !== '1';
export const OG_TEXT_BOTTOM_ALIGNMENT =
  (process.env.NEXT_PUBLIC_OG_TEXT_ALIGNMENT ?? '').toUpperCase() === 'BOTTOM';

// INTERNAL

export const ADMIN_DEBUG_TOOLS_ENABLED = process.env.ADMIN_DEBUG_TOOLS === '1';
export const ADMIN_DB_OPTIMIZE_ENABLED = process.env.ADMIN_DB_OPTIMIZE === '1';
export const ADMIN_SQL_DEBUG_ENABLED =
  process.env.ADMIN_SQL_DEBUG === '1' &&
  !IS_BUILDING;

export const APP_CONFIGURATION = {
  // Storage
  hasDatabase: HAS_DATABASE,
  isPostgresSslEnabled: POSTGRES_SSL_ENABLED,
  hasVercelPostgres: (
    /\/verceldb\?/.test(process.env.POSTGRES_URL ?? '') ||
    /\.vercel-storage\.com\//.test(process.env.POSTGRES_URL ?? '')
  ),
  hasRedisStorage: HAS_REDIS_STORAGE,
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
  // Auth
  hasAuthSecret: Boolean(process.env.AUTH_SECRET),
  hasAdminUser: (
    Boolean(process.env.ADMIN_EMAIL) &&
    Boolean(process.env.ADMIN_PASSWORD)
  ),
  // Content
  hasDomain: Boolean(process.env.NEXT_PUBLIC_SITE_DOMAIN),
  hasTitle: Boolean(process.env.NEXT_PUBLIC_SITE_TITLE),
  hasDescription: HAS_DEFINED_SITE_DESCRIPTION,
  hasAbout: Boolean(process.env.NEXT_PUBLIC_SITE_ABOUT),
  // AI
  isAiTextGenerationEnabled: AI_TEXT_GENERATION_ENABLED,
  aiTextAutoGeneratedFields: process.env.AI_TEXT_AUTO_GENERATED_FIELDS
    ? AI_TEXT_AUTO_GENERATED_FIELDS.length === 0
      ? ['none']
      : AI_TEXT_AUTO_GENERATED_FIELDS
    : AI_AUTO_GENERATED_FIELDS_DEFAULT,
  hasAiTextAutoGeneratedFields:
    Boolean(process.env.AI_TEXT_AUTO_GENERATED_FIELDS),
  // Performance
  isStaticallyOptimized: HAS_STATIC_OPTIMIZATION,
  arePhotosStaticallyOptimized: STATICALLY_OPTIMIZED_PHOTOS,
  arePhotoOGImagesStaticallyOptimized: STATICALLY_OPTIMIZED_PHOTO_OG_IMAGES,
  arePhotoCategoriesStaticallyOptimized: STATICALLY_OPTIMIZED_PHOTO_CATEGORIES,
  // eslint-disable-next-line max-len
  arePhotoCategoryOgImagesStaticallyOptimized: STATICALLY_OPTIMIZED_PHOTO_CATEGORY_OG_IMAGES,
  areOriginalUploadsPreserved: PRESERVE_ORIGINAL_UPLOADS,
  hasImageQuality: Boolean(process.env.NEXT_PUBLIC_IMAGE_QUALITY),
  imageQuality: IMAGE_QUALITY,
  isBlurEnabled: BLUR_ENABLED,
  // Visual
  hasDefaultTheme: Boolean(process.env.NEXT_PUBLIC_DEFAULT_THEME),
  defaultTheme: DEFAULT_THEME,
  arePhotosMatted: MATTE_PHOTOS,
  // Display
  hasCategoryVisibility:
    Boolean(process.env.NEXT_PUBLIC_CATEGORY_VISIBILITY),
  categoryVisibility: CATEGORY_VISIBILITY,
  showExifInfo: SHOW_EXIF_DATA,
  showZoomControls: SHOW_ZOOM_CONTROLS,
  showTakenAtTimeHidden: SHOW_TAKEN_AT_TIME,
  showSocial: SHOW_SOCIAL,
  showRepoLink: SHOW_REPO_LINK,
  // Grid
  isGridHomepageEnabled: GRID_HOMEPAGE_ENABLED,
  gridAspectRatio: GRID_ASPECT_RATIO,
  hasGridAspectRatio: Boolean(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO),
  hasHighGridDensity: HIGH_DENSITY_GRID,
  hasGridDensityPreference:
    Boolean(process.env.NEXT_PUBLIC_SHOW_LARGE_THUMBNAILS),
  // Settings
  isGeoPrivacyEnabled: GEO_PRIVACY_ENABLED,
  arePublicDownloadsEnabled: ALLOW_PUBLIC_DOWNLOADS,
  isPublicApiEnabled: PUBLIC_API_ENABLED,
  isPriorityOrderEnabled: PRIORITY_ORDER_ENABLED,
  isOgTextBottomAligned: OG_TEXT_BOTTOM_ALIGNMENT,
  // Internal
  areInternalToolsEnabled: (
    ADMIN_DEBUG_TOOLS_ENABLED ||
    ADMIN_DB_OPTIMIZE_ENABLED ||
    ADMIN_SQL_DEBUG_ENABLED
  ),
  areAdminDebugToolsEnabled: ADMIN_DEBUG_TOOLS_ENABLED,
  isAdminDbOptimizeEnabled: ADMIN_DB_OPTIMIZE_ENABLED,
  isAdminSqlDebugEnabled: ADMIN_SQL_DEBUG_ENABLED,
  // Misc
  baseUrl: BASE_URL,
  commitSha: VERCEL_GIT_COMMIT_SHA_SHORT,
  commitMessage: VERCEL_GIT_COMMIT_MESSAGE,
  commitUrl: VERCEL_GIT_COMMIT_URL,
};

export type ConfigChecklistStatus = typeof APP_CONFIGURATION;

export const IS_SITE_READY =
  APP_CONFIGURATION.hasDatabase &&
  APP_CONFIGURATION.hasStorageProvider &&
  APP_CONFIGURATION.hasAuthSecret &&
  APP_CONFIGURATION.hasAdminUser;
  