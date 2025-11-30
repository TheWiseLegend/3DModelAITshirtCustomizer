import { describe, it, expect, beforeEach } from "vitest";
import { snapshot } from "valtio";
import state from "../store";

describe("Valtio Store", () => {
    beforeEach(() => {
        // Reset state before each test
        state.intro = true;
        state.color = "#EFBD48";
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.logoDecal = "./threejs.png";
        state.fullDecal = "./threejs.png";
    });

    it("should have correct initial state", () => {
        const snap = snapshot(state);

        expect(snap.intro).toBe(true);
        expect(snap.color).toBe("#EFBD48");
        expect(snap.isLogoTexture).toBe(true);
        expect(snap.isFullTexture).toBe(false);
        expect(snap.logoDecal).toBe("./threejs.png");
        expect(snap.fullDecal).toBe("./threejs.png");
    });

    it("should update color", () => {
        state.color = "#FF0000";
        const snap = snapshot(state);

        expect(snap.color).toBe("#FF0000");
    });

    it("should toggle intro state", () => {
        state.intro = false;
        const snap = snapshot(state);

        expect(snap.intro).toBe(false);
    });

    it("should update logo texture", () => {
        state.isLogoTexture = false;
        const snap = snapshot(state);

        expect(snap.isLogoTexture).toBe(false);
    });

    it("should update full texture", () => {
        state.isFullTexture = true;
        const snap = snapshot(state);

        expect(snap.isFullTexture).toBe(true);
    });

    it("should update decals", () => {
        state.logoDecal = "new-logo.png";
        state.fullDecal = "new-full.png";
        const snap = snapshot(state);

        expect(snap.logoDecal).toBe("new-logo.png");
        expect(snap.fullDecal).toBe("new-full.png");
    });
});
