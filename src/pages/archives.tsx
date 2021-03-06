import * as React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry, getEntries } from "../lib/entry";
import { useConfig } from "../hooks/useConfig";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Omit<Entry, "body">[];
}

export default function Home({ entries }: Props) {
  const config = useConfig();

  return (
    <div>
      <Head>
        <title>{config.title("Archives")}</title>
      </Head>

      <main>
        <h1>Archives</h1>
        <EntryList entries={entries} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries().then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title }))
  );
  return {
    props: {
      entries,
    },
  };
};
