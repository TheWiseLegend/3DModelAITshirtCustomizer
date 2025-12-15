import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E! Routes' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Primary: Pollinations.ai
    let imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=512&height=512&nologo=true`;

    let imageResponse;
    try {
      imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new Error(`Pollinations failed with status: ${imageResponse.status}`);
      }
    } catch {
      console.log('Pollinations.ai failed, using fallback image');
      imageUrl = `https://picsum.photos/512/512`;
      imageResponse = await fetch(imageUrl);
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    if (!base64Image || base64Image.length === 0) {
      throw new Error('Failed to generate base64 image');
    }

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

export default router;
