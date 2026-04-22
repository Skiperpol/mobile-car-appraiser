import { CreateOrderModal } from "@/components/add-report/CreateOrderModal";
import { ReportBottomActions } from "@/components/add-report/ReportBottomActions";
import { ReportHeader } from "@/components/add-report/ReportHeader";
import { StepOneOrderSelection } from "@/components/add-report/StepOneOrderSelection";
import { StepTechnicalForm } from "@/components/add-report/StepTechnicalForm";
import { StepVehicleForm } from "@/components/add-report/StepVehicleForm";
import { useAddReportForm } from "@/components/add-report/useAddReportForm";
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="p-4"
        >
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
