import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const products = [
  {
    name: 'Court Kings Pro Cap',
    price: '$34.99',
    image: '🧢',
    tag: 'Best Seller',
    url: 'https://shop.courtkings.com',
    rating: 4.8,
  },
  {
    name: 'Court Kings Training Towel',
    price: '$19.99',
    image: '🏋️',
    tag: 'New',
    url: 'https://shop.courtkings.com',
    rating: 4.6,
  },
  {
    name: 'Court Kings Facility Access Pass',
    price: '$149.99/mo',
    image: '🏟️',
    tag: 'Premium',
    url: 'https://shop.courtkings.com',
    rating: 4.9,
  },
];

export default function CourtKingsShop() {
  return (
    <div className="mt-10">
      <ScrollReveal>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Badge variant="outline" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/20 text-xs mb-2">
              <ShoppingBag size={10} className="mr-1" /> Court Kings Shop
            </Badge>
            <h3 className="font-display text-xl font-bold text-foreground">Official Court Kings Gear</h3>
          </div>
          <a href="https://shop.courtkings.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
              Visit Shop <ExternalLink size={10} />
            </Button>
          </a>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glass rounded-2xl overflow-hidden glass-hover border border-[hsl(var(--gold))]/15"
            >
              <div className="h-24 bg-[hsl(var(--gold))]/5 flex items-center justify-center relative">
                <span className="text-4xl">{p.image}</span>
                <Badge variant="outline" className="absolute top-2 right-2 text-[9px] bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/20">
                  {p.tag}
                </Badge>
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-foreground text-sm mb-1">{p.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="stat-number text-lg text-[hsl(var(--gold))]">{p.price}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Star size={8} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" /> {p.rating}
                  </span>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full text-xs border-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 active:scale-95 transition-transform">
                    Shop Now <ExternalLink size={10} />
                  </Button>
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
