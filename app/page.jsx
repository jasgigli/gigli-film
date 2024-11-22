"use client";
import React from "react";
import MovieDescription from "@/components/MovieDescription";
import CardContainer from "@/components/CardContainer";
import SearchPage from "@/components/SearchPage";

const Page = () => {
  return (
    <>
      <MovieDescription />
      <SearchPage />
      <CardContainer />
    </>
  );
};

export default Page;
