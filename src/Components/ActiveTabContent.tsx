import { useActiveTab } from '../providers/ActiveTabProvider';
import { CreateDogForm } from './CreateDogForm';
import { Dogs } from './Dogs';

export function ActiveTabContent() {
  const { activeTab } = useActiveTab();
  const shouldShowCreationUI = activeTab === 'create';
  return (
    <>
      {!shouldShowCreationUI && <Dogs />}
      {shouldShowCreationUI && <CreateDogForm />}
    </>
  );
}
