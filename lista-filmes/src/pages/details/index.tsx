import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_KEY } from "../../config/config";
import { Container } from "../details/components/styles";
import { Form, FormControl } from 'react-bootstrap';

function MovieList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const movies = [
        { id: 1, title: 'Filme 1' },
        { id: 2, title: 'Filme 2' },
        { id: 3, title: 'Filme 3' },
        { id: 4, title: 'Filme 4' },
    ];
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    export default function Details() {

        const image_path = "https://image.tmdb.org/t/p/w500/";
        const [movie, setMovie] = useState<any>({});

        const { id } = useParams()

        useEffect(() => {
            const results = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(results);
        }, [searchTerm, movies]);

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => setMovie(data))
    }, [id])



    return (
        <Container>


            <div>
                <Form>
                    <FormControl
                        type="text"
                        placeholder="Pesquisar filme"
                        className="mr-sm-2"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form>
                <ul>
                    {filteredMovies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            </div>




            <div className="movie">
                <img src={`${image_path}${movie.poster_path}`} alt={movie.overview} />
                <div className="details">
                    <h1>{movie.title}</h1>
                    <span>Sinopse: {movie.overview}</span>
                    <span className="release-date">Release date: {movie.release_date}</span>
                    <Link to="/"><button>Go Back</button></Link>
                </div>
            </div>
        </Container>
    )
}
export default MovieList;