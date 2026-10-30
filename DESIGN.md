---
name: Ameliora
description: AI and automation for UK businesses, documented like serious work.
colors:
  ground: "#ffffff"
  ink: "#111214"
  ink-press: "#2a2c30"
  muted: "#5f646b"
  line: "#d9dbde"
  signal: "#e35205"
typography:
  display:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 1.3rem + 5.6vw, 6.75rem)"
    fontWeight: 700
    lineHeight: 0.93
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.25rem + 2.9vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.6vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.4vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Familjen Grotesk, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  gap: "24px"
  section: "clamp(80px, 9vw, 152px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.note}"
    rounded: "{rounded.none}"
    padding: "18px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink-press}"
  link:
    textColor: "{colors.ink}"
    typography: "{typography.note}"
---

# Design System: Ameliora

## Overview

**Creative North Star: "The Documentary"**

Ameliora sells measured results to UK business owners who are wary of AI hype and want serious experts. The site looks like a firm documenting real work: large black-and-white photographs of British businesses at work, plain heavy type, one clear promise ("AI that pays for itself.") and the facts of how an engagement runs. It refuses the AI-consultancy defaults the owner rejected and the research confirmed (dark navy with glows, purple gradients, dot grids, floating 3D objects, logo walls it cannot honestly fill).

Redesigned on 30 October 2026 after the owner rejected the previous build's colours, content, footer and background, chose "serious experts" as the first impression, and picked this direction from a researched set of professional B2B options. The photographs carry the page; the type stays plain and lets them speak. There is no decoration anywhere: no background layer, no bands, no cards, no rules between list items.

**Key Characteristics:**
- One white ground, near-black ink, and a single orange accent used only as a small mark.
- Four large black-and-white documentary photographs, each with a plain caption that says what it shows.
- Familjen Grotesk throughout, heavy and tight at display size; seven type sizes in all.
- Square black buttons and one named action everywhere: "Book a discovery call".
- One pinned scroll scene ("How an engagement runs"); everything else simply arrives.

## Colors

Near-black on white, with one signal colour that marks rather than fills.

