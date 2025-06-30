import { UploadedFile } from "@/types/file";
import { handleUploadFile } from "@/utils/file";
import { FC, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { CommonAlertDialog } from "@/components/ui/common-alert-dialog.tsx";
import {useTranslation} from "react-i18next";

interface Props {
  initFiles?: UploadedFile[];
  uploadType: string;
  resetSignal?: boolean;
}

const MultiFileUpload: FC<Props> = ({ uploadType, resetSignal }) => {
  const maxFiles = 5;
  const { getValues, setValue } = useFormContext();
  const { setLoading } = useLoadingStore();
  const [uploadedFiles, setUploadedFiles] = useState<(UploadedFile | null)[]>([]);
  const [isFileUploadFail, setIsFileUploadFail] = useState(false);
  const [isMaxFile, setIsMaxFile] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successFileName, setSuccessFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (resetSignal) {
      setUploadedFiles([]);
      setValue("fileMappingId", []);
      setIsUploadSuccess(false);
      setIsUploadError(false);
      setErrorMessage("");
      setSuccessFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [resetSignal, setValue]);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    if (uploadedFiles.length >= maxFiles) {
      setIsFileUploadFail(true);
      setErrorMessage( t('file.exception.max.desc', { max: maxFiles }));
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setIsMaxFile(true);
      setErrorMessage(t('file.exception.maxSize.desc'));
      return;
    }

    try {
      setLoading(true);
      await handleUploadFile(
        { target: { files: [selectedFile] } } as any,
        uploadType,
        (file: UploadedFile) => {
          // 성공 시에만 호출
          setUploadedFiles((prev) => [...prev, file]);
          const prevIds = getValues("fileMappingId") || [];
          setValue("fileMappingId", [...prevIds, file.id]);
          setSuccessFileName(selectedFile.name);
          setIsUploadSuccess(true);
        },
        (err) => {
          // 에러 시 처리
          const errorMsg = err instanceof Error ? err.message : "파일 업로드 중 문제가 발생했습니다.";
          setErrorMessage(errorMsg);
          setIsUploadError(true);
        },
        t
      );
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      const errorMsg = error instanceof Error ? error.message : "파일 업로드 중 문제가 발생했습니다.";
      setErrorMessage(errorMsg);
      setIsUploadError(true);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = uploadedFiles[index];
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

    if (removedFile) {
      const prevIds = getValues("fileMappingId") || [];
      setValue("fileMappingId", prevIds.filter((id: string) => id !== removedFile.id));
    }
  };

  const onIsFileUploadFailConfirm = async () => {
    setIsFileUploadFail(false);
  };

  const onIsMaxFileConfirm = async () => {
    setIsMaxFile(false);
  };

  const onUploadSuccessConfirm = async () => {
    setIsUploadSuccess(false);
  };

  const onUploadErrorConfirm = async () => {
    setIsUploadError(false);
  };
  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 클릭 시 input 리셋
    }
  };

  return (
    <>
    <div>
      <div className="input-group file-type">
        <button
          type="button"
          className="btn add-btn"
          onClick={() => {
            handleInputClick();
            fileInputRef.current?.click();
          }}
        >
          {t('file.uploadButton')}
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <p className="error-txt">
        {t('file.uploadLimitMessage')}
      </p>
        {uploadedFiles.length > 0 && (
          <ul className="file-box">
              {uploadedFiles.map((file, index) => (
                file && (
                  <li
                    key={file.id}
                  >
                   {file.originName}
                    <button className="close-btn" type="button"  onClick={() => handleRemoveFile(index)}>
                    </button>
                  </li>
                )
              ))}
          </ul>
        )}
      </div>

      <CommonAlertDialog
        type="normal"
        isOpen={isFileUploadFail}
        title={t('file.exception.max.title')}
        description={errorMessage}
        confirmText={t('file.confirm')}
        onConfirm={onIsFileUploadFailConfirm}
      />
      <CommonAlertDialog
        type="normal"
        isOpen={isMaxFile}
        title={t('file.exception.maxSize.title')}
        description={errorMessage}
        confirmText={t('file.confirm')}
        onConfirm={onIsMaxFileConfirm}
      />
      <CommonAlertDialog
        type="normal"
        isOpen={isUploadSuccess}
        title={t('file.success.title')}
        description={t('file.success.desc', { fileName: successFileName })}
        confirmText={t('file.confirm')}
        onConfirm={onUploadSuccessConfirm}
      />
      <CommonAlertDialog
        type="destructive"
        isOpen={isUploadError}
        title={t('file.error.title')}
        description={errorMessage}
        confirmText={t('file.confirm')}
        onConfirm={onUploadErrorConfirm}
      />

    </>
  );
};

export default MultiFileUpload;