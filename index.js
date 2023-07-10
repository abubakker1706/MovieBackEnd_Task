const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    insertMovies();
  })
  .catch((error) => console.log('Error connecting to Mongo:', error));




const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    releaseYear: Number,
    poster: String,
    rating: Number,
  });
  

const Movie = mongoose.model('Movie', movieSchema);


app.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the movies' });
    }
  });
  


app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
      } else {
        res.json(movie);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the movie details' });
    }
  });

const insertMovies = async () => {
    const movies = [
      { 
        title: 'LEO',
        director: 'Lokesh Kanagaraj',
        releaseYear: 2023,
        poster:"https://1847884116.rsc.cdn77.org/tamil/home/leo-title232023m.jpg",
        rating:8,
      },
      {
        title: 'JAWAN',
        director: 'Atlee',
        releaseYear: 2023,
        poster:"https://akm-img-a-in.tosshub.com/sites/dailyo/resources/202207/jawan-movie-srk-poster-2023-1060722033206.png",
        rating:9,
      },
      {
        title: 'Vikram',
        director: 'Lokesh Kanagaraj',
        releaseYear: 2022,
        poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vikram-et00138591-22-07-2021-11-45-18.jpg",
        rating:9.5,
      }, {
        title: 'KGF 2',
        director: 'Prashanth Neel',
        releaseYear: 2022,
        poster:"https://bollywoodlatestforu.com/wp-content/uploads/2021/01/KGF-chapter-2-budget-poster-768x1158.jpg",
        rating:9.8,
      }, {
        title: 'Beast',
        director: 'Nelson',
        releaseYear: 2022,
        poster:"https://upload.wikimedia.org/wikipedia/en/3/3d/Beast_2022_Indian_poster.jpg",
        rating:5,
      }, {
        title: 'Jailer',
        director: 'Nelson',
        releaseYear: 2023,
        poster:"https://m.media-amazon.com/images/M/MV5BODMzNzhkMzUtZDRkMy00MzVjLWJmYzgtZjBhZTJhY2I4M2Y1XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_FMjpg_UX1000_.jpg",
        rating:7,
      }, {
        title: 'Thunivu',
        director: 'Vinoth',
        releaseYear: 2023,
        poster:"https://m.media-amazon.com/images/M/MV5BYTVjOTkwNTYtOTg3YS00NDhjLTk2NTYtMTQzYjljYjhmMjFhXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
        rating:9,
      }, {
        title: 'Doctor',
        director: 'Nelson',
        releaseYear: 2021,
        poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/doctor-et00305742-02-02-2021-03-30-24.jpg",
        rating:7,
      },
     
    ];
  
    try {
      await Movie.deleteMany(); 
      await Movie.insertMany(movies); 
      console.log('Inserted movies successfully');
    } catch (error) {
      console.error('Error inserting movies:', error);
    }
  };

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
