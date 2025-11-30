import { describe, it, expect, beforeEach } from "vitest";
import { snapshot } from "valtio";
import state from "../store";
import { DecalTypes } from "../config/constants";

describe("Customizer Integration - State Management Flow", () => {
    beforeEach(() => {
        // Reset state before each test
        state.intro = true;
        state.color = "#EFBD48";
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.logoDecal = "./threejs.png";
        state.fullDecal = "./threejs.png";
    });

    describe("DecalTypes Configuration", () => {
        it("should have correct logo decal type mapping", () => {
            expect(DecalTypes.logo).toEqual({
                stateProperty: "logoDecal",
                filterTab: "logoShirt",
            });
        });

        it("should have correct full decal type mapping", () => {
            expect(DecalTypes.full).toEqual({
                stateProperty: "fullDecal",
                filterTab: "stylishShirt",
            });
        });
    });

    describe("Decal Update Flow", () => {
        it("should update logo decal and enable logo texture", () => {
            const type = "logo";
            const newImage = "data:image/png;base64,newLogoImage";

            // Simulate handleDecals logic
            const decalType = DecalTypes[type];
            state[decalType.stateProperty] = newImage;
            state.isLogoTexture = true;

            const snap = snapshot(state);
            expect(snap.logoDecal).toBe(newImage);
            expect(snap.isLogoTexture).toBe(true);
        });

        it("should update full decal and enable full texture", () => {
            const type = "full";
            const newImage = "data:image/png;base64,newFullImage";

            // Simulate handleDecals logic
            const decalType = DecalTypes[type];
            state[decalType.stateProperty] = newImage;
            state.isFullTexture = true;

            const snap = snapshot(state);
            expect(snap.fullDecal).toBe(newImage);
            expect(snap.isFullTexture).toBe(true);
        });
    });

    describe("Toggle Texture Filters", () => {
        it("should toggle logo texture on/off", () => {
            state.isLogoTexture = true;
            expect(snapshot(state).isLogoTexture).toBe(true);

            state.isLogoTexture = false;
            expect(snapshot(state).isLogoTexture).toBe(false);
        });

        it("should toggle full texture on/off", () => {
            state.isFullTexture = false;
            expect(snapshot(state).isFullTexture).toBe(false);

            state.isFullTexture = true;
            expect(snapshot(state).isFullTexture).toBe(true);
        });

        it("should handle both textures enabled simultaneously", () => {
            state.isLogoTexture = true;
            state.isFullTexture = true;

            const snap = snapshot(state);
            expect(snap.isLogoTexture).toBe(true);
            expect(snap.isFullTexture).toBe(true);
        });
    });

    describe("Color Customization Flow", () => {
        it("should update t-shirt color", () => {
            state.color = "#FF0000";
            expect(snapshot(state).color).toBe("#FF0000");

            state.color = "#00FF00";
            expect(snapshot(state).color).toBe("#00FF00");
        });

        it("should maintain color while updating decals", () => {
            const customColor = "#123456";
            state.color = customColor;
            state.logoDecal = "new-logo.png";

            const snap = snapshot(state);
            expect(snap.color).toBe(customColor);
            expect(snap.logoDecal).toBe("new-logo.png");
        });
    });

    describe("Intro State Management", () => {
        it("should start with intro enabled", () => {
            expect(snapshot(state).intro).toBe(true);
        });

        it("should toggle intro state to enter customizer", () => {
            state.intro = false;
            expect(snapshot(state).intro).toBe(false);
        });

        it("should return to intro from customizer", () => {
            state.intro = false;
            expect(snapshot(state).intro).toBe(false);

            state.intro = true;
            expect(snapshot(state).intro).toBe(true);
        });
    });

    describe("Complete Customization Workflow", () => {
        it("should simulate full user customization flow", () => {
            // 1. Start at intro
            expect(snapshot(state).intro).toBe(true);

            // 2. Enter customizer
            state.intro = false;
            expect(snapshot(state).intro).toBe(false);

            // 3. Change t-shirt color
            state.color = "#FF5733";
            expect(snapshot(state).color).toBe("#FF5733");

            // 4. Upload/generate logo
            state.logoDecal = "data:image/png;base64,customLogo";
            state.isLogoTexture = true;

            const midSnap = snapshot(state);
            expect(midSnap.logoDecal).toBe("data:image/png;base64,customLogo");
            expect(midSnap.isLogoTexture).toBe(true);

            // 5. Generate full texture
            state.fullDecal = "data:image/png;base64,customFull";
            state.isFullTexture = true;

            const finalSnap = snapshot(state);
            expect(finalSnap.fullDecal).toBe(
                "data:image/png;base64,customFull"
            );
            expect(finalSnap.isFullTexture).toBe(true);
            expect(finalSnap.color).toBe("#FF5733");
        });
    });
});
