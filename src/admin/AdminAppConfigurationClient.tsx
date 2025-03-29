'use client';

import {
  ComponentProps,
  Fragment,
  ReactNode,
} from 'react';
import ChecklistRow from '../components/ChecklistRow';
import {
  BiData,
  BiHide,
  BiLockAlt,
  BiPencil,
} from 'react-icons/bi';
import { HiOutlineCog } from 'react-icons/hi';
import ChecklistGroup from '@/components/ChecklistGroup';
import { ConfigChecklistStatus } from '../app/config';
import StatusIcon from '@/components/StatusIcon';
import { labelForStorage } from '@/platforms/storage';
import { HiSparkles } from 'react-icons/hi';
import { testConnectionsAction } from '@/admin/actions';
import ErrorNote from '@/components/ErrorNote';
import { RiSpeedMiniLine } from 'react-icons/ri';
import SecretGenerator from '../app/SecretGenerator';
import { PiPaintBrushHousehold } from 'react-icons/pi';
import { IoMdGrid } from 'react-icons/io';
import { CgDebug } from 'react-icons/cg';
import EnvVar from '@/components/EnvVar';
import AdminLink from './AdminLink';
import ScoreCardContainer from '@/components/ScoreCardContainer';
import { capitalize, deparameterize } from '@/utility/string';
import { DEFAULT_CATEGORY_KEYS, getHiddenCategories } from '@/category';

