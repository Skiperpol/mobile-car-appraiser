import { PhotoCommentModal } from "@/components/report-details/PhotoCommentModal";
import { PhotosGridCard } from "@/components/report-details/PhotosGridCard";
import { ReportDetailsBottomBar } from "@/components/report-details/ReportDetailsBottomBar";
import { ReportDetailsHeader } from "@/components/report-details/ReportDetailsHeader";
import { ReportInfoCard } from "@/components/report-details/ReportInfoCard";
import { ReportInfoModal } from "@/components/report-details/ReportInfoModal";
import { getReportDetails } from "@/components/report-details/mockData";
import { type ReportPhoto } from "@/components/report-details/types";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function ReportDetailsScreen() {
  const params = useLocalSearchParams<{ reportId?: string; reportNumber?: string }>();
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ReportPhoto | null>(null);
  const [photoComment, setPhotoComment] = useState("");
  const [localPhotos, setLocalPhotos] = useState<ReportPhoto[] | null>(null);

  const baseDetails = useMemo(
    () => getReportDetails(params.reportId, params.reportNumber),
    [params.reportId, params.reportNumber],
  );

  const photos = localPhotos ?? baseDetails.photos;

  const handleOpenPhoto = (photo: ReportPhoto) => {
    setSelectedPhoto(photo);
    setPhotoComment(photo.comment);
    setPhotoModalOpen(true);
  };

  const handleSaveComment = () => {
    if (!selectedPhoto) {
      return;
    }

    setLocalPhotos((prev) => {
      const source = prev ?? baseDetails.photos;
      return source.map((item) =>
        item.id === selectedPhoto.id ? { ...item, comment: photoComment.trim() } : item,
      );
    });
    setPhotoModalOpen(false);
  };

  return (
    <View className="flex-1 bg-zinc-100">
      <ReportDetailsHeader title={baseDetails.carName} />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <ReportInfoCard onPress={() => setInfoModalOpen(true)} />
        <PhotosGridCard
          photos={photos}
          onPhotoPress={handleOpenPhoto}
          statusLabel={baseDetails.statusLabel}
        />
      </ScrollView>

      <ReportDetailsBottomBar />

      <ReportInfoModal
        visible={isInfoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={{
          assignedOrderId: baseDetails.assignedOrderId,
          reportNumber: baseDetails.reportNumber,
          make: baseDetails.make,
          model: baseDetails.model,
          vin: baseDetails.vin,
          registrationNumber: baseDetails.registrationNumber,
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
