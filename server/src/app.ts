import express from 'express';
import { Collection, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
const app = express();
const port = 3084;

dotenv.config();

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);

let albumsCollection: Collection;

client.connect().then(() => {
  console.log('Connected to MongoDB');
  const db = client.db('rymhigherorlowerdb');
  albumsCollection = db.collection('albums');
})
  .catch(err => {
    console.error("Unable to connect to MongoDB: ", err);
  });


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/randomalbumpair', async (req, res) => {
  const start = parseInt(req.query.start as string) || 1;
  const end = parseInt(req.query.end as string) || 400;

  if (isNaN(start) || isNaN(end) || start > end || start < 1 || end > 400 || end - start < 1) {
    return res.status(400).send('Invalid start or end value');
  }

  const firstIndex = getRandomInt(start, end);
  let secondIndex: number;

  // O(1) algo to get a random number that is not equal to the first number
  for (let i = 0; i < 20; i++) {
    secondIndex = getRandomInt(start, end);
    if (secondIndex !== firstIndex) {
      break;
    }

    if (i === 19) {
      const firstIndexPlusOne = firstIndex + 1;
      const firstIndexMinusOne = firstIndex - 1;

      if (firstIndexPlusOne <= end) {
        secondIndex = firstIndexPlusOne;
      } else {
        secondIndex = firstIndexMinusOne;
      }
    }
  }

  try {
    console.log(`Fetching albums with popularity ranks ${firstIndex} and ${secondIndex}`);
    const firstAlbum = await albumsCollection.findOne({ popularity_rank: firstIndex });
    const secondAlbum = await albumsCollection.findOne({ popularity_rank: secondIndex });

    if (!firstAlbum || !secondAlbum) {
      return res.status(500).send('Error fetching albums');
    }

    res.json({ firstAlbum, secondAlbum });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching albums: ${err}`);
  }
});
