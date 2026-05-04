import basicDataRepository from "@/database/repositories/BasicDataRepository";
import reportAttachmentsRepository from "@/database/repositories/ReportAttachmentsModel";
import reportRepository from "@/database/repositories/ReportRepository";
import type { ReportDetails } from "@/features/report-details/types/types";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Linking } from "react-native";

const REPORTS_DIR = `${FileSystem.documentDirectory}reports`;

export function useReportDetailsViewModel(reportId?: string) {
  const [details, setDetails] = useState<ReportDetails | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPhotoSourceModalOpen, setPhotoSourceModalOpen] = useState(false);
  const [photoPermissionMessage, setPhotoPermissionMessage] = useState<
    string | null
  >(null);

  const load = useCallback(async () => {
    if (!reportId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const report = await reportRepository.getReportById(reportId);
    if (!report) {
      setDetails(null);
      setLoading(false);
      return;
    }

    const basicData = await basicDataRepository.getByReportId(report.id);
    const attachments = await reportAttachmentsRepository.getByReportId(
      report.id,
    );

    setDetails({
      id: report.id,
      carName:
        [basicData?.brand, basicData?.model].filter(Boolean).join(" ") ||
        report.reportNumber,
      statusLabel:
        report.reportState === "error"
          ? "Blad synchronizacji"
          : report.reportState === "synced"
            ? "Zsynchronizowane"
            : "Oczekuje synchronizacji",
      assignedOrderId: report.orderId ?? "-",
      reportNumber: report.reportNumber,
      make: basicData?.brand ?? "-",
      model: basicData?.model ?? "-",
      vin: basicData?.vin ?? "-",
      registrationNumber: basicData?.registrationNumber ?? "-",
      photos: attachments.map((item) => ({
        id: item.id,
        title: item.name ?? "Zdjecie",
        comment: item.comment ?? "",
        uri: item.url,
        name: item.name ?? "zdjecie",
      })),
    });
    setLoading(false);
  }, [reportId]);

  useEffect(() => {
    void load();
  }, [load]);

  const savePickedAsset = useCallback(
    async (asset: ImagePicker.ImagePickerAsset) => {
      if (!reportId) {
        return;
      }

      const extension = asset.fileName?.split(".").pop() ?? "jpg";
      const name = `${Date.now()}.${extension}`;
      const reportDir = `${REPORTS_DIR}/${reportId}`;
      const destination = `${reportDir}/${name}`;

      await FileSystem.makeDirectoryAsync(reportDir, { intermediates: true });
      await FileSystem.copyAsync({ from: asset.uri, to: destination });

      await reportAttachmentsRepository.createReportAttachments({
        reportId,
        url: destination,
        name,
        comment: null,
      });

      const report = await reportRepository.getReportById(reportId);
      if (report && !report.imageName) {
        await reportRepository.updateReport(reportId, {
          imageName: name,
          imageUrl: destination,
          reportState: "synced",
        });
      }

      await load();
    },
    [load, reportId],
  );

  const addPhoto = useCallback(() => {
    setPhotoPermissionMessage(null);
    setPhotoSourceModalOpen(true);
  }, []);

  const pickPhotoFromGallery = useCallback(async () => {
    if (!reportId) {
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setPhotoPermissionMessage(
        "Nadaj dostep do galerii, aby wybrac zdjecie.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (result.canceled || result.assets.length === 0) {
      return;
    }

    await savePickedAsset(result.assets[0]);
    setPhotoSourceModalOpen(false);
    setPhotoPermissionMessage(null);
  }, [reportId, savePickedAsset]);

  const takePhotoWithCamera = useCallback(async () => {
    if (!reportId) {
      return;
    }
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setPhotoPermissionMessage("Nadaj dostep do kamery, aby zrobic zdjecie.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (result.canceled || result.assets.length === 0) {
      return;
    }

    await savePickedAsset(result.assets[0]);
    setPhotoSourceModalOpen(false);
    setPhotoPermissionMessage(null);
  }, [reportId, savePickedAsset]);

  const closePhotoSourceModal = useCallback(() => {
    setPhotoSourceModalOpen(false);
    setPhotoPermissionMessage(null);
  }, []);

  const openAppSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

  const savePhotoComment = useCallback(
    async (photoId: string, comment: string) => {
      await reportAttachmentsRepository.updateReportAttachments(photoId, {
        comment,
      });
      await load();
    },
    [load],
  );

  return useMemo(
    () => ({
      details,
      isLoading,
      addPhoto,
      isPhotoSourceModalOpen,
      photoPermissionMessage,
      closePhotoSourceModal,
      pickPhotoFromGallery,
      takePhotoWithCamera,
      openAppSettings,
      savePhotoComment,
      refresh: load,
    }),
    [
      details,
      isLoading,
      addPhoto,
      isPhotoSourceModalOpen,
      photoPermissionMessage,
      closePhotoSourceModal,
      pickPhotoFromGallery,
      takePhotoWithCamera,
      openAppSettings,
      savePhotoComment,
      load,
    ],
  );
}
