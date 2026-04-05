import type { PropsWithChildren } from 'react';
import Container from '../../components/layout/Container';

type ToolLayoutProps = PropsWithChildren<{
  title: string;
  intro: string;
}>;

function ToolLayout({ title, intro, children }: ToolLayoutProps) {
  return (
    <main className="pb-16 pt-32 sm:pt-36">
      <Container>
        <div className="space-y-8">
          <header className="panel rounded-[2rem] p-6 sm:p-8">
            <div className="max-w-3xl space-y-4">
              <p className="section-label">Spatialdom Tools</p>
              <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
              <p className="text-sm leading-7 text-text-body sm:text-base">{intro}</p>
            </div>
          </header>

          <div>{children}</div>
        </div>
      </Container>
    </main>
  );
}

export default ToolLayout;
