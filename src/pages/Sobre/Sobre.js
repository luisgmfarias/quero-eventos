import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import markdownContent from "../../templates/about.md";
import { Container } from "./styles";

const Sobre = () => {
  let [readable, setReadable] = useState({ md: "" });

  useEffect(() => {
    fetch(markdownContent)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);

  return (
    <Container>
      <ReactMarkdown children={readable.md}></ReactMarkdown>
    </Container>
  );
};

export default Sobre;
