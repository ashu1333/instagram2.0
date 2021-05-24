import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./Component/NotFound";

const generatePage = (pageName) => {
  const Component = () => require(`./Pages/${pageName}`).default;

  try {
    return React.createElement(Component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = "";
  if (id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }
  console.log(pageName);
  return generatePage(pageName);
};

export default PageRender;
