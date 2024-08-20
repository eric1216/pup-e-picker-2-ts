import { Section } from './Components/Section';
import { ActiveTabProvider } from './providers/ActiveTabProvider';
import { DogsProvider } from './providers/DogsProvider';
import { ActiveTabContent } from './Components/ActiveTabContent';

export function App() {
  return (
    <div className='App' style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogsProvider>
        <ActiveTabProvider>
          <Section label={'Dogs: '}>
            <ActiveTabContent />
          </Section>
        </ActiveTabProvider>
      </DogsProvider>
    </div>
  );
}
