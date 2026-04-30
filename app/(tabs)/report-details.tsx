import { PhotoCommentModal } from "@/components/report-details/PhotoCommentModal";
import { PhotosGridCard } from "@/components/report-details/PhotosGridCard";
import { ReportDetailsBottomBar } from "@/components/report-details/ReportDetailsBottomBar";
import { ReportDetailsHeader } from "@/components/report-details/ReportDetailsHeader";
import { ReportInfoCard } from "@/components/report-details/ReportInfoCard";
import { ReportInfoModal } from "@/components/report-details/ReportInfoModal";
import { type ReportPhoto } from "@/components/report-details/types";
import { useReportDetailsViewModel } from "@/viewmodels/reports/useReportDetailsViewModel";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function ReportDetailsScreen() {
  const params = useLocalSearchParams<{
    reportId?: string;
    reportNumber?: string;
  }>();
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ReportPhoto | null>(null);
  const [photoComment, setPhotoComment] = useState("");
  const vm = useReportDetailsViewModel(params.reportId);

  const details = vm.details;
  const photos = details?.photos ?? [];

  const handleOpenPhoto = (photo: ReportPhoto) => {
    setSelectedPhoto(photo);
    setPhotoComment(photo.comment);
    setPhotoModalOpen(true);
  };

  const handleSaveComment = () => {
    if (!selectedPhoto) {
      return;
    }
    void vm.savePhotoComment(selectedPhoto.id, photoComment.trim());
    setPhotoModalOpen(false);
  };

  return (
    <View className="flex-1">
      <ReportDetailsHeader title={details?.carName ?? "Raport"} />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <ReportInfoCard onPress={() => setInfoModalOpen(true)} />
        <PhotosGridCard
          photos={photos}
          onPhotoPress={handleOpenPhoto}
          statusLabel={details?.statusLabel ?? "Brak danych"}
        />
      </ScrollView>

      <ReportDetailsBottomBar onAddPhoto={() => void vm.addPhoto()} />

      <ReportInfoModal
        visible={isInfoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={{
          assignedOrderId: details?.assignedOrderId ?? "-",
          reportNumber: details?.reportNumber ?? params.reportNumber ?? "-",
          make: details?.make ?? "-",
          model: details?.model ?? "-",
          vin: details?.vin ?? "-",
          registrationNumber: details?.registrationNumber ?? "-",
        }}
      />

      <PhotoCommentModal
        visible={isPhotoModalOpen}
        photo={selectedPhoto}
        comment={photoComment}
        onCommentChange={setPhotoComment}
        onClose={() => setPhotoModalOpen(false)}
        onSave={handleSaveComment}
      />
    </View>
  );
}
