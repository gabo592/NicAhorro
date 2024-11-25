import { getCurrencies } from "@/app/currencies/actions";
import AppHeader from "@/components/common/app-header";
import MainContainer from "@/components/common/main-container";
import SavingAccountsForm from "@/components/saving-accounts/form";
import { Toaster } from "@/components/ui/toaster";

export default async function CreateSavingAccountPage() {
  const currencies = await getCurrencies();

  return (
    <>
      <AppHeader title="Crear Cuenta de Ahorro" />
      <MainContainer>
        <SavingAccountsForm currencies={currencies} />
      </MainContainer>
      <Toaster />
    </>
  )
}