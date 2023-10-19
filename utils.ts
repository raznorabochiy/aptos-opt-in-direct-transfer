import fs from "fs/promises";
import { Presets, SingleBar } from "cli-progress";

export async function readListFromFile(filename: string): Promise<string[]> {
  const file = await fs.readFile(filename, { encoding: "utf8" });

  return file.split("\n").filter(Boolean).map((item) => item.trim());
}

export const delayProgress = (seconds: number) => {
  return new Promise<void>((resolve) => {
    const bar = new SingleBar({
      format: "Delay [{bar}] {value}/{total}",
    }, Presets.shades_classic);

    bar.start(seconds, 0);
    let counter = 0;

    const timer = setInterval(() => {
      counter = counter + 1;
      bar.update(counter);
      if (counter === seconds) {
        clearInterval(timer);
        bar.stop();
        resolve();
      }
    }, 1000);
  });
};
