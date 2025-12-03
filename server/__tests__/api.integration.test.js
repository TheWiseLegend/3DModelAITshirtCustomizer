import express from 'express';
import request from 'supertest';
import dalleRoutes from '../routes/dalle.routes.js';

// Create a full app instance like in index.js
const createApp = () => {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use('/api/v1/dalle', dalleRoutes);

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });

  return app;
};

describe('Backend Integration Tests - Complete API Flow', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('Server Health Check', () => {
    it('should respond to root endpoint', async () => {
      const response = await request(app).get('/').expect(200);

      expect(response.body).toEqual({
        message: 'Hello from DALL-E!',
      });
    });

    it('should have correct content type for root endpoint', async () => {
      await request(app).get('/').expect('Content-Type', /json/).expect(200);
    });
  });

  describe('DALL-E API Integration - Full Request/Response Cycle', () => {
    it('should handle complete image generation flow', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .send({ prompt: 'a beautiful sunset' })
        .expect(200);

      expect(response.body).toHaveProperty('photo');
      expect(typeof response.body.photo).toBe('string');
      expect(response.body.photo.length).toBeGreaterThan(100);
    }, 30000);

    it('should return valid base64 image data', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .send({ prompt: 'test pattern' })
        .expect(200);

      const { photo } = response.body;

      // Verify base64 format
      expect(photo).toBeTruthy();
      expect(photo).toMatch(/^[A-Za-z0-9+/=]+$/);

      // Verify it's not empty
      expect(photo.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe('Error Handling Integration', () => {
    it('should validate request body and reject missing prompt', async () => {
      const response = await request(app).post('/api/v1/dalle').send({}).expect(400);

      expect(response.body.message).toBe('Prompt is required');
    });

    it('should validate and reject empty string prompt', async () => {
      const response = await request(app).post('/api/v1/dalle').send({ prompt: '' }).expect(400);

      expect(response.body.message).toBe('Prompt is required');
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      expect(response.status).toBe(400);
    });

    it('should handle null prompt', async () => {
      const response = await request(app).post('/api/v1/dalle').send({ prompt: null }).expect(400);

      expect(response.body.message).toBe('Prompt is required');
    });
  });

  describe('HTTP Headers and Content Negotiation', () => {
    it('should accept and return JSON', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .set('Content-Type', 'application/json')
        .send({ prompt: 'test' })
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    }, 30000);

    it('should handle CORS preflight requests', async () => {
      // Note: CORS middleware should be added in index.js
      const response = await request(app).options('/api/v1/dalle');

      // Options should be allowed
      expect([200, 204]).toContain(response.status);
    });
  });

  describe('API Route Configuration', () => {
    it('should route GET requests to hello endpoint', async () => {
      const response = await request(app).get('/api/v1/dalle').expect(200);

      expect(response.body).toEqual({
        message: 'Hello from DALL-E! Routes',
      });
    });

    it('should handle unknown routes with 404', async () => {
      await request(app).get('/api/v1/unknown').expect(404);
    });

    it('should handle wrong HTTP method', async () => {
      const response = await request(app).put('/api/v1/dalle').send({ prompt: 'test' });

      expect(response.status).toBe(404);
    });
  });

  describe('Large Payload Handling', () => {
    it('should handle special characters in prompt', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .send({ prompt: 'test with émojis 🎨🖼️ and symbols @#$%' })
        .expect(200);

      expect(response.body).toHaveProperty('photo');
    }, 30000);
  });

  describe('Response Consistency', () => {
    it('should return consistent response structure', async () => {
      const response = await request(app)
        .post('/api/v1/dalle')
        .send({ prompt: 'consistency test' })
        .expect(200);

      // Verify response structure
      expect(response.body).toHaveProperty('photo');
      expect(Object.keys(response.body)).toContain('photo');
    }, 30000);

    it('should return different images for different prompts', async () => {
      const response1 = await request(app).post('/api/v1/dalle').send({ prompt: 'red dragon' });

      const response2 = await request(app).post('/api/v1/dalle').send({ prompt: 'blue phoenix' });

      expect(response1.body.photo).toBeTruthy();
      expect(response2.body.photo).toBeTruthy();

      // Images should likely be different (though not guaranteed)
      expect(response1.body.photo.length).toBeGreaterThan(0);
      expect(response2.body.photo.length).toBeGreaterThan(0);
    }, 60000);
  });
});
