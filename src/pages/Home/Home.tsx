import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";

import ArticleCard from "../../components/ArticleCard";
import { ArticleSortOptions } from "../../constants/article";
import { useArticles } from "../../hooks/article";

function Home(): React.ReactElement {
  const {
    data: articles,
    isLoading,
    fetchNext,
    hasNextPage,
    setSort,
    predicate,
  } = useArticles();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 3 }}>
      <Stack spacing={2}>
        {!!predicate.search && (
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={predicate.sortBy}
              label="Sort By"
              onChange={(event) =>
                setSort(event.target.value as ArticleSortOptions)
              }
            >
              <MenuItem value={ArticleSortOptions.PUBLISHEDAT}>
                Published At
              </MenuItem>
              <MenuItem value={ArticleSortOptions.POPULARITY}>
                Popularity
              </MenuItem>
              <MenuItem value={ArticleSortOptions.RELEVANCY}>
                Relevancy
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {!!articles.length && (
          <Masonry
            columns={{ xs: 1, sm: 2, xl: 3 }}
            spacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {articles.map((c, index) => (
              <Box
                display="flex"
                justifyContent="center"
                key={`article${index}`}
              >
                <ArticleCard article={c} />
              </Box>
            ))}
          </Masonry>
        )}

        <Box display="flex" justifyContent="center">
          {isLoading && <CircularProgress />}
          {!isLoading && hasNextPage && (
            <Button onClick={() => fetchNext()}>Load More</Button>
          )}
          {articles.length === 0 && !isLoading && (
            <Typography>--- No Articles Found ---</Typography>
          )}
          {articles.length > 0 && !hasNextPage && !isLoading && (
            <Typography>--- End of List ---</Typography>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default Home;
