# PRD — A Starlit Apology (Emotional Single-Page Experience)

## Original Problem Statement
Create a premium, highly interactive, single-page apology website that emotionally touches a close friend. Magical, romantic (not over the top), elegant, unforgettable — an emotional digital gift with smooth, polished, coordinated animations.

## User Choices
- Personalization: generic but heartfelt ("to someone I never wanted to hurt" / "someone who misses you")
- Story: heartfelt but general, no specific incident
- No music
- Vibe: starry night sky with floating lanterns & handwritten letter

## Architecture
- Frontend-only React SPA (no backend/auth needed)
- framer-motion (reveals, parallax, micro-interactions), lenis (momentum scrolling), HTML5 canvas (twinkling stars + shooting stars), custom SVG lanterns
- Typography: Cormorant Garamond (display serif), Parisienne (handwritten script), Manrope (body)
- Palette: void #030408, deep indigo #0A1128, warm gold #D4AF37, lantern glow #FFB84D, soft paper #F4EFEA

## User Personas
- Sender: wants to apologize to a close friend with a memorable digital gift
- Recipient: opens the link and experiences the apology as an emotional journey

## Core Requirements (static)
1. Kinetic hero with masked line-by-line "I'm Sorry" reveal
2. Starry night sky with floating parallax lanterns
3. Slow editorial marquee
4. Numbered manifesto chapters (apology in parts)
5. Handwritten letter on soft paper texture
6. Interactive forgiveness finale with lantern release

## Implemented
- 2026-07: Full experience built — canvas starfield w/ shooting stars, parallax SVG lanterns, masked hero reveal, marquee, 3 chapters (01/02/03 alternating alignment), paper letter (Parisienne), "Will you forgive me?" button triggering lantern flood + golden glow + "Thank you" reveal, lenis smooth scroll, grain overlay, reduced-motion support, data-testids throughout
- 2026-07: Personalized with real names — Pratishtha (recipient) in hero line, letter salutation, thank-you message, footer; Sadan (sender) as letter signature and footer
- 2026-07: "Her Reply" feature — after forgiving, Pratishtha sees a handwritten-style reply card ("a note back to Sadan"); replies are stored in MongoDB via POST /api/replies and readable at GET /api/replies
- 2026-08: Reply email notifications via Resend — when Pratishtha sends a reply, a starry-themed HTML email ("Pratishtha wrote back") is sent to sadannaik702@gmail.com; verified 3 sends in backend logs. Config in backend/.env: RESEND_API_KEY, SENDER_EMAIL (onboarding@resend.dev), NOTIFY_EMAIL

## Verified
- Hero loads with staggered reveal; scroll through chapters/letter works; forgive button click shows thank-you message + rising lanterns (screenshot-tested end to end)

## Backlog / Next Tasks
- P0: none
- P1: Personalize with real names (user offered to share them)
- P2: Optional ambient piano music toggle; shareable link with URL param for recipient name; printable letter version
