import express from "express";
import request from "supertest";
import dalleRoutes from "../routes/dalle.routes.js";

// Create a test app
const app = express();
app.use(express.json());
app.use("/api/v1/dalle", dalleRoutes);

describe("DALL-E Routes", () => {
    describe("GET /api/v1/dalle", () => {
        it("should return hello message", async () => {
            const response = await request(app)
                .get("/api/v1/dalle")
                .expect(200);

            expect(response.body).toEqual({
                message: "Hello from DALL-E! Routes",
            });
        });

        it("should return JSON content type", async () => {
            const response = await request(app)
                .get("/api/v1/dalle")
                .expect("Content-Type", /json/);

            expect(response.status).toBe(200);
        });
    });

    describe("POST /api/v1/dalle", () => {
        it("should return 400 if prompt is missing", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .send({})
                .expect(400);

            expect(response.body).toEqual({
                message: "Prompt is required",
            });
        });

        it("should return 400 if prompt is empty string", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .send({ prompt: "" })
                .expect(400);

            expect(response.body).toEqual({
                message: "Prompt is required",
            });
        });

        it("should accept valid prompt and return 200", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .send({ prompt: "a cool dragon" })
                .expect(200);

            expect(response.body).toHaveProperty("photo");
            expect(typeof response.body.photo).toBe("string");
            expect(response.body.photo.length).toBeGreaterThan(0);
        }, 30000); // 30 second timeout for API call

        it("should return base64 encoded image", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .send({ prompt: "test image" })
                .expect(200);

            expect(response.body.photo).toBeTruthy();
            // Base64 strings should be alphanumeric with +, /, and =
            expect(response.body.photo).toMatch(/^[A-Za-z0-9+/=]+$/);
        }, 30000);
    });

    describe("Error Handling", () => {
        it("should handle invalid JSON body", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .set("Content-Type", "application/json")
                .send("invalid json")
                .expect(400);

            // Express will handle malformed JSON
            expect(response.status).toBe(400);
        });

        it("should return JSON content type on error", async () => {
            const response = await request(app)
                .post("/api/v1/dalle")
                .send({})
                .expect("Content-Type", /json/);

            expect(response.status).toBe(400);
        });
    });
});
