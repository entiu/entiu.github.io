import CurvedLoop from "./components/CurvedLoop";
import { ScrollArea } from "./components/ui/scroll-area";
import { ContactSection } from "./features/portfolio/components/ContactSection";
import { PreviewCard } from "./features/portfolio/components/PreviewCard";
import { portfolioEntries } from "./features/portfolio/utils/portfolio-entries";

function App() {
  return (
    <div className="min-h-screen relative w-full bg-amber-300 flex flex-col items-center justify-start space-y-8">
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <CurvedLoop
          marqueeText="UI design ✦ UX research ✦ Front-end Development ✦ Progressive Web Apps ✦ Prototyping ✦ 2D Illustration? ✦ Mock-ups ✦ Branding"
          speed={1}
          curveAmount={300}
          direction="left"
          interactive={true}
          className="custom-text-style"
        />
      </div>

      <ScrollArea className="h-screen w-screen">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-12 p-12 md:max-w-[744px] sm:max-w-[280px] mx-auto">
          {portfolioEntries.map((entry) => (
            <PreviewCard entry={entry} key={entry.imgKey} />
          ))}
        </div>

        <ContactSection />
      </ScrollArea>
    </div>
  );
}

export default App;
