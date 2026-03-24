import type { PropsWithChildren } from 'react';
import BackgroundMotif from '../ui/BackgroundMotif';

function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <BackgroundMotif />
      {children}
    </div>
  );
}

export default AppShell;
