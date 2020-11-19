import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry } from "../lib/entry";
import { getEntries } from "../lib/getEntries";
import { useConfig } from "../hooks/useConfig";
import Link from "next/link";
import { AbsDate } from "../components/AbsDate";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Entry[];
}
export default function Home(props: Props) {
  const config = useConfig();
  return (
    <div>
      <Head>
        <title>{config.title("Archives")}</title>
      </Head>

      <main>
        <h1>Archives</h1>
        <EntryList entries={props.entries} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries();
  return {
    props: {
      entries,
    },
  };
};
