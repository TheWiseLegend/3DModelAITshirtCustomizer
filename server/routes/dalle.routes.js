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

    console.log('Received prompt:', prompt);

    // Primary: Pollinations.ai
    let imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=512&height=512&nologo=true`;

    console.log('Fetching from URL:', imageUrl);

    let imageResponse;
    try {
      imageResponse = await fetch(imageUrl, {
        timeout: 30000, // 30 second timeout
      });
      console.log('Pollinations response status:', imageResponse.status);

      if (!imageResponse.ok) {
        throw new Error(`Pollinations failed with status: ${imageResponse.status}`);
      }
    } catch (error) {
      // Fallback: Use a placeholder for testing
      console.error('Pollinations.ai failed:', error.message);
      console.log('Using fallback image...');
      imageUrl = `https://picsum.photos/512/512`;
      imageResponse = await fetch(imageUrl);
    }

    console.log('Converting to buffer...');
    const arrayBuffer = await imageResponse.arrayBuffer();
    console.log('ArrayBuffer size:', arrayBuffer.byteLength);

    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    console.log('Base64 length:', base64Image.length);

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