export default function AdminAppConfigurationClient({
  // Storage
  hasDatabase,
  isPostgresSslEnabled,
  hasVercelPostgres,
  hasRedisStorage,
  hasStorageProvider,
  hasVercelBlobStorage,
  hasCloudflareR2Storage,
  hasAwsS3Storage,
  hasMultipleStorageProviders,
  currentStorage,
  // Auth
  hasAuthSecret,
  hasAdminUser,
  // Content
  hasDomain,
  hasNavTitle,
  hasNavCaption,
  isMetaTitleConfigured,
  isMetaDescriptionConfigured,
  hasPageAbout,
  // AI
  isAiTextGenerationEnabled,
  aiTextAutoGeneratedFields,
  hasAiTextAutoGeneratedFields,
  // Performance
  isStaticallyOptimized,
  arePhotosStaticallyOptimized,
  arePhotoOGImagesStaticallyOptimized,
  arePhotoCategoriesStaticallyOptimized,
  arePhotoCategoryOgImagesStaticallyOptimized,
  areOriginalUploadsPreserved,
  hasImageQuality,
  imageQuality,
  isBlurEnabled,
  // Visual
  hasDefaultTheme,
  defaultTheme,
  arePhotosMatted,
  matteColor,
  matteColorDark,
  // Display
  categoryVisibility,
  hasCategoryVisibility,
  collapseSidebarCategories,
  showExifInfo,
  showZoomControls,
  showTakenAtTimeHidden,
  showSocial,
  showRepoLink,
  // Grid
  isGridHomepageEnabled,
  gridAspectRatio,
  hasGridAspectRatio,
  hasHighGridDensity,
  hasGridDensityPreference,
  // Settings
  isGeoPrivacyEnabled,
  arePublicDownloadsEnabled,
  isPublicApiEnabled,
  isPriorityOrderEnabled,
  isOgTextBottomAligned,
  // Internal
  areInternalToolsEnabled,
  areAdminDebugToolsEnabled,
  isAdminDbOptimizeEnabled,
  isAdminSqlDebugEnabled,
  // Misc
  baseUrl,
  // Connection status
  databaseError,
  storageError,
  redisError,
  aiError,
  // Component props
  simplifiedView,
  isAnalyzingConfiguration,
}: ConfigChecklistStatus &
  Partial<Awaited<ReturnType<typeof testConnectionsAction>>> & {
  simplifiedView?: boolean
  isAnalyzingConfiguration?: boolean
}) {
  const renderEnvVars = (variables: string[]) =>
    <div className="pt-1 flex flex-col gap-1">
      {variables.map(variable =>
        <EnvVar key={variable} variable={variable} />)}
    </div>;

  const renderSubStatus = (
    type: ComponentProps<typeof StatusIcon>['type'],
    label: ReactNode,
    iconClassName = 'translate-y-[3.5px]',
  ) =>
    <div className="flex gap-2 translate-x-[-2.5px]">
      <StatusIcon {...{ type, className: iconClassName }} />
      <span className="min-w-0">
        {label}
      </span>
    </div>;
    
  const renderSubStatusWithEnvVar = (
    type: ComponentProps<typeof StatusIcon>['type'],
    variable: string,
  ) =>
    renderSubStatus(
      type,
      renderEnvVars([variable]),
      'translate-y-[7px]',
    );

  const renderError = ({
    connection,
    message,
  }: {
    connection?: { provider: string, error: string }
    message?: string
  }) =>
    <ErrorNote className="mt-2 mb-3">
      {connection && <>
        {connection.provider} connection error: {`"${connection.error}"`}
      </>}
      {message}
    </ErrorNote>;

  return (
    <ScoreCardContainer>
      <ChecklistGroup
        title="Storage"
        icon={<BiData size={16} />}
      >
        <ChecklistRow
          title={hasDatabase && isAnalyzingConfiguration
            ? 'Testing database connection'
            : 'Setup database'}
          status={hasDatabase}
          isPending={hasDatabase && isAnalyzingConfiguration}
        >
          {databaseError && renderError({
            connection: { provider: 'Database', error: databaseError},
          })}
          {hasVercelPostgres
            ? renderSubStatus('checked', 'Vercel Postgres: connected')
            : renderSubStatus('optional', <>
              Vercel Postgres:
              {' '}
              <AdminLink
                // eslint-disable-next-line max-len
                href="https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database"
                externalIcon
              >
                create store
              </AdminLink>
              {' '}
              and connect to project
            </>)}
          {hasDatabase && !hasVercelPostgres &&
            renderSubStatus('checked', <>
              Postgres-compatible: connected
              {' '}
              (SSL {isPostgresSslEnabled ? 'enabled' : 'disabled'})
            </>)}
        </ChecklistRow>
        <ChecklistRow
          title={
            hasStorageProvider && isAnalyzingConfiguration
              ? 'Testing storage connection'
              : !hasStorageProvider
                ? 'Setup storage (one of the following)'
                : hasMultipleStorageProviders
                  // eslint-disable-next-line max-len
                  ? `Setup storage (new uploads go to: ${labelForStorage(currentStorage)})`
                  : 'Setup storage'}
          status={hasStorageProvider}
          isPending={hasStorageProvider && isAnalyzingConfiguration}
        >
          {storageError && renderError({
            connection: { provider: 'Storage', error: storageError},
          })}
          {hasVercelBlobStorage
            ? renderSubStatus('checked', 'Vercel Blob: connected')
            : renderSubStatus('optional', <>
              {labelForStorage('vercel-blob')}:
              {' '}
              <AdminLink
                // eslint-disable-next-line max-len
                href="https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-blob-store"
                externalIcon
              >
                create store
              </AdminLink>
              {' '} 
              and connect to project
            </>,
            )}
          {hasCloudflareR2Storage
            ? renderSubStatus('checked', 'Cloudflare R2: connected')
            : renderSubStatus('optional', <>
              {labelForStorage('cloudflare-r2')}:
              {' '}
              <AdminLink
                // eslint-disable-next-line max-len
                href="https://github.com/sambecker/exif-photo-blog#cloudflare-r2"
                externalIcon
              >
                create/configure bucket
              </AdminLink>
            </>)}
          {hasAwsS3Storage
            ? renderSubStatus('checked', 'AWS S3: connected')
            : renderSubStatus('optional', <>
              {labelForStorage('aws-s3')}:
              {' '}
              <AdminLink
                href="https://github.com/sambecker/exif-photo-blog#aws-s3"
                externalIcon
              >
                create/configure bucket
              </AdminLink>
            </>)}
        </ChecklistRow>
      </ChecklistGroup>
      <ChecklistGroup
        title="Authentication"
        icon={<BiLockAlt size={16} />}
      >
        <ChecklistRow
          title={!hasAuthSecret && isAnalyzingConfiguration
            ? 'Generating secret'
            : 'Setup auth'}
          status={hasAuthSecret}
          isPending={!hasAuthSecret && isAnalyzingConfiguration}
        >
          Store auth secret in environment variable:
          {!hasAuthSecret &&
            <div className="overflow-x-auto">
              <SecretGenerator />
            </div>}
          {renderEnvVars(['AUTH_SECRET'])}
        </ChecklistRow>
        <ChecklistRow
          title="Setup admin user"
          status={hasAdminUser}
        >
          Store admin email/password
          {' '}
          in environment variables:
          {renderEnvVars([
            'ADMIN_EMAIL',
            'ADMIN_PASSWORD',
          ])}
        </ChecklistRow>
      </ChecklistGroup>
      <ChecklistGroup
        title="Content"
        icon={<BiPencil size={16} />}
      >
        <ChecklistRow
          title="Configure domain"
          status={hasDomain}
        >
          Store in environment variable
          (used in explicit share urls, seen in nav if no title is defined):
          {renderEnvVars(['NEXT_PUBLIC_SITE_DOMAIN'])}
        </ChecklistRow>
        <ChecklistRow
          title="Meta title"
          status={isMetaTitleConfigured}
          showWarning
        >
          Store in environment variable
          (seen in search results and browser tab):
          {renderEnvVars(['NEXT_PUBLIC_META_TITLE'])}
        </ChecklistRow>
        {!simplifiedView && <>
          <ChecklistRow
            title="Meta description"
            status={isMetaDescriptionConfigured}
            optional
          >
            Store in environment variable
            (seen in search results):
            {renderEnvVars(['NEXT_PUBLIC_META_DESCRIPTION'])}
          </ChecklistRow>
          <ChecklistRow
            title="Nav title"
            status={hasNavTitle}
            optional
          >
            Store in environment variable (replaces domain in nav):
            {renderEnvVars(['NEXT_PUBLIC_NAV_TITLE'])}
          </ChecklistRow>
          <ChecklistRow
            title="Nav caption"
            status={hasNavCaption}
            optional
          >
            Store in environment variable (seen in nav, under title):
            {renderEnvVars(['NEXT_PUBLIC_NAV_CAPTION'])}
          </ChecklistRow>
          <ChecklistRow
            title="Page about"
            status={hasPageAbout}
            optional
          >
            Store in environment variable (seen in sidebar):
            {renderEnvVars(['NEXT_PUBLIC_PAGE_ABOUT'])}
          </ChecklistRow>
        </>}
      </ChecklistGroup>
      {!simplifiedView && <>
        <ChecklistGroup
          title="AI text generation"
          titleShort="AI"
          icon={<HiSparkles />}
          optional
        >
          <ChecklistRow
            title={isAiTextGenerationEnabled && isAnalyzingConfiguration
              ? 'Testing OpenAI connection'
              : 'Add OpenAI secret key'}
            status={isAiTextGenerationEnabled}
            isPending={isAiTextGenerationEnabled && isAnalyzingConfiguration}
            optional
          >
            {aiError && renderError({
              connection: { provider: 'OpenAI', error: aiError},
            })}
            Store your OpenAI secret key in order to enable AI-generated
            text descriptions and optionally leverage an invisible field
            called {'"Semantic Description"'} used to support CMD-K search
            and improve accessibility:
            {renderEnvVars(['OPENAI_SECRET_KEY'])}
          </ChecklistRow>
          <ChecklistRow
            title={hasRedisStorage && isAnalyzingConfiguration
              ? 'Testing Redis connection'
              : 'Enable rate limiting'}
            status={hasRedisStorage}
            isPending={hasRedisStorage && isAnalyzingConfiguration}
            optional
          >
            {redisError && renderError({
              connection: { provider: 'Redis', error: redisError},
            })}
            Create Upstash Redis store from storage tab
            on Vercel dashboard and connect to this project
            to enable rate limiting
          </ChecklistRow>
          <ChecklistRow
            // eslint-disable-next-line max-len
            title={`Auto-generated fields: ${aiTextAutoGeneratedFields.join(',')}`}
            status={hasAiTextAutoGeneratedFields}
            optional
          >
            Comma-separated fields to auto-generate when
            uploading photos. Accepted values: title, caption,
            tags, description, all, or none
            {' '}
            (default: {'"title,tags,semantic"'}):
            {renderEnvVars(['AI_TEXT_AUTO_GENERATED_FIELDS'])}
          </ChecklistRow>
        </ChecklistGroup>
        <ChecklistGroup
          title="Performance"
          icon={<RiSpeedMiniLine size={18} />}
          optional
        >
          <ChecklistRow
            title="Static optimization"
            status={isStaticallyOptimized}
            optional
          >
            Set environment variable to {'"1"'} to make site more responsive
            by enabling static optimization
            (i.e., rendering pages and images at build time):
            {renderSubStatusWithEnvVar(
              arePhotosStaticallyOptimized ? 'checked' : 'optional',
              'NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTOS',
            )}
            {renderSubStatusWithEnvVar(
              arePhotoOGImagesStaticallyOptimized ? 'checked' : 'optional',
              'NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_OG_IMAGES',
            )}
            {renderSubStatusWithEnvVar(
              arePhotoCategoriesStaticallyOptimized ? 'checked' : 'optional',
              'NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_CATEGORIES',
            )}
            {renderSubStatusWithEnvVar(
              // eslint-disable-next-line max-len
              arePhotoCategoryOgImagesStaticallyOptimized ? 'checked' : 'optional',
              'NEXT_PUBLIC_STATICALLY_OPTIMIZE_PHOTO_CATEGORY_OG_IMAGES',
            )}
          </ChecklistRow>
          <ChecklistRow
            title="Preserve original uploads"
            status={areOriginalUploadsPreserved}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            image uploads being compressed before storing:
            {renderEnvVars(['NEXT_PUBLIC_PRESERVE_ORIGINAL_UPLOADS'])}
          </ChecklistRow>
          <ChecklistRow
            title={`Image quality: ${imageQuality}`}
            status={hasImageQuality}
            optional
          >
            Set environment variable from {'"1-100"'}
            {' '}
            to control the quality of large photos
            ({'"100"'} represents highest quality/largest size):
            {renderEnvVars(['NEXT_PUBLIC_IMAGE_QUALITY'])}
          </ChecklistRow>
          <ChecklistRow
            title="Image blur"
            status={isBlurEnabled}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            image blur data being stored and displayed:
            {renderEnvVars(['NEXT_PUBLIC_BLUR_DISABLED'])}
          </ChecklistRow>
        </ChecklistGroup>
        <ChecklistGroup
          title="Visual"
          icon={<PiPaintBrushHousehold size={19} />}
          optional
        >
          <ChecklistRow
            title={`Default theme: ${defaultTheme}`}
            status={hasDefaultTheme}
            optional
          >
            {'Set environment variable to \'light\' or \'dark\''}
            {' '}
            to configure initial theme
            {' '}
            (defaults to {'\'system\''}):
            {renderEnvVars(['NEXT_PUBLIC_DEFAULT_THEME'])}
          </ChecklistRow>
          <ChecklistRow
            title="Photo matting"
            status={arePhotosMatted}
            optional
          >
            Set environment variable to {'"1"'} to constrain the size
            {' '}
            of each photo, and display a surrounding border:
            <div className="pt-1 flex flex-col gap-1">
              <EnvVar variable="NEXT_PUBLIC_MATTE_PHOTOS" />
              <EnvVar
                variable="NEXT_PUBLIC_MATTE_COLOR"
                accessory={matteColor && <span
                  className="size-4 border-medium rounded-sm ml-1"
                  style={{ backgroundColor: matteColor }}
                />}
              />
              <EnvVar
                variable="NEXT_PUBLIC_MATTE_COLOR_DARK"
                accessory={matteColorDark && <span
                  className="size-4 border-medium rounded-sm ml-1"
                  style={{ backgroundColor: matteColorDark }}
                />}
              />
            </div>
          </ChecklistRow>
        </ChecklistGroup>
        <ChecklistGroup
          title="Display"
          icon={<BiHide size={18} />}
          optional
        >
          <ChecklistRow
            title={hasCategoryVisibility
              ? `Category visibility: ${categoryVisibility.join(',')}`
              : 'Category visibility'}
            status={hasCategoryVisibility}
            optional
          >
            <div className="my-1">
              {categoryVisibility.map((category, index) =>
                <Fragment key={category}>
                  {renderSubStatus(
                    'checked',
                    <>
                      {index + 1}
                      {'.'}
                      {capitalize(category)}
                    </>,
                  )}
                </Fragment>)}
              {getHiddenCategories(categoryVisibility)
                .map(category =>
                  <Fragment key={category}>
                    {renderSubStatus(
                      'optional',
                      <span className="text-dim">
                        {'* '}
                        {deparameterize(category)}
                      </span>,
                    )}
                  </Fragment>)}
            </div>
            Configure order and visibility of categories
            (seen in grid sidebar and CMD-K results)
            by storing comma-separated values
            (default: {`"${DEFAULT_CATEGORY_KEYS.join(',')}"`}):
            {renderEnvVars(['NEXT_PUBLIC_CATEGORY_VISIBILITY'])}
          </ChecklistRow>
          <ChecklistRow
            title="Collapse sidebar categories"
            status={collapseSidebarCategories}
            optional
          >
            Set environment variable to {'"1"'} to always show
            expanded category content
            {renderEnvVars(['NEXT_PUBLIC_EXHAUSTIVE_SIDEBAR_CATEGORIES'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show EXIF data"
            status={showExifInfo}
            optional
          >
            Set environment variable to {'"1"'} to hide EXIF data:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_EXIF_DATA'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show zoom controls"
            status={showZoomControls}
            optional
          >
            Set environment variable to {'"1"'} to hide
            fullscreen photo zoom controls:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_ZOOM_CONTROLS'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show taken at time"
            status={showTakenAtTimeHidden}
            optional
          >
            Set environment variable to {'"1"'} to hide
            taken at time from photo meta:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_TAKEN_AT_TIME'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show social"
            status={showSocial}
            optional
          >
            Set environment variable to {'"1"'} to hide
            {' '}
            X (formerly Twitter) button from share modal:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_SOCIAL'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show repo link"
            status={showRepoLink}
            optional
          >
            Set environment variable to {'"1"'} to hide footer link:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_REPO_LINK'])}
          </ChecklistRow>
        </ChecklistGroup>
        <ChecklistGroup
          title="Grid"
          icon={<IoMdGrid size={17} />}
          optional
        >
          <ChecklistRow
            title="Grid homepage"
            status={isGridHomepageEnabled}
            optional
          >
            Set environment variable to {'"1"'} to show grid layout
            on homepage:
            {renderEnvVars(['NEXT_PUBLIC_GRID_HOMEPAGE'])}
          </ChecklistRow>
          <ChecklistRow
            title={`Grid aspect ratio: ${gridAspectRatio}`}
            status={hasGridAspectRatio}
            optional
          >
            Set environment variable to any number to enforce aspect ratio
            {' '}
            (default is {'"1"'}, i.e., square)—set to {'"0"'} to disable:
            {renderEnvVars(['NEXT_PUBLIC_GRID_ASPECT_RATIO'])}
          </ChecklistRow>
          <ChecklistRow
            title={`Grid density: ${hasHighGridDensity ? 'high' : 'low'}`}
            status={hasGridDensityPreference}
            optional
          >
            Set environment variable to {'"1"'} to ensure large thumbnails
            on photo grid views (if not configured, density is based on
            aspect ratio):
            {renderEnvVars(['NEXT_PUBLIC_SHOW_LARGE_THUMBNAILS'])}
          </ChecklistRow>
        </ChecklistGroup>
        <ChecklistGroup
          title="Settings"
          icon={<HiOutlineCog size={17} className="translate-y-[0.5px]" />}
          optional
        >
          <ChecklistRow
            title="Geo privacy"
            status={isGeoPrivacyEnabled}
            optional
          >
            Set environment variable to {'"1"'} to disable
            collection/display of location-based data:
            {renderEnvVars(['NEXT_PUBLIC_GEO_PRIVACY'])}
          </ChecklistRow>
          <ChecklistRow
            title="Public downloads"
            status={arePublicDownloadsEnabled}
            optional
          >
            Set environment variable to {'"1"'} to enable
            public photo downloads for all visitors:
            {renderEnvVars(['NEXT_PUBLIC_ALLOW_PUBLIC_DOWNLOADS'])}
          </ChecklistRow>
          <ChecklistRow
            title="Public API"
            status={isPublicApiEnabled}
            optional
          >
            Set environment variable to {'"1"'} to enable
            a public API available at <code>/api</code>:
            {renderEnvVars(['NEXT_PUBLIC_PUBLIC_API'])}
          </ChecklistRow>
          <ChecklistRow
            title="Priority order"
            status={isPriorityOrderEnabled}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            priority order photo field affecting photo order:
            {renderEnvVars(['NEXT_PUBLIC_IGNORE_PRIORITY_ORDER'])}
          </ChecklistRow>
          <ChecklistRow
            title="Legacy OG text alignment"
            status={isOgTextBottomAligned}
            optional
          >
            Set environment variable to {'"BOTTOM"'} to
            keep OG image text bottom aligned (default is {'"top"'}):
            {renderEnvVars(['NEXT_PUBLIC_OG_TEXT_ALIGNMENT'])}
          </ChecklistRow>
        </ChecklistGroup>
        {areInternalToolsEnabled &&
          <ChecklistGroup
            title="Internal"
            icon={<CgDebug size={16} />}
            optional
          >
            <ChecklistRow
              title="Debug tools"
              status={areAdminDebugToolsEnabled}
              optional
            >
              Set environment variable to {'"1"'} to temporarily enable
              features like photo matting, baseline grid, etc.:
              {renderEnvVars(['ADMIN_DEBUG_TOOLS'])}
            </ChecklistRow>
            <ChecklistRow
              title="DB optimize"
              status={isAdminDbOptimizeEnabled}
              optional
            >
              Set environment variable to {'"1"'} to prevent
              homepages from seeding infinite scroll on load:
              {renderEnvVars(['ADMIN_DB_OPTIMIZE'])}
            </ChecklistRow>
            <ChecklistRow
              title="SQL debugging"
              status={isAdminSqlDebugEnabled}
              optional
            >
              Set environment variable to {'"1"'} to enable
              console output for all sql queries:
              {renderEnvVars(['ADMIN_SQL_DEBUG'])}
            </ChecklistRow>
          </ChecklistGroup>}
      </>}
      <div className="pl-11 pr-2 sm:pr-11 mt-4 md:mt-7">
        <div>
          Changes to environment variables require a redeploy
          or reboot of local dev server
        </div>
        {!simplifiedView &&
          <div className="text-dim before:content-['—']">
            <div className="flex whitespace-nowrap">
              <span className="font-bold">Domain</span>
              &nbsp;&nbsp;
              <span className="w-full flex overflow-x-auto">
                {baseUrl || 'Not Defined'}
              </span>
            </div>
          </div>}
      </div>
    </ScoreCardContainer>
  );
}
