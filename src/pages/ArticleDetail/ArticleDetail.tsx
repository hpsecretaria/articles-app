import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useArticle } from "../../hooks/article";

const Image = styled("img")(({ theme }) => ({
  width: "70%",
  aspectRatio: "16/9",
}));

function ArticleDetail(): React.ReactElement {
  const { data: article } = useArticle();

  if (article === null) {
    return (
      <Typography variant="h6" textAlign="center">
        Not Found
      </Typography>
    );
  }

  return (
    <Container
      data-testid="articleDetailsContainer"
      maxWidth="lg"
      sx={{ marginTop: 3 }}
    >
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h2" textAlign="center">
          {article?.title}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {article?.author}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          {!!article && new Date(article.publishedAt).toLocaleString()}
        </Typography>
        <Image src={article?.urlToImage} alt={article?.title} />
        <Typography variant="subtitle1" textAlign="center">
          {`Source: ${article?.source.name}, ${article?.url}`}
        </Typography>
        <Typography variant="h4" textAlign="center">
          {article?.description}
        </Typography>
        <Typography variant="body1" textAlign="center">
          {article?.content}
        </Typography>
      </Stack>
    </Container>
  );
}

export default ArticleDetail;
