## API Overview
Collection of information for movies, TV shows, and actors. Includes YouTube trailer URL, awards, full biography, and many other useful information. This API provides complete and updated data for over 9 million titles (movies, series, and episodes) and 11 million actors, crew, and cast members.

---

## API Version
Version 1 (Current Version)

---

## Available Endpoints
### Titles
- **Multiple** /title: returns an array of titles according to filters/sorting query parameters provided.
- **By List of Id's** /x/titles-by-ids: returns an array of titles according to the array of id's provided
- **Title** /titles/{id}: returns title according to filters/sorting query parameters provided.
- **Title Rating** /titles/{id}/ratings: returns title rating and vote number.
- **Seasons and Episodes** /title/series/{id}: returns an array of episodes only with episode id, episode number and season number in ascending order.
- **Seasons Number** /titles/seasons/{id}: returns the number of seasons for the series (integer).
- **Episodes Id's by Series Id and Season** /titles/series/{id}/{season}: returns an array of episodes only with episode id, season number and episode number (only of the season provided in the path).
- **Episode** /titles/episode/{id}: returns episode according to filters/sorting query parameters provided.
- **Upcoming Titles** titles/x/upcoming: returns an array of upcoming titles according to filters/sorting query parameters provided.

### Search
- **Titles by Keyword**  /titles/search/keyword/{keyword}: returns an array of titles according to filters/sorting query parameters provided and the keyword provided in the path.
- **Titles by Title** /titles/search/title/{title}: returns an array of titles according to filters/sorting query parameters provided and the title provided in the path.
- **Titles by Aka's** /titles/search/akas/{aka}: returns an array of titles according to filters/sorting query parameters provided and the aka provided in path, works only for exact matches.

### Actors
- **Actors** /actors: returns an array of actors according to filters provided.
- **Actor by Id** /actors/{id}: returns actor details

### Utils
- **Title Type** /title/utils/titleType: returns an array of title types.
- **Genres** /title/utils/titleType: returns an array of genres.
- **Titles Lists** /title/utils/lists: returns an array of lists (for 'list' query parameter).

---

## Request and Response Format

### Request

``` javascript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "inception";

  const response = await fetch(
    `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
```

### Response

``` json
{
  "page": 1,
  "results": [
    {
      "id": "tt1375666",
      "title": "Inception",
      "type": "movie",
      "year": 2010,
      "runtime": 148,
      "genres": ["Action", "Sci-Fi", "Thriller"],
      "imdbRating": 8.8,
      "poster": "https://image.url/inception.jpg",
      "plot": "A thief who steals corporate secrets …",
      "cast": [
        {
          "name": "Leonardo DiCaprio",
          "character": "Dom Cobb"
        },
        {
          "name": "Joseph Gordon-Levitt",
          "character": "Arthur"
        }
      ]
    }
  ],
  "total_results": 1,
  "message": null
}
```
---

## Authentication
To access the MoviesDatabase API, all requests must be authenticated using an API key provided by RapidAPI. This key ensures that only authorised users can make requests and helps manage rate limits.
- Visit the API page: MoviesDatabase on RapidAPI
- Sign up for Free if you don’t already have an account.
- Click the Subscribe to Test button.
- Once subscribed, you’ll find your X-RapidAPI-Key in your dashboard.

---

## Error Handling
The API uses standard HTTP status codes to indicate whether a request was successful or not.

- **400**: The request is invalid or missing parameters.
- **401**: Authentication failed.
- **403**: Access to the resource is denied.
- **404**: The requested resource doesn’t exist.
- **429**: Rate limit exceeded.
- **500**: The API server encountered an issue.

---

## Usage Limits and Best Practices

### Usage Limits
Depending on your RapidAPI subscription plan, the MoviesDatabase API enforces rate limits that control how many requests you can make within a specific time period.

| Plan Type        | Requests per Month  | Rate Limit per Second  |
| ------------- |-------------| ----- |
| Free Tier      | Typically ~500–1000 requests/month | 1–5 requests/sec |
| Basic / Pro Plans | Higher monthly quota      | Increased rate limit |

### Best Practices
- Use pagination to reduce API request load.
- Cache responses for frequently requested data.
- Store sensitive API keys in environment variables.
- Define TypeScript interfaces for API responses for type safety.
- Implement loading states in the UI while fetching data.
