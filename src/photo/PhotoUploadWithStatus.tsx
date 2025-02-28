'use client';

import { uploadPhotoFromClient } from '@/platforms/storage';
import { useRouter } from 'next/navigation';
import { PATH_ADMIN_UPLOADS, pathForAdminUploadUrl } from '@/app/paths';
import ImageInput from '../components/ImageInput';
import { clsx } from 'clsx/lite';
import { useAppState } from '@/state/AppState';
import { RefObject, useTransition } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

export default function PhotoUploadWithStatus({
  inputRef,
  inputId,
  shouldResize,
  onLastUpload,
  showStatusText = true,
  showButton = true,
  className,
  debug,
}: {
  inputRef?: RefObject<HTMLInputElement | null>
  inputId: string
  shouldResize: boolean
  onLastUpload?: () => Promise<void>
  showStatusText?: boolean
  showButton?: boolean
  className?: string
  debug?: boolean
}) {
  const {
    uploadState: {
      isUploading,
      uploadError,
      fileUploadName,
      fileUploadIndex,
      filesLength,
      debugDownload,
    },
    setUploadState,
    resetUploadState,
  } = useAppState();

  const router = useRouter();

  const shouldResetUploadStateAfterPending = useRef(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!isPending && shouldResetUploadStateAfterPending.current) {
      resetUploadState?.();
      shouldResetUploadStateAfterPending.current = false;
    }
    return () => {
      if (shouldResetUploadStateAfterPending.current) {
        resetUploadState?.();
      }
    };
  }, [isPending, resetUploadState]);
  const isFinishing = isPending && shouldResetUploadStateAfterPending.current;

  return (
    <div className={clsx(
      'flex items-center gap-4',
      isUploading && 'cursor-not-allowed',
      className,
    )}>
      <div className={clsx(
        showButton ? 'flex' : 'hidden',
        'items-center',
      )}>
        <ImageInput
          ref={inputRef}
          id={inputId}
          shouldResize={shouldResize}
          disabled={isPending}
          onStart={() => {
            setUploadState?.({
              isUploading: true,
              uploadError: '',
            });
          }}
          onBlobReady={async ({
            blob,
            extension, 
            hasMultipleUploads,
            isLastBlob,
          }) => {
            if (debug) {
              setUploadState?.({
                isUploading: false,
                uploadError: '',
                debugDownload: {
                  href: URL.createObjectURL(blob),
                  fileName: `debug.${extension}`,
                },
              });
            } else {
              return uploadPhotoFromClient(
                blob,
                extension,
              )
                .then(async url => {
                  if (isLastBlob) {
                    await onLastUpload?.();
                    shouldResetUploadStateAfterPending.current = true;
                    startTransition(() => hasMultipleUploads
                      ? router.push(PATH_ADMIN_UPLOADS)
                      : router.push(pathForAdminUploadUrl(url)));
                  }
                })
                .catch(error => {
                  setUploadState?.({
                    isUploading: false,
                    uploadError: `Upload Error: ${error.message}`,
                  });
                });
            }
          }}
          showButton={showButton}
          debug={debug}
        />
      </div>
      {showStatusText && <div className={clsx(
        'flex items-center gap-4',
        'truncate',
      )}>
        {isUploading && !showButton &&
          <Spinner
            className="text-dim translate-y-[1px]"
            color="text"
            size={14}
          />}
        <span className="truncate">
          {isUploading
            ? isFinishing
              ? <>
                Finishing
              </>
              : <>
                {!showButton &&
                  `Uploading ${fileUploadIndex + 1} of ${filesLength}: `}
                {fileUploadName}
              </>
            : !showButton && <>Initializing</>}
        </span>
      </div>}
      {debug && debugDownload &&
        <a
          className="block"
          href={debugDownload.href}
          download={debugDownload.fileName}
        >
          Download
        </a>}
      {uploadError &&
        <div className="text-error">
          {uploadError}
        </div>}
    </div>
  );
};
