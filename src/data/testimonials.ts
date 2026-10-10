export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context?: string;
}

/** Add real testimonials here. The section stays hidden while this list is empty. */
export const TESTIMONIALS: Testimonial[] = [];
