import ArchetypePreviewSwitcher from "@/components/ArchetypePreviewSwitcher";
import LinearMatrix from "@/components/linear/LinearMatrix";
import TerminalWire from "@/components/terminal/TerminalWire";
import GeckoDesk from "@/components/gecko/GeckoDesk";

// Server Component: the three designs render on the server; only the switcher, copy buttons, expanders, tabs and sorters are client islands.
export default function Page() {
  return (
    <ArchetypePreviewSwitcher
      designs={[
        { id: "linear", name: "The Linear Matrix", note: "Signature Prop Desk slate · Linear.app grids", node: <LinearMatrix /> },
        { id: "terminal", name: "The Terminal Wire", note: "Monochrome wire · text first", node: <TerminalWire /> },
        { id: "gecko", name: "The Gecko Desk", note: "Obsidian & emerald · metrics desk", node: <GeckoDesk /> },
      ]}
    />
  );
}
