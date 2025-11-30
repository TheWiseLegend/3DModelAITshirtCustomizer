import { describe, it, expect, vi } from "vitest";
import {
    downloadCanvasToImage,
    reader,
    getContrastingColor,
} from "../config/helpers";

describe("Helper Functions", () => {
    describe("getContrastingColor", () => {
        it("should return black for light colors", () => {
            const result = getContrastingColor("#FFFFFF");
            expect(result).toBe("black");
        });

        it("should return white for dark colors", () => {
            const result = getContrastingColor("#000000");
            expect(result).toBe("white");
        });

        it("should handle colors without # prefix", () => {
            const result = getContrastingColor("FFFFFF");
            expect(result).toBe("black");
        });

        it("should return white for medium-dark colors", () => {
            const result = getContrastingColor("#333333");
            expect(result).toBe("white");
        });
    });

    describe("downloadCanvasToImage", () => {
        it("should create and trigger download link", () => {
            // Mock canvas element
            const mockCanvas = document.createElement("canvas");
            mockCanvas.toDataURL = vi.fn(() => "data:image/png;base64,mock");
            document.querySelector = vi.fn(() => mockCanvas);

            // Mock link click
            const clickSpy = vi.fn();
            const mockLink = {
                href: "",
                download: "",
                click: clickSpy,
            };
            document.createElement = vi.fn(() => mockLink);
            document.body.appendChild = vi.fn();
            document.body.removeChild = vi.fn();

            downloadCanvasToImage();

            expect(mockCanvas.toDataURL).toHaveBeenCalled();
            expect(mockLink.download).toBe("canvas.png");
        });
    });

    describe("reader", () => {
        it("should read file and return data URL", async () => {
            const mockFile = new File(["test"], "test.png", {
                type: "image/png",
            });

            // Mock FileReader
            class MockFileReader {
                constructor() {
                    this.result = "data:image/png;base64,test";
                    this.onload = null;
                    this.onerror = null;
                }

                readAsDataURL() {
                    // Simulate async read
                    setTimeout(() => {
                        if (this.onload) {
                            this.onload();
                        }
                    }, 0);
                }
            }

            globalThis.FileReader = MockFileReader;

            const result = await reader(mockFile);
            expect(result).toBe("data:image/png;base64,test");
        });

        it("should reject on error", async () => {
            const mockFile = new File(["test"], "test.png", {
                type: "image/png",
            });

            class MockFileReader {
                constructor() {
                    this.onload = null;
                    this.onerror = null;
                }

                readAsDataURL() {
                    setTimeout(() => {
                        if (this.onerror) {
                            const error = new Error("File read error");
                            this.onerror(error);
                        }
                    }, 0);
                }
            }

            globalThis.FileReader = MockFileReader;

            await expect(reader(mockFile)).rejects.toThrow("File read error");
        });
    });
});
