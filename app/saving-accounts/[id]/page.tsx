import { getCurrencies } from "@/app/currencies/actions";
import { getSavingAccount } from "../actions";
import AppHeader from "@/components/common/app-header";
import MainContainer from "@/components/common/main-container";
import SavingAccountsForm from "@/components/saving-accounts/form";
import { Toaster } from "@/components/ui/toaster";

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditSavingAccountPage({ params }: Props) {
  const id = (await params).id;
  const [savingAccount, currencies] = await Promise.all([getSavingAccount(id), getCurrencies()]);

  return (
    <>
      <AppHeader title="Crear Cuenta de Ahorro" />
      <MainContainer>
        <SavingAccountsForm savingAccount={savingAccount} currencies={currencies} />
      </MainContainer>
      <Toaster />
    </>
  )
}