import {
  BarChart3, Compass, Gauge, Handshake, Heart, Layers, Lightbulb, Mail, Megaphone,
  Monitor, RefreshCw, Rocket, Search, ShoppingBag, Target, Users, type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/lib/data/services";

const map = {
  megaphone: Megaphone, cart: ShoppingBag, users: Users, mail: Mail, monitor: Monitor, compass: Compass,
  target: Target, chart: BarChart3, heart: Heart, layers: Layers, gauge: Gauge, handshake: Handshake,
  search: Search, lightbulb: Lightbulb, rocket: Rocket, refresh: RefreshCw,
} satisfies Record<IconKey, unknown>;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const C = map[name];
  return <C aria-hidden strokeWidth={1.6} {...props} />;
}
