# RS Labs — design notes

A minimal company website: clean, light and professional, in the style of an
enterprise IT services site, but deliberately small. One page with:
hero, services, products, about, contact and footer.

## Principles
- Company first. Products are one section, not the whole site.
- Only true content: no stats, testimonials, client logos or team claims.
- Light pages with one dark band (contact) for contrast.

## Tokens (`src/index.css`)
| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1222` | text, primary buttons, dark band |
| `muted` | `#5B6475` | secondary text |
| `line` | `#E6E8EF` | borders |
| `surface` | `#F5F6FA` | services background |
| `lavender` | `#F2F0FF` | about background, icon tiles |
| `brand` | `#3D7BFF` | links, labels, accents |
| `violet` | `#8B6CFF` | second accent (logo core, gradients) |

- **Type:** Instrument Sans throughout. Headings light (weight ~420–450) and large; labels small, uppercase, brand blue.
- **Shape:** 6px buttons, 12–16px cards, soft blurred brand-colour light behind the hero.
- **Motion:** gentle fade-up on scroll only; off with `prefers-reduced-motion`.
