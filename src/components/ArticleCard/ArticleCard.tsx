import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { IArticle } from "../../models/article";

type IProps = {
  article: IArticle;
};

function ArticleCard({ article }: IProps): React.ReactElement {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={article.title}
        height="140"
        image={article.urlToImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/articles/${article.slug}`);
          }}
        >
          Read full article
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleCard;