### Primary
- **Ink** (#111214): headings, running text, every button's fill. Hovered buttons lift to **Ink Press** (#2a2c30).

### Accent
- **Signal Orange** (#e35205): the wordmark's full stop, the underline under text links, and the progress line in the pinned scene. Never text, never a fill, never a background.

### Neutral
- **Ground** (#ffffff): the one continuous page ground and the button text.
- **Muted** (#5f646b): captions, step durations, footer headings and the inactive navigation; 5.9:1 on white.
- **Line** (#d9dbde): the unfilled progress line and the scrolled navigation's edge only.

### Named Rules
**The One Mark Rule.** Signal Orange appears only as a mark (a full stop, an underline, a line); a fill of it anywhere means the system has broken.

**The Seamless Ground Rule.** The page background never changes and nothing decorates it: no bands, no patterns, no glows. A change of subject is marked by space, a heading and a photograph.

**The Honest Picture Rule.** Every photograph has alt text and a caption saying what it shows, never who; no picture presents anyone as Ameliora's staff or clients, and the footer states that the photographs are illustrative and how they were made.

## Typography

**Display and body font:** Familjen Grotesk (with system-ui, sans-serif)

**Character:** A sturdy grotesk with a slightly condensed, confident bold. Plain enough to read as trustworthy, heavy enough at display size to stand beside a full-height photograph.

### Hierarchy
- **Display** (700, 52–108px fluid, 0.93): the hero headline only, two lines at most.
- **Headline** (700, 36–64px fluid, 1): one per section, including the problem statement.
- **Title** (700, 22–28px fluid, 1.2): Find / Build / Run, step names, the commitments, and the wordmark.
- **Lead** (400, 20–24px fluid, 1.4): the sentence under each main heading.
- **Body** (400, 18px, 1.55): running text, always in full ink.
- **Note** (500–600, 16px): navigation, buttons and footer links.
- **Caption** (400–600, 15px): photo captions, step durations, footer headings and small print.

### Named Rules
**The Few Words Rule.** A section says its idea in a heading and at most one sentence; the photograph and the facts do the rest.

**The Sentence Case Rule.** No uppercase labels and no small label above a heading. A heading says what the section is.

## Layout

A 12-column grid with a 24px gap inside fluid outer margins of 20–56px, applied identically to the navigation, every section and the footer, on one white ground. Sections are separated by space alone (80–152px). Six sections, each a different composition: the hero (photograph on the right two-thirds, the copy's white panel overlapping its left edge), the problem (one bold line beside its sentence), the approach (photograph left, heading and Find / Build / Run right), the pinned process (portrait photograph left, steps right), the commitments (heading left, five statements right) and the close (photograph left, the call right). The footer is three columns and a base line, separated from the close by space.

**The scroll scene.** Only "How an engagement runs" is pinned: its stage is CSS-sticky under the navigation for 1.5 screens of hold, and a stage taller than the screen sticks by its bottom edge. Scroll is always native. As the scroll passes through the hold, an orange line beside the steps fills from the top and each step turns from Muted to Ink as the line reaches it; the photograph holds still beside them. On phones the photograph steps aside while the scene runs and the stage leaves room for the booking bar. Reduced motion and no-script visitors get every step at once, unpinned, with the photograph.

**The hero on load.** The photograph settles from a 1.06 scale over 1.6s while the headline, sentence and actions rise 16px into place, staggered 90ms. Section parts rise 24px as they arrive, staggered 80ms.

Below 1100px the paired sections rebalance to 6 + 6; below 900px everything stacks (the hero photograph leads with the panel overlapping its lower edge, and the close leads with its call before its photograph); below 860px the navigation links hide; below 720px a booking bar slides up between the hero and the closing call.

## Elevation & Depth

The system is flat. Depth comes only from the photographs and from the hero panel overlapping its photograph.

### Shadow Vocabulary
- **Sticky bar edge** (`box-shadow: 0 1px 0 #d9dbde`): the navigation once the page has scrolled.
- **Booking bar edge** (`box-shadow: 0 -1px 0 #d9dbde`): the phone booking bar.

### Named Rules
**The Flat-At-Rest Rule.** Nothing carries a shadow at rest. Focus is a 3px Ink outline offset 3px.

## Shapes

Square corners everywhere: buttons, photographs and the hero panel. The only curve on the page is in the type.

## Components

### Buttons
One fill, one name. Ink with white text, 18px × 24px padding (14px × 20px in the navigation), square corners. Hover lifts to Ink Press on pointer devices only; press scales to 0.97 over 160ms on a strong ease-out.

### Text link
Ink, 600, with a 2px Signal Orange underline offset 6px; hover turns the text Muted.

### Photograph
A `figure` with the image at full column width and a Caption-sized figcaption 12px below; in the hero the caption sits on a white tab at the photograph's lower-left corner. Black and white only.

### Steps
Four steps on a 2px line: duration (Caption, Muted), step name (Title) and one sentence (Body), separated by 22px of space.

### Navigation
- **Style:** sticky white bar, 80px tall (68px on phones): the wordmark with its orange full stop, three Muted links, one black button.
- **States:** the current section's link turns Ink with a 2px Ink underline that grows from the left; below 860px the links hide and, below 720px, the bottom booking bar takes over the button.

### Footer
Wordmark and tagline, a Company column (the section links) and a Contact column (booking and email), then a base line with the company details and the photography credit.

## Do's and Don'ts

### Do:
- **Do** let real photographs of businesses at work carry the page, large and captioned.
- **Do** keep each section to a heading and at most one sentence, with facts set plainly.
- **Do** keep every headline to two lines at every width, in sentence case.
- **Do** separate sections and list items with space alone.
- **Do** honour reduced motion: keep fades, drop travel, unpin the scene and show every step.
- **Do** keep scroll native: no wheel capture, no scroll smoothing, and one pinned scene on this page.

### Don't:
- **Don't** decorate the background: no dot grids, glows, gradients or patterns (the owner rejected them as an "AI website").
- **Don't** use dark navy with glows, purple gradients or floating 3D objects, the category's defaults.
- **Don't** add logo walls, testimonials, statistics or case studies that are not real.
- **Don't** list catalogues of specific jobs Ameliora automates; the owner finds that pigeonholing.
- **Don't** bring back gimmicks: animated job piles, cost calculators or playful widgets.
- **Don't** use Signal Orange as text, fill or background.
- **Don't** paint sections in alternating background colours or full-width bands.
- **Don't** put thin rules between list items or wrap content in cards.
- **Don't** place small uppercase labels or kickers above headings.
- **Don't** pin more than one section, and don't pin the hero.
- **Don't** present anyone in a photograph as Ameliora's staff or clients.
