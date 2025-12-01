import TiltedCard from "@/components/TiltedCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Entry } from "../utils/portfolio-entries";

interface PreviewCardProps {
  entry: Entry;
}

export const PreviewCard = ({ entry }: PreviewCardProps) => {
  const size = window.innerWidth < 600 ? "280px" : "300px";

  return (
    <Dialog>
      <DialogTrigger
        className={`flex items-center justify-center !w-[${size}] !h-[${size}]`}
        asChild>
        <div>
          <TiltedCard
            captionText={entry.title}
            showTooltip={false}
            containerHeight={size}
            containerWidth={size}
            imageHeight={"100%"}
            imageWidth={"100%"}
            scaleOnHover={1.1}
            rotateAmplitude={15}
            imageSrc={`/assets/t_${entry.imgKey}.jpg`}
            extraClasses="cursor-pointer shadow-2xl rounded-2xl"
            displayOverlayContent={true}
            overlayContent={
              <p className="bg-foreground/70 text-background text-md rounded-lg m-4 font-extrabold shadow-lg py-2 px-4">
                {entry.title}
              </p>
            }
          />
        </div>
      </DialogTrigger>
      <DialogContent className="md:min-w-6xl h-[90%] px-0 flex flex-col justify-between">
        <DialogHeader className="px-6">
          <DialogTitle>{entry.title}</DialogTitle>
          <DialogDescription>{entry.description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(100%-2.4rem)] w-full">
          <img src={`/assets/p_${entry.imgKey}.jpg`} alt={entry.title} className="w-full" />
          <div className="flex flex-col p-6 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-extrabold">
                Why <span className="text-amber-400">?</span>
              </h1>
              {entry.why}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-extrabold">
                How <span className="text-amber-400">?</span>
              </h1>
              {entry.how}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-extrabold">
                What <span className="text-amber-400">?</span>
              </h1>
              {entry.what}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
