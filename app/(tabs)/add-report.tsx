import { CreateOrderModal } from "@/features/add-report/components/content/CreateOrderModal";
import { StepOneOrderSelection } from "@/features/add-report/components/content/StepOneOrderSelection";
import { StepTechnicalForm } from "@/features/add-report/components/content/StepTechnicalForm";
import { StepVehicleForm } from "@/features/add-report/components/content/StepVehicleForm";
import { ReportBottomActions } from "@/features/add-report/components/footer/ReportBottomActions";
import { ReportHeader } from "@/features/add-report/components/header/ReportHeader";
import { useAddReportForm } from "@/features/add-report/hooks/useAddReportForm";
import { FormProvider } from "react-hook-form";
import { ScrollView, View } from "react-native";

export default function AddReportScreen() {
  const {
    form,
    step,
    filteredOrders,
    selectedOrderId,
    searchValue,
    setSearchValue,
    isCreateOrderOpen,
    setCreateOrderOpen,
    newOrderName,
    setNewOrderName,
    newOrderDescription,
    setNewOrderDescription,
    handleHeaderBack,
    handleBackStep,
    selectOrder,
    createOrder,
    goNext,
  } = useAddReportForm();

  return (
    <FormProvider {...form}>
      <View className="flex-1 bg-zinc-100">
        <ReportHeader step={step} onBack={handleHeaderBack} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4">
          {step === 1 ? (
            <StepOneOrderSelection
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              orders={filteredOrders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={selectOrder}
            />
          ) : null}
          {step === 2 ? <StepVehicleForm /> : null}
          {step === 3 ? <StepTechnicalForm /> : null}
        </ScrollView>

        <ReportBottomActions
          step={step}
          onOpenCreateOrder={() => setCreateOrderOpen(true)}
          onBackStep={handleBackStep}
          onNext={() => void goNext()}
        />

        <CreateOrderModal
          visible={isCreateOrderOpen}
          newOrderName={newOrderName}
          newOrderDescription={newOrderDescription}
          onClose={() => setCreateOrderOpen(false)}
          onNameChange={setNewOrderName}
          onDescriptionChange={setNewOrderDescription}
          onCreate={createOrder}
        />
      </View>
    </FormProvider>
  );
}
