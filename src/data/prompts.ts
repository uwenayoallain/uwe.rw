export const PROJECT_IMAGE_PROMPT = `
You are an expert 3D UI/UX designer and illustrator. Create a high-fidelity, photorealistic 3D isometric illustration of a modern web application interface.

**Style & Atmosphere:**
- **Perspective:** Isometric view, floating in a clean, abstract 3D space.
- **Aesthetic:** Premium, futuristic yet grounded, "glassmorphism" with soft, sophisticated lighting.
- **Materials:** Frosted glass, matte metal, glossy screens, and soft ambient occlusion.
- **Lighting:** Cinematic studio lighting with soft shadows and highlights that accentuate depth.

**Theme:**
- **Mode:** {THEME} (Substitute with "Dark Mode" or "Light Mode")
- **Palette:** 
    - Dark Mode: Deep obsidian background (#050505), charcoal surface (#101010), accents of Gold (#F4D619) and Navy (#1B487B).
    - Light Mode: Soft porcelain background (#F0F0F0), white surface (#FFFFFF), accents of Gold (#F4D619) and Navy (#1B487B).

**Subject:**
- **Project:** {PROJECT_NAME}
- **Description:** {PROJECT_DESCRIPTION}
- **Visual Elements:** Abstract representations of the UI (charts, graphs, buttons, cards) floating slightly above the main "screen" plane to show depth. avoid text if possible, or use abstract lines for text.

**Quality:**
- 4k resolution, highly detailed, sharp focus, octane render style.
`;
