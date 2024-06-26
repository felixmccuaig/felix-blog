import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { ArticleMeta } from "./ArticleMeta";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Toolbar } from "../components/Toolbar";

import * as styles from "./articlestyles.css";

export const articles = [
  {
    id: "react-cloudbuild",
    name: "Deploy easy with cloud build + firebase hosting.",
    date: new Date("2022-06-26"),
    description:
      "Setup cloud build triggers to deploy your firebase hosting web apps automatically!",
    link: "/cloudbuild-hosting/auto-deploy-cloud-build.md",
    read_time: "7 min",
    folder: "cloudbuild-hosting",
  },
  {
    id: "typescript-logging",
    name: "Easy typescript logging.",
    date: new Date("2023-04-14"),
    description: "Easy typescript class based logging!",
    link: "/typescript-logger/typescript-logger.md",
    read_time: "2 min",
    folder: "typescript-logger",
  },
];

const renderers = {
  //This custom renderer changes how images are rendered
  //we use it to constrain the max width of an image to its container
  image: ({ alt, src, title }) => (
    <img alt={alt} src={src} title={title} style={{ maxWidth: 475 }} />
  ),
};

export const ArticleDetail = ({}) => {
  const params = useParams();

  const [content, setContent] = useState("");
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const article = articles.find((x) => x.id === params.id);

    if (!article) {
      return;
    }

    document.title = article.name;
    document.description = article.description;

    setArticle(article);

    fetch(article.link)
      .then((r) => r.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="bg-gray-300 flex flex-col items-center">
      <Toolbar />
      <div className="w-4/5 p-4">
        <ReactMarkdown
          escapeHtml={false}
          renderers={renderers}
          styles={styles}
          remarkPlugins={[remarkGfm]}
          transformImageUri={(uri) =>
            `https://${window.location.host}/${article.folder}/${uri}`
          }
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export const ArticlesList = () => {
  return (
    <div className="bg-slate-400 w-full h-screen flex flex-col items-center">
      <Toolbar />
      <div className="w-1/2 flex flex-col gap-4">
        <h1 className="title-text text-4xl text-white font-bold mt-2">
          Blog posts
        </h1>
        {articles.map((x, i) => (
          <ArticleMeta key={i} article={x} />
        ))}
      </div>
    </div>
  );
};
